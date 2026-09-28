function metricStateCore({ active = true, denominator = 0, numerator = 0, unresolved = 0, unsupported = 0, applicable = true, unavailable = false } = {}) {
  if (!applicable) return "not_applicable";
  if (unavailable) return "unavailable_from_current_scope";
  if (!active) return "inactive";
  if (!denominator) return "active_no_records";
  if (unsupported) return "unsupported";
  if (unresolved && !numerator) return "unresolved";
  return "active_with_records";
}
