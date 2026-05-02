(function () {
  if (window.ICESacredFormatterEngine) return;

  const RULE_FILES = {
    lexicon: "lexicon.json",
    phrases: "phrases.json",
    titles: "DIVINE_TITLES.json",
    rules: "Rules.json"
  };

  const PRONOUNS = [
    "he",
    "him",
    "his",
    "himself",
    "she",
    "her",
    "hers",
    "they",
    "them",
    "their",
    "theirs"
  ];

  const ELEVATABLE_PRONOUNS = new Set(["he", "him", "his"]);
  const DIVINE_PRONOUN_REFERENCES = [
    "HOLY SPIRIT",
    "THE LORD",
    "JESUS",
    "CHRIST",
    "GOD"
  ];
  const DEFAULT_PRONOUN_REFERENCE_WINDOW = 1;

  const STRICT_REFERENCES = new Set([
    "GOD",
    "CHRIST",
    "JESUS CHRIST",
    "HOLY SPIRIT",
    "SPIRIT OF GOD",
    "THE LORD GOD",
    "LORD GOD",
    "LORD JESUS",
    "THE LORD",
    "SON OF GOD",
    "MESSIAH"
  ]);

  const PHASE_1_REFERENCES = [
    "THE LORD GOD",
    "LORD GOD",
    "LORD JESUS",
    "THE LORD"
  ];

  function escapeRegExp(value) {
    return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  }

  function normalizeEntry(term, entry) {
    return {
      term,
      className: entry?.className || "I",
      render: entry?.render || term
    };
  }

  class SacredFormatterEngine {
    constructor(ruleData) {
      this.ruleData = ruleData;
      this.entries = this.buildEntries(ruleData);
      this.entryByTerm = new Map(this.entries.map((entry) => [entry.term, entry]));
      this.pattern = this.buildPattern(this.entries);
    }

    static async create() {
      const ruleData = {};

      await Promise.all(
        Object.entries(RULE_FILES).map(async ([key, fileName]) => {
          const response = await fetch(chrome.runtime.getURL(fileName));
          ruleData[key] = await response.json();
        })
      );

      return new SacredFormatterEngine(ruleData);
    }

    buildEntries(ruleData) {
      const byTerm = new Map();

      for (const [term, entry] of Object.entries(ruleData.phrases || {})) {
        byTerm.set(term.toUpperCase(), normalizeEntry(term.toUpperCase(), entry));
      }

      for (const [term, entry] of Object.entries(ruleData.lexicon || {})) {
        byTerm.set(term.toUpperCase(), normalizeEntry(term.toUpperCase(), entry));
      }

      for (const [term, entry] of Object.entries(ruleData.titles || {})) {
        if (!byTerm.has(term.toUpperCase())) {
          byTerm.set(term.toUpperCase(), normalizeEntry(term.toUpperCase(), entry));
        }

        for (const alias of entry?.aliases || []) {
          const aliasKey = alias.toUpperCase();
          if (!byTerm.has(aliasKey)) {
            byTerm.set(aliasKey, normalizeEntry(aliasKey, ruleData.lexicon?.[term] || {}));
          }
        }
      }

      for (const term of PHASE_1_REFERENCES) {
        if (!byTerm.has(term)) {
          byTerm.set(term, normalizeEntry(term, {
            className: "I",
            render: term === "THE LORD GOD" ? "LORD GOD" : term
          }));
        }
      }

      return Array.from(byTerm.values()).sort((a, b) => b.term.length - a.term.length);
    }

    buildPattern(entries) {
      const terms = entries.map((entry) => escapeRegExp(entry.term));
      const pronouns = PRONOUNS.map(escapeRegExp);
      const allTerms = [...terms, ...pronouns];

      if (allTerms.length === 0) return null;

      return new RegExp(`\\b(${allTerms.join("|")})\\b`, "gi");
    }

    findMatches(text, settings) {
      if (!text || !this.pattern) return [];

      const matches = [];
      const normalizedSettings = {
        strictMode: true,
        highlightPronouns: false,
        pronounReferenceWindow: DEFAULT_PRONOUN_REFERENCE_WINDOW,
        ...settings
      };
      const sentenceContexts = this.buildSentenceContexts(text);
      const pronounReferenceWindow = this.normalizePronounReferenceWindow(
        normalizedSettings.pronounReferenceWindow
      );

      this.pattern.lastIndex = 0;

      let match;
      while ((match = this.pattern.exec(text)) !== null) {
        const raw = match[0];
        const key = raw.toUpperCase();
        const entry = this.entryByTerm.get(key);
        const isPronoun = PRONOUNS.includes(raw.toLowerCase());

        if (isPronoun) {
          const elevated = this.shouldElevatePronoun(
            raw,
            match.index,
            sentenceContexts,
            pronounReferenceWindow
          );

          if (!normalizedSettings.highlightPronouns && !elevated) continue;

          matches.push(this.createMatch(match, raw, entry, true, {
            render: elevated ? raw.toUpperCase() : raw,
            visualHighlight: normalizedSettings.highlightPronouns,
            elevated
          }));
          continue;
        }

        if (normalizedSettings.strictMode && !this.isStrictReference(key)) continue;
        if (!normalizedSettings.strictMode && !this.isLooseReference(raw, key)) continue;

        matches.push(this.createMatch(match, raw, entry, false));
      }

      return matches;
    }

    countDivineReferences(text) {
      return this.findMatches(text, {
        strictMode: false,
        highlightPronouns: false
      }).filter((match) => !match.isPronoun).length;
    }

    createMatch(match, raw, entry, isPronoun, options = {}) {
      return {
        start: match.index,
        end: match.index + raw.length,
        text: raw,
        render: options.render || entry?.render || raw,
        className: entry?.className || (isPronoun ? "III" : "II"),
        isPronoun,
        visualHighlight: options.visualHighlight ?? true,
        elevated: Boolean(options.elevated)
      };
    }

    buildSentenceContexts(text) {
      const sentences = [];
      const pattern = /[^.!?]+[.!?]*|\S+/g;
      let match;

      while ((match = pattern.exec(text)) !== null) {
        const sentenceText = match[0];
        sentences.push({
          start: match.index,
          end: match.index + sentenceText.length,
          hasDivineReference: this.hasDivinePronounReference(sentenceText)
        });
      }

      return sentences;
    }

    hasDivinePronounReference(text) {
      const normalized = text.toUpperCase();
      return DIVINE_PRONOUN_REFERENCES.some((reference) =>
        new RegExp(`\\b${escapeRegExp(reference)}\\b`, "i").test(normalized)
      );
    }

    normalizePronounReferenceWindow(value) {
      const numeric = Number(value);
      if (!Number.isFinite(numeric)) return DEFAULT_PRONOUN_REFERENCE_WINDOW;
      return Math.min(2, Math.max(1, Math.round(numeric)));
    }

    sentenceIndexForPosition(sentenceContexts, position) {
      return sentenceContexts.findIndex((sentence) =>
        position >= sentence.start && position < sentence.end
      );
    }

    shouldElevatePronoun(raw, position, sentenceContexts, referenceWindow) {
      const normalized = raw.toLowerCase();
      if (!ELEVATABLE_PRONOUNS.has(normalized)) return false;
      if (/^[A-Z]/.test(raw)) return true;

      const sentenceIndex = this.sentenceIndexForPosition(sentenceContexts, position);
      if (sentenceIndex < 0) return false;

      for (let offset = 0; offset <= referenceWindow; offset++) {
        const candidate = sentenceContexts[sentenceIndex - offset];
        if (candidate?.hasDivineReference) return true;
      }

      // Future: replace this local heuristic with AI-based pronoun resolution
      // and entity tracking across paragraphs when cross-sentence context is
      // promoted beyond the Phase 3.6 formatter.
      return false;
    }

    isStrictReference(key) {
      return STRICT_REFERENCES.has(key);
    }

    isLooseReference(raw, key) {
      if (key !== "LORD") return true;

      return raw === "Lord" || raw === "LORD";
    }
  }

  window.ICESacredFormatterEngine = SacredFormatterEngine;
})();
