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
    semanticFlowChains: "ICE_SEMANTIC_FLOW_CHAINS",
    entityRegistry: "ICE_ENTITY_REGISTRY",
    relationshipGraph: "ICE_RELATIONSHIP_GRAPH",
    canonicalIdentities: "ICE_CANONICAL_IDENTITIES",
    mentionIndex: "ICE_MENTION_INDEX",
    domSemanticHints: "ICE_DOM_SEMANTIC_HINTS",
    sourceAdapters: "ICE_SOURCE_ADAPTERS",
    activeAdapter: "ICE_ACTIVE_ADAPTER",
    scopeIntegrity: "ICE_SCOPE_INTEGRITY",
    sourceDiscoveryIndex: "ICE_SOURCE_DISCOVERY_INDEX",
    referenceGraph: "ICE_REFERENCE_GRAPH",
    entityRoleItems: "ICE_ENTITY_ROLE_ITEMS",
    principleItems: "ICE_PRINCIPLE_ITEMS",
    prophecyLinks: "ICE_PROPHECY_LINKS",
    analysisStatus: "ICE_ANALYSIS_STATUS"
  };
  const DISPLAY_LIMIT = 5;

  let studyData = {};
  console.log("[FOCUS DEBUG] study.js loaded", {
    rendererVersion: "v2",
    focusedMountCount: document.querySelectorAll("#focused-relationship-view").length
  });

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

  function displayConfidence(value) {
    if (value === "inferred-source") return "attributed";
    if (value === "traditional-attribution") return "believed";
    return value;
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

    const traditionalAuthors = {
      Matthew: "Matthew",
      Mark: "Mark",
      Luke: "Luke",
      John: "John"
    };
    const traditionalAuthor = looksScripture && book ? traditionalAuthors[book] || "" : "";

    return {
      sourceCaptureId: capture.id || "",
      sourceTitle: title,
      sourceUrl: url,
      sourceType: looksScripture ? "scripture" : "unknown",
      collection: looksScripture ? "scripture" : "unknown",
      sourceCollection: looksScripture ? "scripture" : "unknown",
      book,
      chapter,
      section: "",
      author: "",
      traditionalAuthor,
      speaker: "",
      compiler: "",
      translator: "",
      authorConfidence: traditionalAuthor ? "traditional-attribution" : "",
      authorBasis: traditionalAuthor ? "book/source metadata" : "",
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
      context.sourceCollection && context.sourceCollection !== context.collection ? `Source Collection: ${context.sourceCollection}` : "",
      context.sourceType ? `Type: ${context.sourceType}` : "",
      context.book ? `Book: ${context.book}` : "",
      context.chapter ? `Chapter: ${context.chapter}` : "",
      context.section ? `Section: ${context.section}` : "",
      context.author ? `Author: ${context.author}` : "",
      context.traditionalAuthor ? `Believed Author: ${context.traditionalAuthor}` : "",
      context.authorConfidence ? `Confidence: ${displayConfidence(context.authorConfidence)}` : "",
      context.authorBasis ? `Author Basis: ${context.authorBasis}` : "",
      context.speaker ? `Speaker: ${context.speaker}` : "",
      context.compiler ? `Compiler: ${context.compiler}` : "",
      context.translator ? `Translator: ${context.translator}` : "",
      context.explicitDate ? `Date: ${context.explicitDate}` : "",
      context.inferredDate ? `Inferred date: ${context.inferredDate}` : "",
      context.timeRange ? `Range: ${context.timeRange}` : "",
      context.confidence ? `Source Confidence: ${displayConfidence(context.confidence)}` : ""
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
      context.sourceCollection,
      context.sourceType,
      context.book,
      context.chapter,
      context.section,
      context.author,
      context.traditionalAuthor,
      context.authorConfidence,
      context.authorBasis,
      context.speaker,
      context.compiler,
      context.translator,
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
  function addEntityRole(groups, groupName, name, confidence = "probable", metadata = {}) {
    const cleanName = normalizeText(name || "");
    if (!cleanName) return;
    if (!groups[groupName]) groups[groupName] = new Map();
    const key = cleanName.toLowerCase();
    if (!groups[groupName].has(key)) {
      groups[groupName].set(key, {
        name: cleanName,
        confidence,
        actorReason: metadata.actorReason || metadata.evidence || "",
        semanticEventReference: metadata.semanticEventReference || "",
        eventType: metadata.eventType || "",
        anchorText: metadata.anchorText || ""
      });
    }
  }

  function displayEntityRoleReason(reason, item = {}) {
    const covenantParts = normalizeText(reason)
      .split(";")
      .map((part) => part.trim())
      .filter((part) => /^(instruction|response|concerning|covenant relation):/i.test(part));
    if (covenantParts.length > 0) return covenantParts.join("\n- ");
    const normalizedReason = normalizeText(reason).toLowerCase();
    const normalizedName = normalizeText(item.name).toLowerCase();
    if (normalizedReason === "took / accepted mary as wife") {
      return "accepted / took Mary as wife";
    }
    if (normalizedName === "matthew" && normalizedReason === "believed author") {
      return "author";
    }
    if (normalizedName === "scripture narrator" && normalizedReason === "narrates fulfillment") {
      return "narrative voice identifying fulfillment";
    }
    if (normalizedReason === "captured divine title") {
      return "source title: JESUS CHRIST; narrative identity: JESUS / child; retrospective identity: CHRIST";
    }
    return reason || "";
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
    "Source Metadata Entities",
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
        item.confidence || "probable",
        item
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

    const sourceContext = findSourceContext();
    if (sourceContext?.traditionalAuthor) {
      addEntityRole(
        groups,
        "Source Metadata Entities",
        sourceContext.traditionalAuthor,
        sourceContext.authorConfidence || "traditional-attribution",
        {
          actorReason: "believed author",
          evidence: sourceContext.authorBasis || "book/source metadata",
          eventType: "source_metadata",
          anchorText: sourceContext.authorBasis || "book/source metadata"
        }
      );
    }

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

  function entityRoleDisplayRank(item, groupName) {
    const name = normalizeText(item?.name || "").toLowerCase();
    const reason = normalizeText(item?.actorReason || item?.evidence || "").toLowerCase();

    if (groupName === "Divine / Glorified Entities") {
      if (name === "the lord" || reason.includes("source authority")) return 10;
      if (name === "angel of the lord" || reason.includes("messenger")) return 20;
      if (name === "jesus christ" || name === "jesus" || reason.includes("lineage focus") || reason.includes("attains divine title")) return 30;
      return 40;
    }

    if (groupName === "Source Authorities") {
      if (name === "the lord") return 10;
      return 20;
    }

    if (groupName === "Source Metadata Entities") {
      if (reason.includes("believed author") || reason.includes("traditional")) return 10;
      return 20;
    }

    return 50;
  }

  function sortEntityRoleItemsForDisplay(items, groupName) {
    return [...items].sort((left, right) =>
      entityRoleDisplayRank(left, groupName) - entityRoleDisplayRank(right, groupName) ||
      normalizeText(left.name).localeCompare(normalizeText(right.name))
    );
  }

  function entityRoleTypeForDisplay(groupName) {
    const normalized = normalizeText(groupName || "").toLowerCase();
    const map = new Map([
      ["direct actors", "directActor"],
      ["source authorities", "sourceAuthority"],
      ["source metadata entities", "sourceMetadata"],
      ["recipients / targets", "recipient"],
      ["instruction recipients", "instructionRecipient"],
      ["instruction concerning", "instructionConcerning"],
      ["covenant / family participants", "covenantFamilyParticipant"],
      ["divine / glorified entities", "divineGlorifiedEntity"],
      ["lineage focus", "lineageFocus"],
      ["participants", "participant"],
      ["lineage persons", "lineagePerson"]
    ]);

    return map.get(normalized) || normalized.replace(/\s+/g, "_") || "mentioned";
  }

  function candidateNamesForEntityClass(item = {}) {
    return [
      item.canonicalName,
      item.displayName,
      item.entityName,
      item.name,
      ...asArray(item.aliases),
      ...asArray(item.surfaceForms)
    ].map((name) => normalizeText(name).toLowerCase()).filter(Boolean);
  }

  function classifiedStoredEntityForRole(item = {}) {
    const roleName = normalizeText(item.name || item.entityName || "").toLowerCase();
    if (!roleName) return "";

    const candidates = [
      ...asArray(studyData.entityRegistry),
      ...asArray(studyData.canonicalIdentities)
    ];

    for (const entity of candidates) {
      if (!candidateNamesForEntityClass(entity).includes(roleName)) continue;
      const entityClass = classifyEntityDisplay(entity);
      if (entityClass) return entityClass;
    }

    return "";
  }

  function entityRoleClassForDisplay(item = {}, groupName = "") {
    const storedClass = classifiedStoredEntityForRole(item);
    if (storedClass) return storedClass;

    const roleType = entityRoleTypeForDisplay(groupName);
    return classifyEntityDisplay({
      ...item,
      canonicalName: item.name || item.entityName || "",
      displayName: item.name || item.entityName || "",
      roleTypes: [roleType, groupName, item.eventType].filter(Boolean),
      identityScope: item.actorReason || item.evidence || item.anchorText || "",
      relationships: item.semanticEventReference
        ? [{ relationshipType: item.eventType || roleType, evidence: item.semanticEventReference }]
        : []
    });
  }

  function createEntityRoleCard(group) {
    const card = document.createElement("article");
    const heading = document.createElement("h3");
    const list = document.createElement("div");
    const sortedEntities = sortEntityRoleItemsForDisplay(group.entities, group.groupName);
    const visible = sortedEntities.slice(0, group.groupName === "Lineage Persons" ? 8 : 5);
    const hidden = group.entities.length - visible.length;

    card.className = "study-card";
    heading.textContent = renderDivineDisplayText(group.groupName || "Entity roles");
    list.className = "entity-role-list";

    for (const item of visible) {
      const roleItem = document.createElement("div");
      const name = document.createElement("div");
      const confidence = displayConfidence(item.confidence || "probable");

      roleItem.className = "entity-role-item";
      name.className = "entity-role-name";
      name.textContent = renderDivineDisplayText(`${item.name} (${confidence})`);
      roleItem.appendChild(name);

      const entityClass = entityRoleClassForDisplay(item, group.groupName);
      if (entityClass) {
        const classLine = document.createElement("div");
        classLine.className = "entity-role-class";
        classLine.textContent = renderDivineDisplayText(`Class: ${entityClassLabel(entityClass)}`);
        roleItem.appendChild(classLine);
      }

      if (item.actorReason) {
        const reason = document.createElement("div");
        reason.className = "entity-role-reason";
        reason.textContent = renderDivineDisplayText(`- ${displayEntityRoleReason(item.actorReason, item)}`);
        roleItem.appendChild(reason);
      }

      if (item.anchorText && item.actorReason && item.anchorText !== item.actorReason) {
        const anchor = document.createElement("div");
        anchor.className = "entity-role-anchor";
        anchor.textContent = renderDivineDisplayText(`- source phrase: ${trimText(item.anchorText, 70)}`);
        roleItem.appendChild(anchor);
      }

      list.appendChild(roleItem);
    }

    if (hidden > 0) {
      const hiddenNote = document.createElement("p");
      hiddenNote.className = "empty-state";
      hiddenNote.textContent = `${hidden} more hidden; future full lineage/entity view.`;
      list.appendChild(hiddenNote);
    }

    const metaText = document.createElement("span");
    metaText.className = "meta";
    metaText.textContent = group.groupName === "Lineage Persons"
      ? "lineage graph / family tree foundation"
      : "role grouping; direct actor timelines remain separate";

    card.append(heading, list, metaText);
    return card;
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
      container.appendChild(createEntityRoleCard(group));
    }
  }
  // Roadmap only: future semantic/glorified rendering should map resolved
  // entityType -> entityClass -> renderClass. Do not classify by word alone;
  // use entity resolution, context, relationship, confidence, and source scope.
  // I = GOD / Divine Authority
  // II = AngEL / Messenger of GOD
  // III = Human
  // IIII = Other living organisms
  // IIIII = Non-living items / objects
  // IIIIII = Anti-GOD / adversary
  const FUTURE_ENTITY_CLASSES = Object.freeze({
    I: Object.freeze({
      label: "GOD / Divine Authority",
      rank: 1,
      entityTypes: Object.freeze(["divine_authority", "divine_redeemer"]),
      examples: Object.freeze(["GOD", "THE LORD", "YHWH", "JESUS CHRIST"]),
      renderClass: "I"
    }),
    II: Object.freeze({
      label: "AngEL / Messenger of GOD",
      rank: 2,
      entityTypes: Object.freeze(["divine_messenger", "angelic_messenger"]),
      examples: Object.freeze(["Angel of THE LORD", "AngEL", "Gabriel"]),
      renderClass: "II"
    }),
    III: Object.freeze({
      label: "Human",
      rank: 3,
      entityTypes: Object.freeze(["human", "prophet", "author", "narrator", "lineage_person"]),
      examples: Object.freeze(["Joseph", "Mary", "Matthew", "Abraham"]),
      renderClass: "III"
    }),
    IIII: Object.freeze({
      label: "Other living organisms",
      rank: 4,
      entityTypes: Object.freeze(["animal", "plant", "living_organism"]),
      examples: Object.freeze(["lamb", "dove", "fig tree"]),
      renderClass: "IIII"
    }),
    IIIII: Object.freeze({
      label: "Non-living items / objects",
      rank: 5,
      entityTypes: Object.freeze(["object", "place", "artifact", "symbolic_item"]),
      examples: Object.freeze(["altar", "temple", "stone", "rod"]),
      renderClass: "IIIII"
    }),
    IIIIII: Object.freeze({
      label: "Anti-GOD / adversary",
      rank: 6,
      entityTypes: Object.freeze(["adversary", "anti_god", "deceiver"]),
      examples: Object.freeze(["satan", "lucifer", "adversary", "perdition"]),
      renderClass: "IIIIII"
    })
  });
  function entityClassRecord(entityClass) {
    return FUTURE_ENTITY_CLASSES[entityClass] || null;
  }

  function entityClassLabel(entityClass) {
    const record = entityClassRecord(entityClass);
    return record ? `${record.renderClass} - ${record.label}` : "Unclassified";
  }

  function classifyEntityDisplay(item = {}) {
    const canonicalName = normalizeText(item.canonicalName || item.displayName || item.entityName || item.name || "");
    const normalizedName = canonicalName.toLowerCase();
    const entityType = normalizeText(item.entityType || "").toLowerCase();
    const roleTypes = new Set(asArray(item.roleTypes).map((role) => normalizeText(role).toLowerCase()));
    const aliases = asArray(item.aliases).map((alias) => normalizeText(alias).toLowerCase());
    const surfaces = asArray(item.surfaceForms).map((surface) => normalizeText(surface).toLowerCase());
    const identityScope = normalizeText(item.identityScope || "").toLowerCase();
    const relationshipText = asArray(item.relationships)
      .map((relationship) => [relationship.relationshipType, relationship.target, relationship.evidence].join(" "))
      .join(" ")
      .toLowerCase();
    const allNames = [normalizedName, ...aliases, ...surfaces].filter(Boolean);
    const hasExactName = (names) => allNames.some((name) => names.includes(name));

    // Display-only Phase 6.5 classifier. It intentionally depends on resolved
    // entity metadata and role/context signals, not raw substrings inside words.
    if (["adversary", "anti_god", "deceiver"].includes(entityType) ||
        hasExactName(["satan", "lucifer", "adversary", "perdition"])) {
      return "IIIIII";
    }

    if (["divine_authority", "divine_redeemer"].includes(entityType) ||
        hasExactName(["god", "the lord", "yhwh", "jesus christ", "jesus"]) ||
        (entityType === "divine" && (roleTypes.has("divineglorifiedentity") || roleTypes.has("lineagefocus") || /retrospective identity: christ|source title: jesus christ/.test(identityScope)))) {
      return "I";
    }

    if (["divine_messenger", "angelic_messenger"].includes(entityType) ||
        hasExactName(["angel of the lord"]) ||
        /authoritysource|messenger|divine messenger/.test(relationshipText)) {
      return "II";
    }

    if (["human", "prophet", "author", "narrator", "lineage_person", "traditional_author", "source_author"].includes(entityType) ||
        roleTypes.has("traditionalauthor") || roleTypes.has("sourcemetadata") || roleTypes.has("lineageperson")) {
      return "III";
    }

    if (["animal", "plant", "living_organism"].includes(entityType)) return "IIII";
    if (["object", "place", "artifact", "symbolic_item"].includes(entityType)) return "IIIII";

    return "";
  }

  function classifiedEntityCount() {
    const keys = new Set();
    for (const item of [...asArray(studyData.entityRegistry), ...asArray(studyData.canonicalIdentities)]) {
      const entityClass = classifyEntityDisplay(item);
      if (!entityClass) continue;
      keys.add(`${item.canonicalName || item.displayName || item.entityName || item.name || "entity"}|${entityClass}`);
    }
    return keys.size;
  }
  // Default Study Panel order uses Source / Authority flow for passage comprehension.
  // Future display modes can offer Source / Authority Order, chronological
  // mention order, Christ-centered / redemptive order, entity type order,
  // and lineage order without changing stored semantic registry data.
  // Future identity-scope modeling should distinguish explicit source title,
  // current narrative identity, retrospective identity, and character awareness.
  function entityRegistryDisplayRank(entity) {
    const type = entity?.entityType || "entity";
    const roles = new Set(asArray(entity?.roleTypes));

    if (type === "divine_authority") return 10;
    if (type === "divine_messenger") return 20;
    if (type === "human" && (roles.has("recipient") || roles.has("instructionRecipient") || roles.has("directActor") || roles.has("covenantFamilyParticipant"))) return 30;
    if (type === "human" && (roles.has("participant") || roles.has("instructionConcerning") || roles.has("concerningEntity"))) return 40;
    if (type === "divine" && (roles.has("namedChild") || roles.has("lineageFocus") || roles.has("divineGlorifiedEntity"))) return 50;
    if (type === "divine") return 55;
    if (type === "narrator") return 60;
    if (type === "traditional_author" || type === "source_author") return 65;
    if (type === "lineage_person") return 70;
    return 90;
  }

  function sortEntityRegistryForDisplay(items) {
    return [...items].sort((left, right) =>
      entityRegistryDisplayRank(left) - entityRegistryDisplayRank(right) ||
      (asArray(right.relationships).length + asArray(right.mentions).length) -
        (asArray(left.relationships).length + asArray(left.mentions).length) ||
      normalizeText(left.canonicalName || left.displayName).localeCompare(
        normalizeText(right.canonicalName || right.displayName)
      )
    );
  }
  function renderEntityRegistry(term) {
    const container = document.getElementById("entityRegistryCards");
    const count = document.getElementById("entityRegistryCount");
    const filtered = filteredEntityRegistry(term);

    renderLimited(container, sortEntityRegistryForDisplay(filtered), count, (entity) => {
      const roleTypes = asArray(entity.roleTypes);
      const aliases = asArray(entity.aliases);
      const mentions = asArray(entity.mentions);
      const relationships = asArray(entity.relationships);
      const rolesPreview = roleTypes.slice(0, 5).join(", ") || "No roles yet";
      const roleOverflow = roleTypes.length > 5
        ? `; ${roleTypes.length - 5} more role(s)`
        : "";
      const aliasPreview = aliases.slice(0, 3).join(", ");
      const entityClass = classifyEntityDisplay(entity);
      const classLine = entityClass ? `Class: ${entityClassLabel(entityClass)}` : "Class: Unclassified";

      return createCard(
        entity.displayName || entity.canonicalName || "Entity",
        [
          classLine,
          `Type: ${entity.entityType || "entity"}`,
          `Roles: ${rolesPreview}${roleOverflow}`,
          `Mentions: ${mentions.length}`,
          `Relationships: ${relationships.length}`
        ].join("\n"),
        aliasPreview ? `Aliases: ${aliasPreview}` : "derived graph node"
      );
    }, "No entity registry entries match.", "entity");
  }
  function relationshipGraphDisplayRank(edge) {
    const type = edge?.relationshipType || "relationship";
    const from = edge?.fromEntity || "";
    const to = edge?.toEntity || "";
    const pair = `${from}->${to}`.toLowerCase();

    if (type === "source_authority") return 10;
    if (type === "delegated_authority") return 15;
    if (type === "divine_message") return 20;
    if (pair.includes("joseph->mary") && type === "covenant_family_union") return 30;
    if (pair.includes("mary->jesus christ") && type === "birth") return 40;
    if (pair.includes("joseph->jesus christ") && type === "naming") return 45;
    if (type === "fulfillment_narration") return 55;
    if (type === "lineage_father_son") return 70;
    return 80;
  }

  function sortRelationshipGraphForDisplay(items) {
    return [...items].sort((left, right) =>
      relationshipGraphDisplayRank(left) - relationshipGraphDisplayRank(right) ||
      Number(left.sequenceOrder || 0) - Number(right.sequenceOrder || 0) ||
      normalizeText(left.fromEntity).localeCompare(normalizeText(right.fromEntity)) ||
      normalizeText(left.toEntity).localeCompare(normalizeText(right.toEntity)) ||
      normalizeText(left.relationshipType).localeCompare(normalizeText(right.relationshipType))
    );
  }
  function parseSearchTerms(term) {
    const normalized = normalizeText(term).toLowerCase();
    if (!normalized) return [];
    if (normalized.includes(",")) {
      return Array.from(new Set(normalized
        .split(",")
        .map((part) => part.trim())
        .filter(Boolean)));
    }
    const words = normalized.split(/\s+/).filter(Boolean);
    return Array.from(new Set([normalized, ...words]));
  }

  function matchesSearchQuery(value, term) {
    const terms = parseSearchTerms(term);
    if (terms.length === 0) return true;
    const searchable = normalizeText(value).toLowerCase();
    return terms.some((searchTerm) => searchable.includes(searchTerm));
  }

  function relationshipSearchText(edge) {
    return [
      edge.fromEntity,
      edge.toEntity,
      edge.relationshipType,
      edge.semanticCategory,
      edge.evidencePhrase,
      edge.confidence,
      edge.derivedFrom
    ].join(" ");
  }

  function entityRegistrySearchText(entity) {
    return [
      entity.canonicalName,
      entity.displayName,
      entity.entityType,
      asArray(entity.roleTypes).join(" "),
      asArray(entity.aliases).join(" "),
      asArray(entity.relationships).map((relationship) => [
        relationship.relationshipType,
        relationship.target,
        relationship.source
      ].join(" ")).join(" ")
    ].join(" ");
  }

  function canonicalIdentitySearchText(identity) {
    return [
      identity.canonicalName,
      identity.entityType,
      identity.identityScope,
      asArray(identity.aliases).join(" "),
      asArray(identity.surfaceForms).join(" "),
      asArray(identity.evidencePhrases).join(" "),
      identity.confidence,
      identity.notes
    ].join(" ");
  }

  function semanticEventSearchText(item) {
    return [
      item.actor,
      item.action,
      item.target,
      item.recipient,
      item.concerning,
      item.narrator,
      item.quotedSpeaker,
      item.eventType,
      item.semanticCategory,
      item.relationshipType,
      item.normalizedMeaning,
      item.anchorText,
      item.sourceSnippet,
      asArray(item.participants).join(" "),
      asArray(item.authorityChain).join(" ")
    ].join(" ");
  }

  function semanticFlowChainSearchText(chain) {
    return [
      chain.chainTitle,
      chain.chainType,
      chain.summary,
      asArray(chain.authorityChain).join(" "),
      asArray(chain.nodes).map((node) => [
        node.actor,
        node.action,
        node.target,
        node.eventType,
        node.anchorText
      ].join(" ")).join(" "),
      asArray(chain.relationships).map((relationship) => [
        relationship.relationType,
        relationship.evidenceSnippet,
        relationship.confidence
      ].join(" ")).join(" ")
    ].join(" ");
  }

  function filteredRelationshipGraph(term) {
    return sortRelationshipGraphForDisplay(asArray(studyData.relationshipGraph)
      .filter((edge) => matchesSearchQuery(relationshipSearchText(edge), term)));
  }

  function filteredEntityRegistry(term) {
    return sortEntityRegistryForDisplay(asArray(studyData.entityRegistry)
      .filter((entity) => matchesSearchQuery(entityRegistrySearchText(entity), term)));
  }

  function filteredCanonicalIdentities(term) {
    return asArray(studyData.canonicalIdentities)
      .filter((identity) => matchesSearchQuery(canonicalIdentitySearchText(identity), term));
  }

  function filteredSemanticEvents(term) {
    return asArray(studyData.semanticEvents)
      .filter((item) => matchesSearchQuery(semanticEventSearchText(item), term));
  }

  function filteredSemanticFlowChains(term) {
    return asArray(studyData.semanticFlowChains)
      .filter((chain) => matchesSearchQuery(semanticFlowChainSearchText(chain), term));
  }

  function focusedBuckets(term) {
    return {
      relationships: filteredRelationshipGraph(term),
      entities: filteredEntityRegistry(term),
      canonicalIdentities: filteredCanonicalIdentities(term),
      semanticEvents: filteredSemanticEvents(term),
      flowChains: filteredSemanticFlowChains(term)
    };
  }

  function renderFocusedGraph(term) {
    const mount = document.getElementById("focused-relationship-view");
    const mountCount = document.querySelectorAll("#focused-relationship-view").length;
    console.log("[FOCUS DEBUG] mount found", {
      found: Boolean(mount),
      mountCount
    });
    if (!mount) return;
    clearElement(mount);

    if (!term) return;

    const buckets = focusedBuckets(term);
    console.log("[FOCUS DEBUG] rendering focus view", {
      searchText: term,
      termArray: parseSearchTerms(term),
      relationshipCount: buckets.relationships.length,
      entityCount: buckets.entities.length,
      identityCount: buckets.canonicalIdentities.length,
      semanticEventCount: buckets.semanticEvents.length,
      flowChainCount: buckets.flowChains.length
    });

    const section = document.createElement("section");
    const debugBox = document.createElement("div");
    const heading = document.createElement("div");
    const title = document.createElement("h2");
    const count = document.createElement("span");
    const marker = document.createElement("p");
    const version = document.createElement("p");
    const cards = document.createElement("div");

    section.className = "study-section focused-relationship-view";
    heading.className = "section-heading";
    count.className = "count-label";
    marker.className = "focus-render-marker";
    version.className = "focus-render-marker";
    cards.className = "card-grid";
    debugBox.setAttribute("style", "border:2px solid red;padding:8px;margin-bottom:8px;background:#fff5f5;color:#8a0000;font-weight:700;");
    debugBox.textContent = "[FOCUS VIEW ACTIVE] Renderer Version: v2";

    marker.textContent = "[FOCUS VIEW ACTIVE]";
    version.textContent = "Renderer Version: v2";
    title.textContent = `Focused Relationship View: ${renderDivineDisplayText(term)}`;

    const total = buckets.relationships.length + buckets.entities.length +
      buckets.canonicalIdentities.length + buckets.semanticEvents.length + buckets.flowChains.length;
    count.textContent = `Found: ${total} focused item(s)`;

    heading.append(title, count);
    section.append(debugBox, marker, version, heading, cards);
    mount.appendChild(section);

    if (total === 0) {
      appendEmpty(cards, `No focused items found for: ${term}`);
      return;
    }

    const renderBucket = (bucketTitleText, items, renderItem) => {
      if (items.length === 0) return;
      const preview = document.createElement("article");
      const bucketTitle = document.createElement("h3");
      const list = document.createElement("div");
      preview.className = "study-card focused-bucket";
      bucketTitle.textContent = `${bucketTitleText} (${items.length})`;
      list.className = "focused-bucket-list";
      for (const item of items.slice(0, 4)) {
        const line = document.createElement("p");
        line.textContent = renderDivineDisplayText(renderItem(item));
        list.appendChild(line);
      }
      if (items.length > 4) {
        const more = document.createElement("span");
        more.className = "meta";
        more.textContent = `${items.length - 4} more hidden by preview limit.`;
        list.appendChild(more);
      }
      preview.append(bucketTitle, list);
      cards.appendChild(preview);
    };

    renderBucket("Relationships", buckets.relationships, (edge) =>
      `${edge.fromEntity || "Entity"} -> ${edge.toEntity || "Entity"} | ${edge.relationshipType || "relationship"} | ${edge.evidencePhrase ? `source phrase: ${trimText(edge.evidencePhrase, 80)}` : edge.derivedFrom || "derived"}`
    );
    renderBucket("Entity Registry nodes", buckets.entities, (entity) => {
      const entityClass = classifyEntityDisplay(entity);
      return `${entity.displayName || entity.canonicalName || "Entity"} | ${entityClass ? `Class: ${entityClassLabel(entityClass)}` : "Class: Unclassified"} | ${entity.entityType || "entity"} | ${asArray(entity.roleTypes).slice(0, 4).join(", ") || "No roles yet"}`;
    });
    renderBucket("Canonical Identities", buckets.canonicalIdentities, (identity) => {
      const entityClass = classifyEntityDisplay(identity);
      return `${identity.canonicalName || "Canonical identity"} | ${entityClass ? `Class: ${entityClassLabel(entityClass)}` : "Class: Unclassified"} | ${identity.identityScope || "source-mentioned"}`;
    });
    renderBucket("Semantic Events", buckets.semanticEvents, (item) => {
      const target = item.target || item.recipient || item.concerning || "";
      return `${item.actor || item.narrator || "Unknown"} -> ${item.action || "acts"}${target ? ` -> ${target}` : ""} | ${item.anchorText || trimText(item.sourceSnippet, 80)}`;
    });
    renderBucket("Flow Chains", buckets.flowChains, (chain) =>
      `${chain.chainTitle || "Semantic flow chain"} | ${trimText(chain.summary, 90)}`
    );

    // Phase 6.4 focus mode has one dynamic mount point. Future work can turn
    // these focused slices into clickable graph traversal, visual graph
    // navigation, timeline graph exploration, Alpha/Omega graph navigation, and
    // scoped AI_Actor awareness.
  }
  function renderRelationshipGraph(term) {
    const container = document.getElementById("relationshipGraphCards");
    const count = document.getElementById("relationshipGraphCount");
    const filtered = filteredRelationshipGraph(term);

    renderLimited(container, filtered, count, (edge) => createCard(
      `${edge.fromEntity || "Entity"} -> ${edge.toEntity || "Entity"}`,
      `${edge.relationshipType || "relationship"} (${displayConfidence(edge.confidence || "probable")})`,
      edge.evidencePhrase ? `source phrase: ${trimText(edge.evidencePhrase, 90)}` : edge.derivedFrom || "derived relationship"
    ), "No relationship graph edges match.", "relationship");
  }
  function renderCanonicalIdentities(term) {
    const container = document.getElementById("canonicalIdentityCards");
    const count = document.getElementById("canonicalIdentityCount");
    const filtered = filteredCanonicalIdentities(term);

    renderLimited(container, filtered, count, (identity) => {
      const aliases = asArray(identity.aliases).slice(0, 5).join(", ") || "No aliases yet";
      const surfaces = asArray(identity.surfaceForms).slice(0, 4).join(", ");
      const entityClass = classifyEntityDisplay(identity);
      return createCard(
        identity.canonicalName || "Canonical identity",
        [
          entityClass ? `Class: ${entityClassLabel(entityClass)}` : "Class: Unclassified",
          `Aliases: ${aliases}`,
          `Identity scope: ${identity.identityScope || "source-mentioned"}`,
          surfaces ? `Surface forms: ${surfaces}` : ""
        ].filter(Boolean).join("\n"),
        `${identity.entityType || "entity"} | ${displayConfidence(identity.confidence || "probable")}`
      );
    }, "No canonical identities match.", "identity");
  }
  function mentionSearchText(item) {
    return [
      item.mentionText,
      item.normalizedText,
      item.mentionType,
      item.entityClass,
      item.linkedEntity,
      item.roleHint,
      item.sourcePhrase,
      item.scopePath,
      item.confidence
    ].join(" ");
  }



  function sourceAdapterSearchText(adapter) {
    return [
      adapter?.adapterName,
      adapter?.adapterId,
      asArray(adapter?.supportedDomains).join(" "),
      asArray(adapter?.supportedPatterns).join(" "),
      asArray(adapter?.semanticCapabilities).join(" "),
      asArray(adapter?.detectedCapabilities).join(" "),
      adapter?.confidence,
      adapter?.derivedFrom,
      adapter?.sourceTitle,
      adapter?.sourceUrl
    ].join(" ");
  }

  function renderSourceAdapter(term) {
    const container = document.getElementById("sourceAdapterCards");
    const count = document.getElementById("sourceAdapterCount");
    const active = studyData.activeAdapter;
    const adapters = asArray(studyData.sourceAdapters);

    clearElement(container);

    if (!active?.adapterName) {
      count.textContent = "0 active";
      appendEmpty(container, "No source adapter detected yet.");
      return;
    }

    if (!matchesSearchQuery(sourceAdapterSearchText(active), term)) {
      count.textContent = "0 active";
      appendEmpty(container, "No source adapter matches.");
      return;
    }

    count.textContent = "1 active";
    const capabilities = asArray(active.detectedCapabilities || active.semanticCapabilities);
    container.appendChild(createCard(
      active.adapterName,
      [
        `Capabilities: ${capabilities.join(", ") || "none detected"}`,
        `Confidence: ${displayConfidence(active.confidence || "possible")}`,
        active.fallbackMode ? "Fallback mode: yes" : "Fallback mode: no",
        active.derivedFrom ? `Detected from: ${active.derivedFrom}` : "",
        active.version ? `Version: ${active.version}` : ""
      ].filter(Boolean).join("\n"),
      `${adapters.length || 0} registered adapter(s)`
    ));
  }
  function domSemanticHintSearchText(item) {
    return [
      item.hintType,
      item.text,
      item.normalizedText,
      item.verseRef,
      item.verseNumber,
      item.domId,
      item.selectorHint,
      item.confidence,
      item.source,
      item.originalText,
      item.entityClass,
      item.noHighlight ? "no-highlight" : "",
      item.scopePath,
      item.sourceContext?.book,
      item.sourceContext?.chapter
    ].join(" ");
  }

  function domHintSummary(items) {
    const counts = new Map();
    for (const item of items) {
      const key = item.hintType || "unknown";
      counts.set(key, (counts.get(key) || 0) + 1);
    }
    return Array.from(counts.entries())
      .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
      .map(([key, value]) => `${key}: ${value}`)
      .join("\n");
  }


  function renderScopeIntegrity(term) {
    const container = document.getElementById("scopeIntegrityCards");
    const count = document.getElementById("scopeIntegrityCount");
    const report = studyData.scopeIntegrity || {};
    const samplePaths = asArray(report.sampleScopePaths);
    const searchText = [
      report.adapterName,
      report.adapterId,
      samplePaths.join(" ")
    ].join(" ");

    clearElement(container);

    if (!report.generatedAt) {
      count.textContent = "0 scoped";
      appendEmpty(container, "No scope integrity report yet.");
      return;
    }

    if (!matchesSearchQuery(searchText, term)) {
      count.textContent = "0 scoped";
      appendEmpty(container, "No scope integrity items match.");
      return;
    }

    const layerCounts = Object.entries(report.countsByLayer || {})
      .sort((a, b) => a[0].localeCompare(b[0]))
      .map(([layer, value]) => `${layer}: ${value}`);

    count.textContent = `${report.scopedItemsCount || 0} scoped`;
    container.appendChild(createCard(
      "Scope Integrity",
      [
        `Scoped items: ${report.scopedItemsCount || 0}`,
        `Missing scope: ${report.missingScopeCount || 0}`,
        report.totalItemsCount ? `Total checked: ${report.totalItemsCount}` : "",
        `Adapter: ${report.adapterName || "unknown"}`,
        report.adapterId ? `Adapter ID: ${report.adapterId}` : "",
        `Generated: ${report.generatedAt || ""}`
      ].filter(Boolean).join("\n"),
      "unified source position layer"
    ));

    if (samplePaths.length > 0) {
      container.appendChild(createCard(
        "Sample Scope Paths",
        samplePaths.slice(0, 8).join("\n"),
        "preview only"
      ));
    }

    if (layerCounts.length > 0) {
      container.appendChild(createCard(
        "Scoped Layers",
        layerCounts.join("\n"),
        "counts by derived layer"
      ));
    }
  }
  function activeScopeContext() {
    return findSourceContext() || studyData.latestCapture?.sourceContext || {};
  }

  function scopeBookSlug(value) {
    const normalized = normalizeText(value || "").toLowerCase();
    const aliases = new Map([
      ["matt", "matthew"],
      ["mt", "matthew"],
      ["matthew", "matthew"],
      ["mark", "mark"],
      ["luke", "luke"],
      ["john", "john"]
    ]);
    return aliases.get(normalized) || normalized.replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "source";
  }

  function scopeBookTitle(value) {
    const slug = scopeBookSlug(value);
    const titles = new Map([
      ["matthew", "Matthew"],
      ["mark", "Mark"],
      ["luke", "Luke"],
      ["john", "John"]
    ]);
    return titles.get(slug) || capitalizeWord(slug.replace(/-/g, " "));
  }

  function parseVerseScopeFocus(term) {
    const normalized = normalizeText(term).toLowerCase();
    if (!normalized) return null;

    const context = activeScopeContext();
    let book = context.book || "Matthew";
    let chapter = context.chapter || "";
    let verse = "";

    const fullScope = normalized.match(/\bscripture\.nt\.([^.\s]+)\.(\d+)\.(?:verse|note)\.(\d+[a-z]?)\b/i);
    if (fullScope) {
      book = fullScope[1];
      chapter = fullScope[2];
      verse = fullScope[3].match(/\d+/)?.[0] || "";
    }

    if (!verse) {
      const verseRef = normalized.match(/(?:\b([a-z]+)\s+)?\b(\d+):(\d+)\b/i);
      if (verseRef) {
        if (verseRef[1]) book = verseRef[1];
        chapter = verseRef[2];
        verse = verseRef[3];
      }
    }

    if (!verse) {
      const verseOnly = normalized.match(/\bverse[.\s:_-]*(\d+)\b/i);
      if (verseOnly) verse = verseOnly[1];
    }

    if (!verse || !chapter) return null;

    const bookSlug = scopeBookSlug(book);
    return {
      bookSlug,
      bookTitle: scopeBookTitle(book),
      chapter: String(chapter),
      verseNumber: String(verse),
      verseRef: `${chapter}:${verse}`,
      scopePath: `scripture.nt.${bookSlug}.${chapter}.verse.${verse}`,
      noteScopePrefix: `scripture.nt.${bookSlug}.${chapter}.note.${verse}`,
      displayLabel: `${scopeBookTitle(book)} ${chapter}:${verse}`
    };
  }

  function scopePathMatchesFocus(scopePath, focus) {
    const value = normalizeText(scopePath || "").toLowerCase();
    if (!value || !focus) return false;
    return value === focus.scopePath ||
      value.startsWith(`${focus.scopePath}.`) ||
      value.startsWith(focus.noteScopePrefix) ||
      value.includes(`.${focus.chapter}.verse.${focus.verseNumber}`) ||
      value.includes(`.${focus.chapter}.note.${focus.verseNumber}`);
  }

  function itemMatchesVerseFocus(item = {}, focus) {
    if (!focus) return false;
    const scopeCandidates = [
      item.scopePath,
      item.fromScopePath,
      item.sourceScopePath,
      item.sourceContext?.scopePath
    ];
    if (scopeCandidates.some((scopePath) => scopePathMatchesFocus(scopePath, focus))) return true;

    const verseRef = normalizeText(item.verseRef || item.sourceContext?.verseRef || "");
    if (verseRef === focus.verseRef) return true;

    const verseNumber = String(item.verseNumber || item.sourceContext?.verseNumber || "");
    const chapter = String(item.chapter || item.sourceContext?.chapter || focus.chapter || "");
    const bookSlug = scopeBookSlug(item.book || item.sourceContext?.book || focus.bookSlug);
    return verseNumber === focus.verseNumber && chapter === focus.chapter && bookSlug === focus.bookSlug;
  }

  function scopedFlowNodes(focus) {
    const matches = [];
    for (const chain of asArray(studyData.semanticFlowChains)) {
      for (const node of asArray(chain.nodes)) {
        if (!itemMatchesVerseFocus(node, focus)) continue;
        matches.push({ ...node, chainTitle: chain.chainTitle || "Semantic flow chain" });
      }
    }
    return matches;
  }

  function scopedBucketCard(container, title, items, previewFn, emptyText) {
    if (items.length === 0) {
      container.appendChild(createCard(title, emptyText, "0 items"));
      return;
    }

    const preview = items.slice(0, 4).map(previewFn).join("\n");
    const hidden = items.length > 4 ? `\n${items.length - 4} more hidden by preview limit.` : "";
    container.appendChild(createCard(title, `${preview}${hidden}`, `${items.length} item(s)`));
  }

  function renderVerseScopeFocus(term) {
    const section = document.getElementById("verseScopeFocusSection");
    const container = document.getElementById("verseScopeFocusCards");
    const count = document.getElementById("verseScopeFocusCount");
    if (!section || !container || !count) return;

    const focus = parseVerseScopeFocus(term);
    clearElement(container);

    if (!focus) {
      section.hidden = true;
      count.textContent = "0";
      return;
    }

    section.hidden = false;
    const buckets = {
      domHints: asArray(studyData.domSemanticHints).filter((item) => itemMatchesVerseFocus(item, focus)),
      mentions: asArray(studyData.mentionIndex).filter((item) => itemMatchesVerseFocus(item, focus)),
      semanticEvents: asArray(studyData.semanticEvents).filter((item) => itemMatchesVerseFocus(item, focus)),
      relationships: asArray(studyData.relationshipGraph).filter((item) => itemMatchesVerseFocus(item, focus)),
      sourceDiscovery: asArray(studyData.sourceDiscoveryIndex).filter((item) => itemMatchesVerseFocus(item, focus)),
      referenceGraph: asArray(studyData.referenceGraph).filter((item) => itemMatchesVerseFocus(item, focus)),
      flowNodes: scopedFlowNodes(focus)
    };
    const total = Object.values(buckets).reduce((sum, items) => sum + items.length, 0);
    count.textContent = `${total} scoped`;

    if (total === 0) {
      appendEmpty(container, "No verse scope focus data for current filter.");
      return;
    }

    container.appendChild(createCard(
      `Verse Scope Focus: ${focus.displayLabel}`,
      [
        `Scope: ${focus.scopePath}`,
        `DOM hints: ${buckets.domHints.length}`,
        `Mentions: ${buckets.mentions.length}`,
        `Semantic events: ${buckets.semanticEvents.length}`,
        `Relationship edges: ${buckets.relationships.length}`,
        `Source refs: ${buckets.sourceDiscovery.length}`,
        `Reference edges: ${buckets.referenceGraph.length}`,
        `Flow nodes: ${buckets.flowNodes.length}`
      ].join("\n"),
      "search-scoped source position"
    ));

    scopedBucketCard(container, "DOM Hints", buckets.domHints, (item) =>
      `${item.hintType || "hint"}: ${trimText(item.text || item.normalizedText, 74)} | ${item.scopePath || item.verseRef || "unscoped"}`,
      "No DOM hints tied to this verse scope."
    );
    scopedBucketCard(container, "Mentions", buckets.mentions, (item) =>
      `${item.mentionText || item.linkedEntity || "mention"} | ${item.mentionType || "mention"}${item.linkedEntity ? ` | linked: ${item.linkedEntity}` : ""}`,
      "No mentions tied to this verse scope."
    );
    scopedBucketCard(container, "Semantic Events", buckets.semanticEvents, (item) => {
      const target = item.target || item.recipient || item.concerning || "";
      return `${item.actor || item.narrator || "Unknown"} -> ${item.action || item.eventType || "event"}${target ? ` -> ${target}` : ""} | ${item.scopePath || "unscoped"}`;
    }, "No semantic events tied to this verse scope.");
    scopedBucketCard(container, "Relationship Graph", buckets.relationships, (item) =>
      `${item.fromEntity || "Unknown"} -> ${item.toEntity || "Unknown"} | ${item.relationshipType || "relationship"} | ${item.scopePath || "unscoped"}`,
      "No relationship edges tied to this verse scope."
    );
    scopedBucketCard(container, "Source Discovery", buckets.sourceDiscovery, (item) =>
      `${item.refType || "ref"}: ${trimText(item.linkText || item.href, 78)} | ${item.scopePath || item.verseRef || "unscoped"}`,
      "No discovered refs tied to this verse scope."
    );
    scopedBucketCard(container, "Reference Graph", buckets.referenceGraph, (item) =>
      `${referenceRelationshipLabel(item.relationshipType)}: ${trimText(item.toText || item.toHref, 78)} | ${item.fromScopePath || "unscoped"}`,
      "No reference edges tied to this verse scope."
    );
    scopedBucketCard(container, "Flow Chain Nodes", buckets.flowNodes, (item) =>
      `${item.chainTitle}: ${item.actor || "Unknown"} -> ${item.action || item.eventType || "event"}${item.target ? ` -> ${item.target}` : ""} | ${item.scopePath || "unscoped"}`,
      "No flow chain nodes tied to this verse scope."
    );
  }
  function normalizedEntityName(value) {
    return normalizeText(value || "").toLowerCase();
  }

  function entityNameCandidates(item = {}) {
    return Array.from(new Set([
      item.canonicalName,
      item.displayName,
      item.entityName,
      item.name,
      item.linkedEntity,
      item.mentionText,
      ...asArray(item.aliases),
      ...asArray(item.surfaceForms)
    ].map(normalizedEntityName).filter(Boolean)));
  }

  function entityQueryFromSearch(term) {
    const normalized = normalizedEntityName(term);
    if (!normalized || !/[a-z]/i.test(normalized)) return "";
    if (/\b\d+:\d+\b|\bverse[.\s:_-]*\d+\b|\bscripture\.nt\./i.test(normalized)) return "";
    if (["the", "and", "of", "a", "an"].includes(normalized)) return "";
    return normalized;
  }

  function entityQueryMatchesName(query, name) {
    if (!query || !name) return false;
    return name === query || name.includes(query) || (query.includes(name) && name.length >= 4);
  }

  function bestEntityFocusMatch(term) {
    const query = entityQueryFromSearch(term);
    if (!query) return null;

    const candidates = [];
    for (const entity of asArray(studyData.entityRegistry)) {
      const names = entityNameCandidates(entity);
      if (!names.some((name) => entityQueryMatchesName(query, name))) continue;
      const exact = names.includes(query);
      candidates.push({ source: "registry", item: entity, names, score: exact ? 100 : 80 });
    }
    for (const identity of asArray(studyData.canonicalIdentities)) {
      const names = entityNameCandidates(identity);
      if (!names.some((name) => entityQueryMatchesName(query, name))) continue;
      const exact = names.includes(query);
      candidates.push({ source: "canonical", item: identity, names, score: exact ? 95 : 75 });
    }

    if (candidates.length === 0) return null;
    candidates.sort((left, right) => right.score - left.score || left.names[0].localeCompare(right.names[0]));
    const best = candidates[0];
    const displayName = best.item.displayName || best.item.canonicalName || best.item.linkedEntity || best.item.mentionText || term;
    const allNames = new Set(best.names);
    for (const candidate of candidates) {
      if (candidate.score < 70) continue;
      for (const name of candidate.names) allNames.add(name);
    }

    return {
      query,
      displayName,
      canonicalName: best.item.canonicalName || displayName,
      names: Array.from(allNames),
      registry: asArray(studyData.entityRegistry).find((entity) => entityNameCandidates(entity).some((name) => allNames.has(name))) || null,
      canonical: asArray(studyData.canonicalIdentities).find((identity) => entityNameCandidates(identity).some((name) => allNames.has(name))) || null
    };
  }

  function textContainsEntityName(text, focus) {
    const normalized = normalizedEntityName(text);
    if (!normalized || !focus) return false;
    return focus.names.some((name) => normalized === name || normalized.includes(name));
  }

  function itemNamesMatchEntity(values, focus) {
    return asArray(values).some((value) => textContainsEntityName(value, focus));
  }

  function eventMatchesEntityFocus(item = {}, focus) {
    return itemNamesMatchEntity([
      item.actor,
      item.target,
      item.recipient,
      item.concerning,
      item.narrator,
      item.quotedSpeaker,
      ...asArray(item.participants),
      ...asArray(item.authorityChain)
    ], focus);
  }

  function relationshipMatchesEntityFocus(item = {}, focus) {
    return itemNamesMatchEntity([item.fromEntity, item.toEntity, item.target], focus);
  }

  function mentionMatchesEntityFocus(item = {}, focus) {
    return itemNamesMatchEntity([item.linkedEntity, item.mentionText, item.roleHint], focus);
  }

  function flowNodeMatchesEntityFocus(node = {}, focus) {
    return itemNamesMatchEntity([
      node.actor,
      node.target,
      node.recipient,
      node.concerning,
      ...asArray(node.participants),
      ...asArray(node.authorityChain)
    ], focus);
  }

  function scopeBaseForEntityFocus(scopePath) {
    const value = normalizeText(scopePath || "").toLowerCase();
    const verse = value.match(/^(scripture\.nt\.[^.]+\.\d+)\.verse\.(\d+)/i);
    if (verse) return `${verse[1]}.verse.${verse[2]}`;
    const note = value.match(/^(scripture\.nt\.[^.]+\.\d+)\.note\.(\d+)/i);
    if (note) return `${note[1]}.verse.${note[2]}`;
    return value;
  }

  function addScopeCandidate(scopes, item = {}) {
    for (const scopePath of [item.scopePath, item.fromScopePath, item.sourceContext?.scopePath]) {
      const normalized = scopeBaseForEntityFocus(scopePath);
      if (normalized) scopes.add(normalized);
    }
  }

  function itemMatchesEntityScopeSet(item = {}, scopeSet) {
    if (!scopeSet || scopeSet.size === 0) return false;
    return [item.scopePath, item.fromScopePath, item.sourceContext?.scopePath]
      .map(scopeBaseForEntityFocus)
      .some((scopePath) => scopePath && scopeSet.has(scopePath));
  }

  function readableScopeFromBase(scopePath) {
    return referenceScopeLabel({ fromScopePath: scopePath });
  }

  function collectEntityScopeFocus(term) {
    const focus = bestEntityFocusMatch(term);
    if (!focus) return null;

    const semanticEvents = asArray(studyData.semanticEvents).filter((item) => eventMatchesEntityFocus(item, focus));
    const relationships = asArray(studyData.relationshipGraph).filter((item) => relationshipMatchesEntityFocus(item, focus));
    const directMentions = asArray(studyData.mentionIndex).filter((item) => mentionMatchesEntityFocus(item, focus));
    const flowNodes = [];

    for (const chain of asArray(studyData.semanticFlowChains)) {
      for (const node of asArray(chain.nodes)) {
        if (!flowNodeMatchesEntityFocus(node, focus)) continue;
        flowNodes.push({ ...node, chainTitle: chain.chainTitle || "Semantic flow chain" });
      }
    }

    const scopeSet = new Set();
    [focus.registry, focus.canonical, ...semanticEvents, ...relationships, ...directMentions, ...flowNodes]
      .filter(Boolean)
      .forEach((item) => addScopeCandidate(scopeSet, item));

    const scopedMentions = asArray(studyData.mentionIndex).filter((item) =>
      mentionMatchesEntityFocus(item, focus) || itemMatchesEntityScopeSet(item, scopeSet)
    );
    const sourceDiscovery = asArray(studyData.sourceDiscoveryIndex).filter((item) => itemMatchesEntityScopeSet(item, scopeSet));
    const referenceGraph = asArray(studyData.referenceGraph).filter((item) => itemMatchesEntityScopeSet(item, scopeSet));

    return {
      ...focus,
      entityClass: classifyEntityDisplay(focus.canonical || focus.registry || {}),
      scopes: Array.from(scopeSet).filter(Boolean).sort((a, b) => a.localeCompare(b, undefined, { numeric: true })),
      semanticEvents,
      relationships,
      mentions: scopedMentions,
      sourceDiscovery,
      referenceGraph,
      flowNodes
    };
  }


  function renderEntityScopeFocus(term) {
    const section = document.getElementById("entityScopeFocusSection");
    const container = document.getElementById("entityScopeFocusCards");
    const count = document.getElementById("entityScopeFocusCount");
    if (!section || !container || !count) return;

    const focus = collectEntityScopeFocus(term);
    clearElement(container);

    if (!focus) {
      section.hidden = true;
      count.textContent = "0";
      return;
    }

    section.hidden = false;
    const total = focus.scopes.length + focus.semanticEvents.length + focus.relationships.length +
      focus.mentions.length + focus.sourceDiscovery.length + focus.referenceGraph.length + focus.flowNodes.length;
    count.textContent = `${total} focused`;

    if (total === 0 && !focus.registry && !focus.canonical) {
      appendEmpty(container, "No entity scope focus data for current filter.");
      return;
    }

    const aliases = [
      ...asArray(focus.registry?.aliases),
      ...asArray(focus.canonical?.aliases),
      ...asArray(focus.canonical?.surfaceForms)
    ].filter(Boolean);
    container.appendChild(createCard(
      `Entity Scope Focus: ${focus.displayName}`,
      [
        `Canonical: ${focus.canonical?.canonicalName || focus.registry?.canonicalName || focus.canonicalName || focus.displayName}`,
        focus.entityClass ? `Class: ${entityClassLabel(focus.entityClass)}` : "Class: Unclassified",
        focus.registry?.entityType || focus.canonical?.entityType ? `Type: ${focus.registry?.entityType || focus.canonical?.entityType}` : "",
        focus.canonical?.identityScope ? `Identity scope: ${focus.canonical.identityScope}` : "",
        aliases.length ? `Aliases/surfaces: ${aliases.slice(0, 8).join(", ")}` : "Aliases/surfaces: none stored"
      ].filter(Boolean).join("\n"),
      "entity identity / scope focus"
    ));

    scopedBucketCard(container, "Scope / Verse Presence", focus.scopes, (scopePath) => {
      const mentionCount = focus.mentions.filter((item) => scopeBaseForEntityFocus(item.scopePath) === scopePath).length;
      return `${readableScopeFromBase(scopePath)} | ${scopePath} | mentions: ${mentionCount}`;
    }, "No scoped verse presence detected.");
    scopedBucketCard(container, "Semantic Events", focus.semanticEvents, (item) => {
      const target = item.target || item.recipient || item.concerning || "";
      return `${item.actor || item.narrator || "Unknown"} -> ${item.action || item.eventType || "event"}${target ? ` -> ${target}` : ""} | ${item.scopePath || "unscoped"}`;
    }, "No semantic events found for this entity.");
    scopedBucketCard(container, "Relationship Graph", focus.relationships, (item) =>
      `${item.fromEntity || "Unknown"} -> ${item.toEntity || "Unknown"} | ${item.relationshipType || "relationship"} | ${item.scopePath || "unscoped"}`,
      "No relationship edges found for this entity."
    );
    scopedBucketCard(container, "Mentions", focus.mentions, (item) =>
      `${item.mentionText || item.linkedEntity || "mention"} | ${item.mentionType || "mention"}${item.linkedEntity ? ` | linked: ${item.linkedEntity}` : ""} | ${item.scopePath || "unscoped"}`,
      "No mention entries found for this entity."
    );
    scopedBucketCard(container, "References", [...focus.sourceDiscovery, ...focus.referenceGraph], (item) => {
      if (item.relationshipType) return `${referenceRelationshipLabel(item.relationshipType)}: ${trimText(item.toText || item.toHref, 76)} | ${item.fromScopePath || "unscoped"}`;
      return `${item.refType || "ref"}: ${trimText(item.linkText || item.href, 76)} | ${item.scopePath || "unscoped"}`;
    }, "No scoped references found for this entity.");
    scopedBucketCard(container, "Flow Chains", focus.flowNodes, (item) =>
      `${item.chainTitle}: ${item.actor || "Unknown"} -> ${item.action || item.eventType || "event"}${item.target ? ` -> ${item.target}` : ""} | ${item.scopePath || "unscoped"}`,
      "No flow-chain nodes found for this entity."
    );
  }
  function sourceDiscoverySearchText(item) {
    return [
      item.refType,
      item.linkText,
      item.href,
      item.sourceElement,
      item.verseRef,
      item.scopePath,
      item.confidence
    ].join(" ");
  }

  function sourceDiscoveryTypeCounts(items) {
    const counts = new Map();
    for (const item of items) {
      const key = item.refType || "external_link";
      counts.set(key, (counts.get(key) || 0) + 1);
    }
    return Array.from(counts.entries())
      .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));
  }

  function renderSourceDiscovery(term) {
    const container = document.getElementById("sourceDiscoveryCards");
    const count = document.getElementById("sourceDiscoveryCount");
    const refs = asArray(studyData.sourceDiscoveryIndex);
    const filtered = refs.filter((item) => matchesSearchQuery(sourceDiscoverySearchText(item), term));
    const scopedCount = refs.filter((item) => item.scopePath).length;
    const typeCounts = sourceDiscoveryTypeCounts(refs);

    clearElement(container);
    count.textContent = `${filtered.length} refs`;

    if (refs.length === 0) {
      appendEmpty(container, "No current-page source references discovered.");
      return;
    }

    if (filtered.length === 0) {
      appendEmpty(container, "No source discovery refs match.");
      return;
    }

    container.appendChild(createCard(
      "Source Discovery",
      [
        `Total discovered refs: ${refs.length}`,
        `Scoped refs: ${scopedCount}`,
        `Adapter: ${studyData.activeAdapter?.adapterName || "unknown"}`,
        typeCounts.map(([type, value]) => `${type}: ${value}`).join("\n")
      ].filter(Boolean).join("\n"),
      "current-page only"
    ));

    filtered.slice(0, DISPLAY_LIMIT).forEach((item) => {
      container.appendChild(createCard(
        item.linkText || item.href || "Source ref",
        [
          `Type: ${item.refType || "external_link"}`,
          item.scopePath ? `Scope: ${item.scopePath}` : "Scope: unscoped",
          item.verseRef ? `Verse: ${item.verseRef}` : "",
          `Href: ${trimText(item.href || "", 120)}`,
          item.sourceElement ? `Element: ${item.sourceElement}` : ""
        ].filter(Boolean).join("\n"),
        displayConfidence(item.confidence || "possible")
      ));
    });
  }

  function capitalizeWord(value) {
    const text = normalizeText(value || "");
    if (!text) return "";
    return `${text.charAt(0).toUpperCase()}${text.slice(1).toLowerCase()}`;
  }

  function referenceScopeLabel(item = {}) {
    const scopePath = item.fromScopePath || "";
    const scriptureMatch = scopePath.match(/^scripture\.nt\.([^.]+)\.(\d+)\.(?:verse|note)\.(\d+)/i);
    if (scriptureMatch) {
      return `${capitalizeWord(scriptureMatch[1])} ${scriptureMatch[2]}:${scriptureMatch[3]}`;
    }

    const chapterMatch = scopePath.match(/^scripture\.nt\.([^.]+)\.(\d+)\.chapter/i);
    if (chapterMatch) {
      return `${capitalizeWord(chapterMatch[1])} ${chapterMatch[2]} chapter navigation`;
    }

    const genericMatch = scopePath.match(/^generic\.page\.section\.(\d+)\.paragraph\.(\d+)/i);
    if (genericMatch) return `Section ${genericMatch[1]}, paragraph ${genericMatch[2]}`;

    return scopePath || trimText(item.fromText || "Current page", 70);
  }

  function referenceRelationshipLabel(type) {
    const labels = new Map([
      ["has_study_note", "study note"],
      ["has_cross_reference", "cross reference"],
      ["has_media_reference", "media reference"],
      ["has_chapter_navigation", "chapter navigation"],
      ["has_table_of_contents_link", "table of contents"],
      ["has_source_collection_link", "source collection"],
      ["has_external_reference", "external reference"]
    ]);

    return labels.get(type || "") || type || "reference";
  }

  function referenceGraphSearchText(item) {
    const scopeLabel = referenceScopeLabel(item);
    return [
      item.relationshipType,
      item.refType,
      item.fromScopePath,
      scopeLabel,
      item.fromText,
      item.toText,
      item.toHref,
      item.confidence
    ].join(" ");
  }

  function referenceGraphTypeCounts(items) {
    const counts = new Map();
    for (const item of items) {
      const key = item.relationshipType || "has_external_reference";
      counts.set(key, (counts.get(key) || 0) + 1);
    }
    return Array.from(counts.entries())
      .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));
  }

  function groupReferenceGraphByScope(items) {
    const groups = new Map();
    for (const item of items) {
      const key = referenceScopeLabel(item);
      if (!groups.has(key)) groups.set(key, []);
      groups.get(key).push(item);
    }

    return Array.from(groups.entries())
      .map(([scopeLabel, edges]) => ({ scopeLabel, edges }))
      .sort((a, b) => a.scopeLabel.localeCompare(b.scopeLabel, undefined, { numeric: true }));
  }

  function referenceEdgePreview(item) {
    const target = trimText(item.toText || item.toHref || "reference", 72);
    return [
      `${referenceRelationshipLabel(item.relationshipType)}: ${target}`,
      `fromScopePath: ${item.fromScopePath || "unscoped"}`,
      `relationshipType: ${item.relationshipType || "has_external_reference"}`,
      `confidence: ${displayConfidence(item.confidence || "possible")}`
    ].join("\n");
  }

  function renderReferenceGraph(term) {
    const container = document.getElementById("referenceGraphCards");
    const count = document.getElementById("referenceGraphCount");
    const edges = asArray(studyData.referenceGraph);
    const filtered = edges.filter((item) => matchesSearchQuery(referenceGraphSearchText(item), term));
    const relationshipCounts = referenceGraphTypeCounts(edges);
    const grouped = groupReferenceGraphByScope(filtered);

    clearElement(container);
    count.textContent = `${filtered.length} edges`;

    if (edges.length === 0) {
      appendEmpty(container, "No reference graph edges detected.");
      return;
    }

    if (filtered.length === 0) {
      appendEmpty(container, "No reference graph edges match.");
      return;
    }

    container.appendChild(createCard(
      "Counts by Relationship Type",
      [
        `Total reference edges: ${edges.length}`,
        relationshipCounts.map(([type, value]) => `${type}: ${value}`).join("\n")
      ].filter(Boolean).join("\n"),
      "derived from current-page source discovery"
    ));

    grouped.slice(0, DISPLAY_LIMIT).forEach((group) => {
      const preview = group.edges.slice(0, 4)
        .map(referenceEdgePreview)
        .join("\n\n");
      const hidden = group.edges.length > 4
        ? `\n\n${group.edges.length - 4} more edge(s) hidden in this scope.`
        : "";

      container.appendChild(createCard(
        group.scopeLabel,
        `${preview}${hidden}`,
        `${group.edges.length} edge(s)`
      ));
    });

    if (grouped.length > DISPLAY_LIMIT) {
      appendEmpty(container, `${grouped.length - DISPLAY_LIMIT} more scope group(s) hidden by preview limit.`);
    }
  }
  function renderDomSemanticHints(term) {
    const container = document.getElementById("domSemanticHintCards");
    const count = document.getElementById("domSemanticHintCount");
    const hints = asArray(studyData.domSemanticHints);
    const filtered = hints.filter((item) => matchesSearchQuery(domSemanticHintSearchText(item), term));

    clearElement(container);
    count.textContent = `${filtered.length} total`;

    if (filtered.length === 0) {
      appendEmpty(container, hints.length === 0 ? "No DOM semantic hints detected." : "No DOM semantic hints match.");
      return;
    }

    container.appendChild(createCard(
      "Hint Types",
      domHintSummary(filtered),
      "optional source DOM enrichment"
    ));

    const preview = filtered.slice(0, 5).map((item) => {
      const ref = item.verseRef || item.verseNumber || "no verse ref";
      return `${item.hintType || "hint"}: ${trimText(item.text, 70)} / ${ref} / ${item.source || "dom"} / ${item.confidence || "source-markup"}${item.originalText ? ` / original: ${item.originalText}` : ""}${item.entityClass ? ` / Class ${item.entityClass}` : ""}`;
    }).join("\n");
    container.appendChild(createCard(
      "DOM Hint Preview",
      preview,
      `${Math.max(filtered.length - 5, 0)} more hidden by preview limit`
    ));
  }
  function mentionSummary(items, keyName) {
    const counts = new Map();
    for (const item of items) {
      const key = item[keyName] || "unclassified";
      counts.set(key, (counts.get(key) || 0) + 1);
    }
    return Array.from(counts.entries())
      .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
      .map(([key, value]) => `${key}: ${value}`)
      .join("\n");
  }

  function mentionClassSummary(items) {
    const counts = new Map();
    for (const item of items) {
      const key = item.entityClass ? entityClassLabel(item.entityClass) : "Unclassified";
      counts.set(key, (counts.get(key) || 0) + 1);
    }
    return Array.from(counts.entries())
      .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
      .map(([key, value]) => `${key}: ${value}`)
      .join("\n");
  }

  function renderMentionIndex(term) {
    const container = document.getElementById("mentionIndexCards");
    const count = document.getElementById("mentionIndexCount");
    const mentions = asArray(studyData.mentionIndex);
    const filtered = mentions.filter((item) => matchesSearchQuery(mentionSearchText(item), term));

    clearElement(container);
    count.textContent = `${filtered.length} total`;

    if (filtered.length === 0) {
      appendEmpty(container, "No mention index items match.");
      return;
    }

    container.appendChild(createCard(
      "Mention Types",
      mentionSummary(filtered, "mentionType"),
      "mentions are separate from canonical entities"
    ));
    container.appendChild(createCard(
      "Entity Classes",
      mentionClassSummary(filtered),
      "display classification only"
    ));

    const preview = filtered.slice(0, 5).map((item) => {
      const classLabel = item.entityClass ? entityClassLabel(item.entityClass) : "Unclassified";
      return `${item.mentionText} | ${item.mentionType} | ${classLabel}${item.linkedEntity ? ` | linked: ${item.linkedEntity}` : ""}${item.roleHint ? ` | ${item.roleHint}` : ""}`;
    }).join("\n");
    container.appendChild(createCard("Mention Preview", preview, `${Math.max(filtered.length - 5, 0)} more hidden by preview limit`));
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
    return `${label}: ${role.actorName} (${displayConfidence(role.confidence || "probable")})`;
  }

  function formatRoleList(label, roles) {
    const values = asArray(roles)
      .filter((role) => roleName(role))
      .slice(0, 3)
      .map((role) => `${role.actorName} (${displayConfidence(role.confidence || "probable")})`);

    return values.length ? `${label}: ${values.join(", ")}` : "";
  }

  function formatPrincipleFocus(principleFocus) {
    if (!principleFocus?.principleText) return "";
    return `Principle: ${trimText(principleFocus.principleText, 90)} (${displayConfidence(principleFocus.confidence || "probable")})`;
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
      `${item.witness || "Unknown"} (${displayConfidence(item.confidence || "possible")})`
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
        `${scene.sceneType || "scene"} | ${displayConfidence(scene.confidence || "possible")}`
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
      `${item.interactionType || "interaction"} | ${displayConfidence(item.confidence || "probable")}`
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

  function renderSemanticFlowChains(term) {
    const container = document.getElementById("semanticFlowChainCards");
    const count = document.getElementById("semanticFlowChainCount");
    const filtered = filteredSemanticFlowChains(term);

    renderLimited(container, filtered, count, (chain) => {
      const nodePreview = asArray(chain.nodes)
        .slice(0, 5)
        .map((node) => `${node.actor || "Unknown"} -> ${node.action || node.eventType || "event"}${node.target ? ` -> ${node.target}` : ""}`)
        .join("\n");
      const hidden = asArray(chain.nodes).length > 5
        ? `\n${asArray(chain.nodes).length - 5} more node(s) hidden.`
        : "";
      const authority = asArray(chain.authorityChain).length
        ? `Authority: ${asArray(chain.authorityChain).join(" -> ")}`
        : "";
      const body = [
        trimText(chain.summary, 170),
        authority,
        nodePreview ? `Nodes:\n${nodePreview}${hidden}` : ""
      ].filter(Boolean).join("\n");
      const meta = [chain.chainType, displayConfidence(chain.confidence)]
        .filter(Boolean)
        .join(" | ");

      return createCard(chain.chainTitle || "Semantic flow chain", body, meta);
    }, "No semantic flow chains match.", "semantic flow chain");
  }
  function renderSemanticEvents(term) {
    const container = document.getElementById("semanticEventCards");
    const count = document.getElementById("semanticEventCount");
    const filtered = filteredSemanticEvents(term);

    renderLimited(container, filtered, count, (item) => {
      const target = item.target || item.recipient || item.concerning || "";
      const arrow = target ? ` -> ${target}` : "";
      const title = `${item.actor || item.narrator || "Unknown"} -> ${item.action || "acts"}${arrow}`;
      const anchor = item.anchorText || item.sourceSnippet || "";
      const body = [
        trimText(item.normalizedMeaning || item.sourceSnippet, 130),
        anchor ? `Source phrase: ${trimText(anchor, 90)}${item.verseNumber ? ` (v${item.verseNumber})` : ""}` : "",
        item.narratorRole ? `Narrator: ${item.narratorRole}` : "",
        item.relationshipType ? `Relationship: ${item.relationshipType}` : "",
        item.sourceSnippet && item.sourceSnippet !== anchor ? `Snippet: ${trimText(item.sourceSnippet, 120)}` : ""
      ].filter(Boolean).join("\n");
      const meta = [item.eventType, item.semanticCategory, displayConfidence(item.confidence)]
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
      displayConfidence(item.confidence || "prophecy-fulfillment"),
      `${trimText(item.prophecyText, 110)} -> ${trimText(item.fulfillmentText, 110)}`,
      item.linkType || "prophecy-fulfillment"
    ), "No prophecy / fulfillment links match.");
  }

  function renderStudy() {
    try {
      const term = normalizeText(document.getElementById("searchInput").value)
        .toLowerCase();

      renderDiagnostics();
      renderFocusedGraph(term);
      renderCurrentPage(term);
      renderSourceContext(term);
      renderSourceAdapter(term);
      renderScopeIntegrity(term);
      renderVerseScopeFocus(term);
      renderEntityScopeFocus(term);
      renderSourceDiscovery(term);
      renderReferenceGraph(term);
      renderDomSemanticHints(term);
      renderEntityRoles(term);
      renderEntityRegistry(term);
      renderRelationshipGraph(term);
      renderCanonicalIdentities(term);
      renderMentionIndex(term);
      renderActors(term);
      renderScenes(term);
      renderSemanticEvents(term);
      renderSemanticFlowChains(term);
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
      semanticFlowChains: countItems(studyData.semanticFlowChains),
      entityRegistry: countItems(studyData.entityRegistry),
      relationshipGraph: countItems(studyData.relationshipGraph),
      canonicalIdentities: countItems(studyData.canonicalIdentities),
      mentions: countItems(studyData.mentionIndex),
      domHints: countItems(studyData.domSemanticHints),
      sourceDiscovery: countItems(studyData.sourceDiscoveryIndex),
      referenceGraph: countItems(studyData.referenceGraph),
      activeAdapter: studyData.activeAdapter?.adapterName || "",
      scopedItems: studyData.scopeIntegrity?.scopedItemsCount || 0,
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
    const semanticFlowChainCount = countItems(studyData.semanticFlowChains);
    const entityRegistryCount = countItems(studyData.entityRegistry);
    const relationshipGraphCount = countItems(studyData.relationshipGraph);
    const canonicalIdentityCount = countItems(studyData.canonicalIdentities);
    const entityClassCount = classifiedEntityCount();
    const mentionCount = countItems(studyData.mentionIndex);
    const domHintCount = countItems(studyData.domSemanticHints);
    const sourceDiscoveryCount = countItems(studyData.sourceDiscoveryIndex);
    const referenceGraphCount = countItems(studyData.referenceGraph);
    const activeAdapterName = studyData.activeAdapter?.adapterName || "None";
    const principleCount = countItems(studyData.principleItems);
    const prophecyLinkCount = countItems(studyData.prophecyLinks);
    const totalRenderable = captureCount + timelineCount + eventCount +
      orderedCount + actorCount + interactionCount + sceneCount + semanticEventCount + semanticFlowChainCount + entityRegistryCount + relationshipGraphCount + canonicalIdentityCount + mentionCount + domHintCount +
      principleCount + prophecyLinkCount + referenceGraphCount;
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
    document.getElementById("diagnosticSemanticFlowChains").textContent = semanticFlowChainCount;
    document.getElementById("diagnosticEntityRegistry").textContent = entityRegistryCount;
    document.getElementById("diagnosticRelationshipGraph").textContent = relationshipGraphCount;
    document.getElementById("diagnosticCanonicalIdentities").textContent = canonicalIdentityCount;
    document.getElementById("diagnosticEntityClasses").textContent = entityClassCount;
    document.getElementById("diagnosticMentions").textContent = mentionCount;
    document.getElementById("diagnosticDomHints").textContent = domHintCount;
    document.getElementById("diagnosticSourceDiscovery").textContent = sourceDiscoveryCount;
    document.getElementById("diagnosticReferenceGraph").textContent = referenceGraphCount;
    document.getElementById("diagnosticAdapter").textContent = activeAdapterName;
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
  // source-grounded confidence. Source Metadata should preserve author/speaker
  // metadata separately from narrator/entity roles. Source Metadata should become a parallel
  // context layer for book/source title, author, speaker, compiler,
  // translator/version, organization/source collection, date/year, source type,
  // referenced scripture links, and context notes; it should not pollute
  // Detected Actors unless the person/entity acts inside the captured text.
  // Entity Registry is now a compact derived graph-node preview. Future work
  // can add cross-page identity, aliases, original-language references,
  // tradition-specific interpretations, lineage/family graphs, and visual
  // persona profiles without overcrowding this quick study panel.
  await refreshStudyData();

  document.getElementById("searchInput").addEventListener("input", () => {
    console.log("[FOCUS DEBUG] search input event", {
      value: document.getElementById("searchInput").value
    });
    renderStudy();
  });
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
