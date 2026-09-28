function scopeSnapshotLayerControlViewModelCore(model = {}, layerPreset = "custom", layerPresets = {}) {
  const layerModel = model.layerModel || {};
  const activeLayerIds = Array.isArray(layerModel.activeLayerIds) ? layerModel.activeLayerIds : [];
  const recommendedLayerIds = Array.isArray(layerModel.recommendedLayerIds) ? layerModel.recommendedLayerIds : [];
  const availability = Array.isArray(layerModel.availability) ? layerModel.availability : [];
  const groupedLayers = [];
  const groupedMap = new Map();
  availability.forEach((layer) => {
    const groupName = layer?.group || "Ungrouped";
    if (!groupedMap.has(groupName)) {
      groupedMap.set(groupName, []);
      groupedLayers.push({ groupName, layers: groupedMap.get(groupName) });
    }
    if (!layer) return;
    groupedMap.get(groupName).push({
      id: layer.id,
      label: layer.label,
      available: Boolean(layer.available),
      dependencyUnavailable: Boolean(layer.dependencyUnavailable),
      unresolvedCount: Number(layer.unresolvedCount || 0),
      recommendationReason: layer.recommendationReason || "",
      selected: activeLayerIds.includes(layer.id),
      recommended: recommendedLayerIds.includes(layer.id),
      visible: Boolean(layer.available || layer.dependencyUnavailable)
    });
  });
  return {
    activeCount: activeLayerIds.length,
    recommendedCount: recommendedLayerIds.length,
    availableCount: availability.filter((layer) => layer && layer.available).length,
    presetItems: Object.entries(layerPresets || {}).flatMap(([presetId, preset]) => {
      if (presetId === "custom" && layerPreset !== "custom") return [];
      return [{
        presetId,
        label: preset?.label || presetId,
        pressed: layerPreset === presetId
      }];
    }),
    groupedLayers,
    noteText: `Range relevance: ${recommendedLayerIds.join(", ") || "none"}. Preset: ${layerPresets?.[layerPreset]?.label || "Custom"}. Hidden by layers: ${model.hiddenLayerNodes || 0}.`
  };
}
