document.addEventListener("DOMContentLoaded", async () => {
  const STORAGE_KEYS = {
    latestCapture: "ICE_LATEST_CAPTURE",
    captureHistory: "ICE_CAPTURE_HISTORY",
    timelineItems: "ICE_TIMELINE_ITEMS",
    eventItems: "ICE_EVENT_ITEMS",
    orderedEvents: "ICE_ORDERED_EVENTS",
    actorTimelines: "ICE_ACTOR_TIMELINES",
    interactionGraph: "ICE_INTERACTION_GRAPH",
    sceneModels: "ICE_SCENE_MODELS",
    semanticEvents: "ICE_SEMANTIC_EVENTS",
    entityRoleItems: "ICE_ENTITY_ROLE_ITEMS",
    principleItems: "ICE_PRINCIPLE_ITEMS",
    prophecyLinks: "ICE_PROPHECY_LINKS",
    analysisStatus: "ICE_ANALYSIS_STATUS"
  };
  const DISPLAY_LIMIT = 5;

  let studyData = {};

  function normalizeText(text) {
    return (text || "").replace(/\s+/g, " ").trim();
  }

  function trimText(text, maxLength = 160) {
    const normalized = normalizeText(text);
    if (normalized.length <= maxLength) return normalized;
    return `${normalized.slice(0, maxLength - 3).trim()}...`;
  }

  function renderDivineDisplayText(text) {
    return normalizeText(text)
      .replace(/\bHoly Spirit\b/gi, "HOLY SPIRIT")
      .replace(/\bThe Lord\b/gi, "THE LORD")
      .replace(/\bJesus Christ\b/gi, "JESUS CHRIST")
      .replace(/\bJesus\b/gi, "JESUS")
      .replace(/\bChrist\b/gi, "CHRIST")
      .replace(/\bGod\b/gi, "GOD")
      .replace(/\bFather\b/g, "FATHER");
  }

  function includesTerm(value, term) {
    if (!term) return true;
    return normalizeText(value).toLowerCase().includes(term);
  }

  function itemMatches(item, fields, term) {
    return fields.some((field) => includesTerm(item?.[field], term));
  }

  function clearElement(element) {
    element.textContent = "";
  }

  function asArray(value) {
    return Array.isArray(value) ? value : [];
  }

  function countItems(value) {
    return Array.isArray(value) ? value.length : 0;
  }

  function dedupeActorActions(actor) {
    const seen = new Set();
    const orderedActions = [];

    for (const action of actor.orderedActions || []) {
      const key = [
        actor.actorName || "",
        action.sequenceOrder ?? "",
        normalizeText(action.eventText || "").toLowerCase()
      ].join("|");

      if (seen.has(key)) continue;
      seen.add(key);
      orderedActions.push(action);
    }

    return {
      ...actor,
      orderedActions
    };
  }

  function principleDedupKey(item) {
    return [
      item.sourceUrl || item.sourceTitle || "",
      normalizeText(item.principleText || "").toLowerCase(),
      item.principleType || "unknown"
    ].join("|");
  }

  function dedupePrincipleItems(items) {
    const seen = new Set();
    const deduped = [];

    for (const item of items || []) {
      const key = principleDedupKey(item);
      if (seen.has(key)) continue;
      seen.add(key);
      deduped.push(item);
    }

    return deduped;
  }

  function interactionDedupKey(item) {
    const actors = [
      normalizeText(item.actorA || "").toLowerCase(),
      normalizeText(item.actorB || "").toLowerCase()
    ].sort((a, b) => a.localeCompare(b));

    return [
      item.sourceUrl || item.sourceTitle || item.sourceCaptureId || "",
      actors[0],
      actors[1],
      normalizeText(item.interactionType || "").toLowerCase(),
      normalizeText(item.sourceSnippet || "").toLowerCase()
    ].join("|");
  }

  function dedupeInteractions(items) {
    const seen = new Set();
    const deduped = [];

    for (const item of items || []) {
      const key = interactionDedupKey(item);
      if (seen.has(key)) continue;
      seen.add(key);
      deduped.push(item);
    }

    return deduped;
  }

  function createCard(title, body, meta = "") {
    const card = document.createElement("article");
    const heading = document.createElement("h3");
    const content = document.createElement("p");

    card.className = "study-card";
    heading.textContent = renderDivineDisplayText(title || "Untitled");
    content.textContent = renderDivineDisplayText(body || "No detail available.");

    card.append(heading, content);

    if (meta) {
      const metaText = document.createElement("span");
      metaText.className = "meta";
      metaText.textContent = renderDivineDisplayText(meta);
      card.appendChild(metaText);
    }

    return card;
  }

  function appendEmpty(container, message) {
    const empty = document.createElement("p");
    empty.className = "empty-state";
    empty.textContent = message;
    container.appendChild(empty);
  }

  function renderLimited(container, items, countElement, renderItem, emptyMessage, hiddenLabel = "item") {
    clearElement(container);
    countElement.textContent = `${items.length} total`;

    if (items.length === 0) {
      appendEmpty(container, emptyMessage);
      return;
    }

    for (const item of items.slice(0, DISPLAY_LIMIT)) {
      container.appendChild(renderItem(item));
    }

    if (items.length > DISPLAY_LIMIT) {
      appendEmpty(container, `${items.length - DISPLAY_LIMIT} more ${hiddenLabel}(s) hidden by preview limit. Use search/filter or show more later.`);
    }
  }

  function renderCurrentPage(term) {
    const container = document.getElementById("currentPageSummary");
    const count = document.getElementById("currentPageCount");
    const capture = studyData.latestCapture;
    const history = Array.isArray(studyData.captureHistory)
      ? studyData.captureHistory
      : [];

    clearElement(container);
    count.textContent = capture?.text ? "1 current" : "0 current";

    if (!capture?.text) {
      appendEmpty(container, "No current capture yet.");
      return;
    }

    const searchable = [
      capture.title,
      capture.url,
      capture.text
    ].join(" ");

    if (!includesTerm(searchable, term)) {
      appendEmpty(container, "No current capture match.");
      return;
    }

    container.appendChild(createCard(
      capture.title || "Current capture",
      trimText(capture.text, 220),
      [
        capture.url || "",
        `${capture.wordCount || 0} words`,
        `${capture.characterCount || 0} chars`,
        `${capture.divineReferenceCount || 0} divine refs`
      ].filter(Boolean).join(" | ")
    ));

    if (history.length > 0) {
      container.appendChild(createCard(
        "Saved capture library",
        "Local captures are ready for document library, source collections, and historical comparison.",
        `${history.length} saved capture(s)`
      ));
    }
  }

  function inferDisplaySourceContext(capture) {
    if (!capture) return null;
    const title = normalizeText(capture.title || "");
    const url = normalizeText(capture.url || "");
    const titleMatch = title.match(/\b(Matthew|Mark|Luke|John)\s+(\d+)\b/i);
    const urlMatch = url.match(/\/scriptures\/(?:[^/]+\/)?(?:nt\/)?(matt|mark|luke|john)\/(\d+)\b/i);
    const urlBooks = {
      matt: "Matthew",
      mark: "Mark",
      luke: "Luke",
      john: "John"
    };
    const book = titleMatch?.[1] || (urlMatch ? urlBooks[urlMatch[1].toLowerCase()] : "");
    const chapter = titleMatch?.[2] || urlMatch?.[2] || "";
    const looksScripture = /\b(Matthew|Mark|Luke|John)\b/i.test(`${title} ${url}`) ||
      /\/scriptures\//i.test(url);

    return {
      sourceCaptureId: capture.id || "",
      sourceTitle: title,
      sourceUrl: url,
      sourceType: looksScripture ? "scripture" : "unknown",
      collection: looksScripture ? "scripture" : "unknown",
      book,
      chapter,
      section: "",
      explicitDate: "",
      inferredDate: "",
      timeRange: "",
      confidence: looksScripture ? "probable" : "possible"
    };
  }

  function findSourceContext() {
    const candidates = [
      ...(asArray(studyData.sceneModels)),
      ...(asArray(studyData.orderedEvents)),
      ...(asArray(studyData.actorTimelines).flatMap((actor) => asArray(actor.sourceContexts))),
      ...(asArray(studyData.interactionGraph)),
      ...(asArray(studyData.principleItems)),
      ...(asArray(studyData.prophecyLinks)),
      ...(asArray(studyData.timelineItems))
    ];

    return candidates.find((item) => item?.sourceContext)?.sourceContext ||
      candidates.find((item) => item?.sourceTitle || item?.sourceUrl) ||
      inferDisplaySourceContext(studyData.latestCapture);
  }

  function formatSourceContext(context) {
    return [
      context.collection ? `Collection: ${context.collection}` : "",
      context.sourceType ? `Type: ${context.sourceType}` : "",
      context.book ? `Book: ${context.book}` : "",
      context.chapter ? `Chapter: ${context.chapter}` : "",
      context.section ? `Section: ${context.section}` : "",
      context.explicitDate ? `Date: ${context.explicitDate}` : "",
      context.inferredDate ? `Inferred date: ${context.inferredDate}` : "",
      context.timeRange ? `Range: ${context.timeRange}` : "",
      context.confidence ? `Confidence: ${context.confidence}` : ""
    ].filter(Boolean).join("\n");
  }

  function renderSourceContext(term) {
    const container = document.getElementById("sourceContextCards");
    const count = document.getElementById("sourceContextCount");
    const context = findSourceContext();

    clearElement(container);
    count.textContent = context ? "1 context" : "0 context";

    if (!context) {
      appendEmpty(container, "No source context yet.");
      return;
    }

    const searchable = [
      context.collection,
      context.sourceType,
      context.book,
      context.chapter,
      context.section,
      context.sourceTitle,
      context.sourceUrl,
      context.confidence
    ].join(" ");

    if (!includesTerm(searchable, term)) {
      appendEmpty(container, "No source context match.");
      return;
    }

    container.appendChild(createCard(
      context.sourceTitle || context.book || "Source context",
      formatSourceContext(context),
      context.sourceUrl || ""
    ));
  }
  function addEntityRole(groups, groupName, name, confidence = "probable") {
    const cleanName = normalizeText(name || "");
    if (!cleanName) return;
    if (!groups[groupName]) groups[groupName] = new Map();
    const key = cleanName.toLowerCase();
    if (!groups[groupName].has(key)) {
      groups[groupName].set(key, {
        name: cleanName,
        confidence
      });
    }
  }

  function entityNamesFromRoles(roles) {
    return asArray(roles)
      .map((role) => roleName(role))
      .filter(Boolean);
  }

  function lineagePersonsFromEvents() {
    const lineageEvents = asArray(studyData.eventItems)
      .filter((item) => item.eventType === "lineage_record");
    const names = [];

    for (const item of lineageEvents) {
      if (Array.isArray(item.lineagePersons) && item.lineagePersons.length > 0) {
        names.push(...item.lineagePersons);
        continue;
      }

      for (const match of normalizeText(item.eventText || "").matchAll(/\b([A-Z][A-Za-z]+)\s+begat\s+([A-Z][A-Za-z]+)\b/g)) {
        names.push(match[1], match[2]);
      }
    }

    return names;
  }

  const ENTITY_GROUP_ORDER = [
    "Direct Actors",
    "Source Authorities",
    "Recipients / Targets",
    "Instruction Recipients",
    "Instruction Concerning",
    "Covenant / Family Participants",
    "Divine / Glorified Entities",
    "Lineage Focus",
    "Participants",
    "Lineage Persons"
  ];

  function normalizeEntityRoleGroup(groupName) {
    if (groupName === "Instruction Subjects") return "Instruction Concerning";
    return groupName || "Other Entities";
  }

  function sortEntityGroups(groups) {
    return groups.sort((left, right) => {
      const leftIndex = ENTITY_GROUP_ORDER.indexOf(left.groupName);
      const rightIndex = ENTITY_GROUP_ORDER.indexOf(right.groupName);
      const normalizedLeft = leftIndex === -1 ? 999 : leftIndex;
      const normalizedRight = rightIndex === -1 ? 999 : rightIndex;
      return normalizedLeft - normalizedRight || left.groupName.localeCompare(right.groupName);
    });
  }

  function groupsFromEntityRoleItems(items) {
    const groups = {};

    for (const item of items || []) {
      addEntityRole(
        groups,
        normalizeEntityRoleGroup(item.roleGroup),
        item.entityName || "",
        item.confidence || "probable"
      );
    }

    return sortEntityGroups(Object.entries(groups).map(([groupName, values]) => ({
      groupName,
      entities: Array.from(values.values())
    })));
  }
  function buildEntityRoleGroups() {
    if (Array.isArray(studyData.entityRoleItems) && studyData.entityRoleItems.length > 0) {
      return groupsFromEntityRoleItems(studyData.entityRoleItems);
    }

    const groups = {};

    for (const actor of asArray(studyData.actorTimelines)) {
      addEntityRole(groups, "Direct Actors", actor.actorName, "explicit");
    }

    for (const scene of asArray(studyData.sceneModels)) {
      for (const name of entityNamesFromRoles([scene.sourceAuthority, scene.orchestrator])) {
        addEntityRole(groups, "Source Authorities", name, "inferred-source");
      }
      for (const name of entityNamesFromRoles([scene.recipient, scene.target, scene.listener])) {
        addEntityRole(groups, "Recipients / Targets", name, "explicit");
      }
      for (const name of entityNamesFromRoles([scene.concerning])) {
        addEntityRole(groups, "Instruction Concerning", name, "explicit");
      }
      for (const name of asArray(scene.participants)) {
        addEntityRole(groups, "Participants", name, scene.confidence || "probable");
      }
      for (const name of entityNamesFromRoles([scene.primaryActor, scene.divineManifestation])) {
        if (/\b(JESUS|CHRIST|GOD|LORD|Father|Spirit)\b/i.test(name)) {
          addEntityRole(groups, "Divine / Glorified Entities", name, "probable");
        }
      }
      for (const name of asArray(scene.authorityChain).map(roleName)) {
        if (/\b(JESUS|CHRIST|GOD|LORD|Father|Spirit)\b/i.test(name)) {
          addEntityRole(groups, "Divine / Glorified Entities", name, "inferred-source");
        }
      }
    }

    const captureText = normalizeText(studyData.latestCapture?.text || "");
    if (/\bJesus Christ\b/i.test(captureText)) {
      addEntityRole(groups, "Divine / Glorified Entities", "JESUS CHRIST", "explicit");
    } else if (/\bJesus\b|\bChrist\b/i.test(captureText)) {
      addEntityRole(groups, "Divine / Glorified Entities", "JESUS", "explicit");
    }
    if (/\bTHE LORD\b|\bthe Lord\b|\bLord\b/i.test(captureText)) {
      addEntityRole(groups, "Divine / Glorified Entities", "THE LORD", "probable");
    }
    if (/\bMary\b/i.test(captureText)) addEntityRole(groups, "Participants", "Mary", "probable");
    if (/\bJoseph\b/i.test(captureText)) addEntityRole(groups, "Recipients / Targets", "Joseph", "probable");
    if (/\bfear not to take unto thee Mary\b|\btake unto thee Mary\b|\bMary thy wife\b/i.test(captureText)) {
      addEntityRole(groups, "Instruction Recipients", "Joseph", "explicit");
      addEntityRole(groups, "Instruction Concerning", "Mary", "explicit");
      addEntityRole(groups, "Covenant / Family Participants", "Mary", "explicit");
      addEntityRole(groups, "Covenant / Family Participants", "Joseph", "probable");
    }
    if (/\bMary\b/i.test(captureText) && /\bmother\b|\bwife\b|\bespoused\b|\btake unto thee\b/i.test(captureText)) {
      addEntityRole(groups, "Covenant / Family Participants", "Mary", "probable");
    }
    if (/\bJesus Christ\b/i.test(captureText) && /\bgeneration\b|\bbegat\b|\bson of David\b|\bson of Abraham\b/i.test(captureText)) {
      addEntityRole(groups, "Lineage Focus", "JESUS CHRIST", "explicit");
    }

    for (const name of lineagePersonsFromEvents()) {
      addEntityRole(groups, "Lineage Persons", name, "explicit");
    }

    return sortEntityGroups(Object.entries(groups).map(([groupName, values]) => ({
      groupName,
      entities: Array.from(values.values())
    })));
  }

  function renderEntityRoles(term) {
    const container = document.getElementById("entityRoleCards");
    const count = document.getElementById("entityRoleCount");
    const groups = buildEntityRoleGroups();
    const filtered = groups.filter((group) => includesTerm([
      group.groupName,
      group.entities.map((item) => item.name).join(" ")
    ].join(" "), term));
    const total = groups.reduce((sum, group) => sum + group.entities.length, 0);

    clearElement(container);
    count.textContent = `${total} total role/entity records`;

    if (filtered.length === 0) {
      appendEmpty(container, "No detected entity roles match.");
      return;
    }

    const lineageGroup = groups.find((group) => group.groupName === "Lineage Persons");
    if (lineageGroup?.entities.length > 8) {
      container.appendChild(createCard(
        "Grouped preview",
        `${total} total role/entity records. Showing grouped preview; ${lineageGroup.entities.length - 8} lineage persons hidden by preview limit.`,
        "future full lineage/entity view"
      ));
    } else {
      container.appendChild(createCard(
        "Grouped preview",
        `${total} total role/entity records. Showing grouped preview.`,
        "direct actor timelines remain separate"
      ));
    }

    for (const group of filtered.slice(0, Math.max(DISPLAY_LIMIT, 7))) {
      const visible = group.entities.slice(0, group.groupName === "Lineage Persons" ? 8 : 5);
      const hidden = group.entities.length - visible.length;
      const body = visible
        .map((item) => `${item.name} (${item.confidence || "probable"})`)
        .join(", ");
      const suffix = hidden > 0
        ? `\n${hidden} more hidden; future full lineage/entity view.`
        : "";

      container.appendChild(createCard(
        group.groupName,
        `${body}${suffix}`,
        group.groupName === "Lineage Persons"
          ? "lineage graph / family tree foundation"
          : "role grouping; direct actor timelines remain separate"
      ));
    }
  }
  function renderActors(term) {
    const container = document.getElementById("actorCards");
    const count = document.getElementById("actorCount");
    const actors = Array.isArray(studyData.actorTimelines)
      ? studyData.actorTimelines.map(dedupeActorActions)
      : [];
    const filtered = actors.filter((actor) => {
      const actionText = (actor.orderedActions || [])
        .map((action) => action.eventText)
        .join(" ");
      return includesTerm(`${actor.actorName} ${actionText}`, term);
    });

    renderLimited(container, filtered, count, (actor) => {
      const actions = (actor.orderedActions || [])
        .slice(0, 3)
        .map((action) => `${action.sequenceOrder}. ${trimText(action.eventText, 90)}`)
        .join(" ");

      return createCard(
        actor.actorName,
        actions || "No ordered actions yet.",
        `${actor.orderedActions?.length || 0} action(s)`
      );
    }, "No detected actors match.", "actor");
  }

  function renderOrderedEvents(term) {
    const container = document.getElementById("orderedEventCards");
    const count = document.getElementById("orderedEventCount");
    const events = Array.isArray(studyData.orderedEvents)
      ? studyData.orderedEvents
      : [];
    const filtered = events.filter((eventItem) =>
      itemMatches(eventItem, [
        "eventText",
        "orderingReason",
        "sourceTitle",
        "sourceUrl"
      ], term)
    );

    renderLimited(container, filtered, count, (eventItem) => createCard(
      `Event ${eventItem.sequenceOrder || ""}`.trim(),
      trimText(eventItem.eventText, 180),
      eventItem.orderingReason || eventItem.sourceTitle || ""
    ), "No ordered events match.");
  }

  function roleName(role) {
    return role?.actorName || "";
  }

  function formatRoleValue(label, role) {
    if (!roleName(role)) return "";
    return `${label}: ${role.actorName} (${role.confidence || "probable"})`;
  }

  function formatRoleList(label, roles) {
    const values = asArray(roles)
      .filter((role) => roleName(role))
      .slice(0, 3)
      .map((role) => `${role.actorName} (${role.confidence || "probable"})`);

    return values.length ? `${label}: ${values.join(", ")}` : "";
  }

  function formatPrincipleFocus(principleFocus) {
    if (!principleFocus?.principleText) return "";
    return `Principle: ${trimText(principleFocus.principleText, 90)} (${principleFocus.confidence || "probable"})`;
  }

  function formatAuthorityChain(authorityChain) {
    const chain = asArray(authorityChain)
      .filter((role) => roleName(role))
      .map((role) => role.actorName);

    return chain.length > 1 ? `Authority: ${chain.join(" -> ")}` : "";
  }
  function sceneRoleSearchText(scene) {
    return [
      roleName(scene.primaryActor),
      roleName(scene.speaker),
      roleName(scene.listener),
      roleName(scene.recipient),
      roleName(scene.target),
      roleName(scene.divineManifestation),
      roleName(scene.concerning),
      roleName(scene.sourceAuthority),
      roleName(scene.orchestrator),
      asArray(scene.authorityChain).map(roleName).join(" "),
      asArray(scene.secondaryActors).map(roleName).join(" "),
      asArray(scene.witness).map(roleName).join(" "),
      asArray(scene.audience).map(roleName).join(" "),
      scene.principleFocus?.principleText || ""
    ].join(" ");
  }

  function formatSceneRoles(scene) {
    const recipientName = roleName(scene.recipient);
    const targetName = roleName(scene.target);

    return [
      formatRoleValue("Primary", scene.primaryActor),
      formatRoleList("Secondary", scene.secondaryActors),
      formatRoleValue("Speaker", scene.speaker),
      formatRoleValue("Listener", scene.listener),
      recipientName && recipientName !== targetName
        ? formatRoleValue("Recipient", scene.recipient)
        : "",
      formatRoleValue("Target", scene.target),
      formatRoleValue("Manifestation", scene.divineManifestation),
      formatRoleValue("Concerning", scene.concerning),
      formatRoleValue("Source", scene.sourceAuthority),
      formatAuthorityChain(scene.authorityChain),
      formatRoleList("Witness", scene.witness),
      formatRoleList("Audience", scene.audience),
      formatPrincipleFocus(scene.principleFocus)
    ].filter(Boolean).slice(0, 9).join("\n");
  }

  function formatSceneWitnesses(scene) {
    const witnesses = Array.isArray(scene.witnesses) ? scene.witnesses : [];
    if (witnesses.length === 0) return "Witnesses: none detected";
    return `Witnesses: ${witnesses.map((item) =>
      `${item.witness || "Unknown"} (${item.confidence || "possible"})`
    ).join(", ")}`;
  }

  function renderScenes(term) {
    const container = document.getElementById("sceneCards");
    const count = document.getElementById("sceneCount");
    const scenes = Array.isArray(studyData.sceneModels)
      ? studyData.sceneModels
      : [];
    const filtered = scenes.filter((scene) =>
      includesTerm([
        scene.sceneTitle,
        scene.sceneType,
        scene.summarySnippet,
        (scene.participants || []).join(" "),
        (scene.witnesses || []).map((item) => item.witness).join(" "),
        scene.confidence,
        sceneRoleSearchText(scene)
      ].join(" "), term)
    );

    renderLimited(container, filtered, count, (scene) => {
      const participants = (scene.participants || []).join(", ") ||
        "No participants detected";
      const body = [
        trimText(scene.summarySnippet, 140),
        formatSceneRoles(scene),
        `Participants: ${participants}`,
        formatSceneWitnesses(scene)
      ].filter(Boolean).join("\n");

      return createCard(
        scene.sceneTitle || "Scene",
        body,
        `${scene.sceneType || "scene"} | ${scene.confidence || "possible"}`
      );
    }, "No scenes match.", "scene");
  }

  function renderInteractions(term) {
    const container = document.getElementById("interactionCards");
    const count = document.getElementById("interactionCount");
    const interactions = Array.isArray(studyData.interactionGraph)
      ? dedupeInteractions(studyData.interactionGraph)
      : [];
    const filtered = interactions.filter((item) =>
      itemMatches(item, [
        "actorA",
        "actorB",
        "interactionType",
        "sourceSnippet",
        "confidence"
      ], term)
    );

    renderLimited(container, filtered, count, (item) => createCard(
      `${item.actorA || "Unknown"} <-> ${item.actorB || "Unknown"}`,
      trimText(item.sourceSnippet, 180),
      `${item.interactionType || "interaction"} | ${item.confidence || "probable"}`
    ), "No character interactions match.", "interaction");
  }

  function renderTimeline(term) {
    const container = document.getElementById("timelineCards");
    const count = document.getElementById("timelineCount");
    const timeline = Array.isArray(studyData.timelineItems)
      ? studyData.timelineItems
      : [];
    const filtered = timeline.filter((item) =>
      itemMatches(item, [
        "detectedDateText",
        "contextSnippet",
        "sourceTitle",
        "sourceUrl"
      ], term)
    );

    renderLimited(container, filtered, count, (item) => createCard(
      item.detectedDateText || "Undated",
      trimText(item.contextSnippet, 180),
      item.sourceTitle || ""
    ), "No timeline items match.");
  }

  function renderSemanticEvents(term) {
    const container = document.getElementById("semanticEventCards");
    const count = document.getElementById("semanticEventCount");
    const semanticEvents = Array.isArray(studyData.semanticEvents)
      ? studyData.semanticEvents
      : [];
    const filtered = semanticEvents.filter((item) => includesTerm([
      item.actor,
      item.action,
      item.target,
      item.recipient,
      item.concerning,
      asArray(item.participants).join(" "),
      asArray(item.authorityChain).join(" "),
      item.eventType,
      item.semanticCategory,
      item.relationshipType,
      item.normalizedMeaning,
      item.sourceSnippet,
      item.confidence
    ].join(" "), term));

    renderLimited(container, filtered, count, (item) => {
      const target = item.target || item.recipient || item.concerning || "";
      const arrow = target ? ` -> ${target}` : "";
      const title = `${item.actor || "Unknown"} -> ${item.action || "acts"}${arrow}`;
      const body = [
        trimText(item.normalizedMeaning || item.sourceSnippet, 130),
        item.relationshipType ? `Relationship: ${item.relationshipType}` : "",
        item.sourceSnippet ? `Snippet: ${trimText(item.sourceSnippet, 120)}` : ""
      ].filter(Boolean).join("\n");
      const meta = [item.eventType, item.semanticCategory, item.confidence]
        .filter(Boolean)
        .join(" | ");

      return createCard(title, body, meta);
    }, "No semantic events match.", "semantic event");
  }
  function renderPrinciples(term) {
    const container = document.getElementById("principleCards");
    const count = document.getElementById("principleCount");
    const principles = Array.isArray(studyData.principleItems)
      ? dedupePrincipleItems(studyData.principleItems)
      : [];
    const filtered = principles.filter((item) =>
      itemMatches(item, [
        "principleText",
        "principleType",
        "contextSnippet",
        "sourceTitle",
        "sourceUrl"
      ], term)
    );

    renderLimited(container, filtered, count, (item) => createCard(
      item.principleType || "unknown",
      trimText(item.contextSnippet || item.principleText, 180),
      item.sourceTitle || ""
    ), "No principle or teaching items match.");
  }

  function renderProphecyLinks(term) {
    const container = document.getElementById("prophecyLinkCards");
    const count = document.getElementById("prophecyLinkCount");
    const links = Array.isArray(studyData.prophecyLinks)
      ? studyData.prophecyLinks
      : [];
    const filtered = links.filter((item) =>
      itemMatches(item, [
        "prophecyText",
        "fulfillmentText",
        "contextSnippet",
        "confidence",
        "linkType"
      ], term)
    );

    renderLimited(container, filtered, count, (item) => createCard(
      item.confidence || "prophecy-fulfillment",
      `${trimText(item.prophecyText, 110)} -> ${trimText(item.fulfillmentText, 110)}`,
      item.linkType || "prophecy-fulfillment"
    ), "No prophecy / fulfillment links match.");
  }

  function renderStudy() {
    try {
      const term = normalizeText(document.getElementById("searchInput").value)
        .toLowerCase();

      renderDiagnostics();
      renderCurrentPage(term);
      renderSourceContext(term);
      renderEntityRoles(term);
      renderActors(term);
      renderScenes(term);
      renderSemanticEvents(term);
      renderOrderedEvents(term);
      renderInteractions(term);
      renderPrinciples(term);
      renderProphecyLinks(term);
      renderTimeline(term);
    } catch (error) {
      showDiagnosticMessage(`Study Panel render error: ${error.message}`);
      console.debug("I.C.E. study render failed", {
        error: error.message
      });
    }
  }

  async function loadStudyData() {
    const raw = await chrome.storage.local.get(Object.values(STORAGE_KEYS));

    studyData = Object.fromEntries(
      Object.entries(STORAGE_KEYS).map(([alias, storageKey]) => [
        alias,
        raw[storageKey]
      ])
    );

    console.debug("I.C.E. study data loaded", {
      keys: Object.values(STORAGE_KEYS).filter((key) =>
        Object.prototype.hasOwnProperty.call(raw, key)
      ),
      captures: (studyData.latestCapture?.text ? 1 : 0) +
        countItems(studyData.captureHistory),
      timeline: countItems(studyData.timelineItems),
      events: countItems(studyData.eventItems),
      orderedEvents: countItems(studyData.orderedEvents),
      actorTimelines: countItems(studyData.actorTimelines),
      interactions: dedupeInteractions(studyData.interactionGraph).length,
      scenes: countItems(studyData.sceneModels),
      semanticEvents: countItems(studyData.semanticEvents),
      principles: countItems(studyData.principleItems),
      prophecyLinks: countItems(studyData.prophecyLinks),
      lastAnalysis: studyData.analysisStatus?.analyzedAt || ""
    });
  }

  function renderDiagnostics() {
    const captureCount = (studyData.latestCapture?.text ? 1 : 0) +
      countItems(studyData.captureHistory);
    const timelineCount = countItems(studyData.timelineItems);
    const eventCount = countItems(studyData.eventItems);
    const orderedCount = countItems(studyData.orderedEvents);
    const actorCount = countItems(studyData.actorTimelines);
    const interactionCount = dedupeInteractions(studyData.interactionGraph).length;
    const sceneCount = countItems(studyData.sceneModels);
    const semanticEventCount = countItems(studyData.semanticEvents);
    const principleCount = countItems(studyData.principleItems);
    const prophecyLinkCount = countItems(studyData.prophecyLinks);
    const totalRenderable = captureCount + timelineCount + eventCount +
      orderedCount + actorCount + interactionCount + sceneCount + semanticEventCount +
      principleCount + prophecyLinkCount;
    const message = document.getElementById("diagnosticMessage");

    document.getElementById("diagnosticCaptures").textContent = captureCount;
    document.getElementById("diagnosticTimeline").textContent = timelineCount;
    document.getElementById("diagnosticEvents").textContent = eventCount;
    document.getElementById("diagnosticOrderedEvents").textContent = orderedCount;
    document.getElementById("diagnosticActors").textContent = actorCount;
    document.getElementById("diagnosticInteractions").textContent =
      interactionCount;
    document.getElementById("diagnosticScenes").textContent = sceneCount;
    document.getElementById("diagnosticSemanticEvents").textContent = semanticEventCount;
    document.getElementById("diagnosticPrinciples").textContent = principleCount;
    document.getElementById("diagnosticProphecyLinks").textContent =
      prophecyLinkCount;
    document.getElementById("diagnosticLastAnalysis").textContent =
      studyData.analysisStatus?.analyzedAt || "Never";

    if (totalRenderable === 0) {
      showDiagnosticMessage("No local study data was found. Run Full Analysis from the popup, then refresh this page.");
    } else {
      showDiagnosticMessage("");
    }
  }

  function showDiagnosticMessage(messageText) {
    const message = document.getElementById("diagnosticMessage");

    message.hidden = !messageText;
    message.textContent = messageText;
  }

  async function refreshStudyData() {
    try {
      await loadStudyData();
      renderStudy();
    } catch (error) {
      showDiagnosticMessage(`Study Panel load error: ${error.message}`);
      console.debug("I.C.E. study load failed", {
        error: error.message
      });
    }
  }

  // Phase 5 foundation: this page is the future contextual research surface.
  // Current Page Capture is a captured text preview only. Future Source
  // Metadata and Chapter Summary / Source Summary sections should display
  // extracted document metadata separately from Narrative Events.
  // Later phases can attach scripture/conference-talk source collections,
  // cross-document character indexes, reference linking, side panel hover
  // integration, and report/presentation builder features without crowding the
  // quick-control popup. Principle views can later grow into doctrine
  // taxonomy, prophecy/fulfillment linking, theme clustering,
  // scripture/conference-talk comparison, speaker/author doctrine mapping,
  // user-curated principle notes, and future-event reasoning with
  // source-grounded confidence. Source Metadata should become a parallel
  // context layer for book/source title, author, speaker, compiler,
  // translator/version, organization/source collection, date/year, source type,
  // referenced scripture links, and context notes; it should not pollute
  // Detected Actors unless the person/entity acts inside the captured text.
  // Future entity work should grow into a semantic entity registry, lineage
  // graph, family tree view, fulfillment/revelation lineage context, covenant
  // lineage, and source-authority chain views without overcrowding this panel.
  await refreshStudyData();

  document.getElementById("searchInput").addEventListener("input", renderStudy);
  document.getElementById("refreshStudyData").addEventListener("click", refreshStudyData);
  window.addEventListener("focus", refreshStudyData);
  window.addEventListener("pageshow", refreshStudyData);
  chrome.storage.onChanged.addListener((changes, areaName) => {
    if (areaName !== "local") return;
    const watchedKeys = new Set(Object.values(STORAGE_KEYS));
    if (Object.keys(changes).some((key) => watchedKeys.has(key))) {
      refreshStudyData();
    }
  });
});
