(function (global) {
  if (global.ICESourceIdentityHelpers) return;

  function text(value) {
    return String(value ?? "").replace(/\s+/g, " ").trim();
  }

  function normalize(record = {}) {
    const book = text(record.sourceCaptureBook || record.book);
    const chapter = text(record.sourceCaptureChapter || record.chapter);
    const title = text(record.sourceTitle || record.title);
    const url = text(record.activeUrl || record.url || record.sourceUrl);
    const adapter = text(record.activeAdapterName || record.adapterName || record.adapter);
    const pageKey = text(record.pageKey || record.canonicalKey).toLowerCase();
    const canonicalReference = text(record.canonicalReference || record.sourceReference).toLowerCase();
    const captureId = text(record.sourceCaptureId || record.captureId).toLowerCase();
    return { url, adapter, book, chapter, title, pageKey, canonicalReference, captureId };
  }

  function identityKey(record = {}) {
    const normalized = normalize(record);
    return [normalized.book, normalized.chapter, normalized.title, normalized.url]
      .map((value) => value.toLowerCase())
      .join("|");
  }

  function compare(left = {}, right = {}) {
    const first = normalize(left);
    const second = normalize(right);
    if (!first.url || !second.url || !first.adapter || !second.adapter || !first.book || !second.book || !first.chapter || !second.chapter) {
      return "insufficient_identity";
    }
    if (first.url.toLowerCase() !== second.url.toLowerCase()
      || first.adapter.toLowerCase() !== second.adapter.toLowerCase()
      || first.book.toLowerCase() !== second.book.toLowerCase()
      || first.chapter.toLowerCase() !== second.chapter.toLowerCase()
      || (first.pageKey && second.pageKey && first.pageKey !== second.pageKey)) {
      return "different_source_page";
    }
    return "same_source_page";
  }

  global.ICESourceIdentityHelpers = Object.freeze({ normalize, identityKey, compare });
})(typeof globalThis !== "undefined" ? globalThis : window);
