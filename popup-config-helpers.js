function popupOptionById(options, id) { return (Array.isArray(options) ? options : []).find(option => option && option.id === id); }
function popupHighlighterModeFromSettings(settings = {}) {
  if (!settings.enabled) return "off";
  if (settings.strictMode && settings.highlightPronouns) return "strict_pronouns";
  if (settings.strictMode) return "strict";
  if (settings.highlightPronouns) return "flexible_pronouns";
  return "flexible";
}
