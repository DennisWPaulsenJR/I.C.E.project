(function (globalScope) {
  function formatRoleValue(label, role, formatConfidence) {
    if (!role?.actorName) return "";
    return `${label}: ${role.actorName} (${formatConfidence(role.confidence || "probable")})`;
  }

  function formatRoleList(label, roles, formatConfidence) {
    const values = (Array.isArray(roles) ? roles : [])
      .filter((role) => role?.actorName)
      .slice(0, 3)
      .map((role) => `${role.actorName} (${formatConfidence(role.confidence || "probable")})`);

    return values.length ? `${label}: ${values.join(", ")}` : "";
  }

  globalScope.ICEStudyListItemHelpers = Object.freeze({
    formatRoleValue,
    formatRoleList
  });
})(globalThis);
