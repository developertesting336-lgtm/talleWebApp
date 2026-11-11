import DOMPurify from "dompurify";

const ALLOWED_TAGS = [
  "p",
  "br",
  "h1",
  "h2",
  "h3",
  "h4",
  "strong",
  "b",
  "em",
  "i",
  "u",
  "s",
  "strike",
  "ul",
  "ol",
  "li",
  "blockquote",
  "code",
  "pre",
  "hr",
  "a",
  "span",
];

const ALLOWED_ATTR = ["href", "target", "rel", "style", "class"];

const SAFE_STYLE_PROPS = new Set(["font-size", "color", "text-align"]);

function filterSafeInlineStyles(styleValue: string): string {
  return styleValue
    .split(";")
    .map((rule) => rule.trim())
    .filter(Boolean)
    .filter((rule) => {
      const colonIdx = rule.indexOf(":");
      if (colonIdx <= 0) return false;
      const prop = rule.slice(0, colonIdx).trim().toLowerCase();
      const val = rule.slice(colonIdx + 1).trim();
      if (!SAFE_STYLE_PROPS.has(prop)) return false;
      // Reject CSS expressions / url() calls inside inline styles.
      return !/url\s*\(|expression\s*\(/i.test(val);
    })
    .join("; ");
}

/**
 * Sanitizes rich-text HTML produced by Tiptap before rendering in the browser.
 * Preserves safe formatting tags and font-size / color / text-align styles.
 */
export function sanitizeBlogHtml(dirtyHtml: string): string {
  if (typeof window === "undefined") return "";

  const clean = DOMPurify.sanitize(dirtyHtml, {
    ALLOWED_TAGS,
    ALLOWED_ATTR,
    ALLOW_DATA_ATTR: false,
  });

  const parser = new DOMParser();
  const doc = parser.parseFromString(clean, "text/html");

  doc.body.querySelectorAll("*").forEach((el) => {
    const rawStyle = el.getAttribute("style");
    if (rawStyle) {
      const safeStyle = filterSafeInlineStyles(rawStyle);
      if (safeStyle) el.setAttribute("style", safeStyle);
      else el.removeAttribute("style");
    }

    if (el.tagName === "A") {
      const href = el.getAttribute("href") ?? "";
      if (!/^(https?:|mailto:|\/)/i.test(href)) {
        el.removeAttribute("href");
      } else {
        el.setAttribute("target", "_blank");
        el.setAttribute("rel", "noopener noreferrer");
      }
    }
  });

  return doc.body.innerHTML;
}

