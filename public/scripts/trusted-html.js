// Alan UI - trusted-html.js
// Utilities for safely inserting *trusted* (app-controlled) HTML.
// Use this ONLY for strings that come from our own translations/templates,
// never user-provided input.

/**
 * Minimal HTML sanitizer for app-controlled strings.
 * - Removes <script> blocks
 * - Removes inline event handlers (onload, onclick, etc.)
 *
 * NOTE: This is not a full sanitizer like DOMPurify. It's a small defense-in-depth
 * layer to reduce blast radius if a translation string is accidentally edited.
 *
 * @param {string} html
 */
export function sanitizeTrustedHtml(html) {
  const raw = String(html ?? '');

  // Remove script tags and content.
  const withoutScripts = raw.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');

  // Remove inline event handler attributes (e.g., onclick="...").
  // Keep it simple and conservative.
  const withoutEvents = withoutScripts
    .replace(/\son\w+\s*=\s*"[^"]*"/gi, '')
    .replace(/\son\w+\s*=\s*'[^']*'/gi, '')
    .replace(/\son\w+\s*=\s*[^\s>]+/gi, '');

  // Strip javascript: URLs.
  const withoutJsUrls = withoutEvents
    .replace(/\shref\s*=\s*"\s*javascript:[^"]*"/gi, '')
    .replace(/\shref\s*=\s*'\s*javascript:[^']*'/gi, '')
    .replace(/\ssrc\s*=\s*"\s*javascript:[^"]*"/gi, '')
    .replace(/\ssrc\s*=\s*'\s*javascript:[^']*'/gi, '');

  // Ensure links opened in a new tab are protected against reverse tabnabbing.
  // (Add rel if target=_blank exists and rel is missing.)
  const withNoopener = withoutJsUrls.replace(
    /<a\b([^>]*?)\s+target\s*=\s*(['"])_blank\2([^>]*?)>/gi,
    (match, before, q, after) => {
      const attrs = `${before} target=${q}_blank${q}${after}`;
      if (/\srel\s*=\s*(['"]).*?\1/i.test(attrs)) return match;
      return `<a${before} target=${q}_blank${q}${after} rel=${q}noopener noreferrer${q}>`;
    }
  );

  return withNoopener;
}

/**
 * Sets element.innerHTML after applying sanitizeTrustedHtml.
 * @param {HTMLElement|null} el
 * @param {string} html
 */
export function setTrustedHtml(el, html) {
  if (!el) return;
  el.innerHTML = sanitizeTrustedHtml(html);
}
