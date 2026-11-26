import { useEffect } from "react";
import { SITE } from "../data/site";

// Sets what search engines and social apps (WhatsApp, Facebook...) read about each page:
// the browser-tab title, the description, the "official address" (canonical) and the preview card.
// Every page renders <Seo ... /> once. It draws nothing on screen.
//   title       page name, e.g. "Hotel"        (the site name is added automatically)
//   description one or two sentences (about 150 characters is ideal)
//   path        the page's address, e.g. "/hotel"
//   noindex     true = ask search engines NOT to list this page (login pages, 404)
//   schema      optional "structured data" object so Google can show rich results (hours, address...)

function setTag(selector, create, value) {
  let element = document.head.querySelector(selector);
  if (!element) {
    element = create();
    document.head.appendChild(element);
  }
  element.setAttribute(element.tagName === "LINK" ? "href" : "content", value);
}

const meta = (attribute, name) => () => {
  const element = document.createElement("meta");
  element.setAttribute(attribute, name);
  return element;
};

export default function Seo({ title, description = SITE.description, path = "", image = SITE.shareImage, noindex = false, schema }) {
  const fullTitle = title ? `${title} | ${SITE.name}` : `${SITE.name} | ${SITE.tagline.replaceAll(" · ", ", ")}`;
  const url = `${SITE.url}${path}`;
  const imageUrl = image.startsWith("http") ? image : `${SITE.url}${image}`;

  useEffect(() => {
    document.title = fullTitle;
    setTag('meta[name="description"]', meta("name", "description"), description);
    setTag('meta[property="og:title"]', meta("property", "og:title"), fullTitle);
    setTag('meta[property="og:description"]', meta("property", "og:description"), description);
    setTag('meta[property="og:type"]', meta("property", "og:type"), "website");
    setTag('meta[property="og:url"]', meta("property", "og:url"), url);
    setTag('meta[property="og:image"]', meta("property", "og:image"), imageUrl);
    setTag('meta[property="og:site_name"]', meta("property", "og:site_name"), SITE.name);
    setTag('meta[name="twitter:card"]', meta("name", "twitter:card"), "summary_large_image");
    setTag('link[rel="canonical"]', () => Object.assign(document.createElement("link"), { rel: "canonical" }), url);

    // "robots" meta exists only for pages we do not want listed.
    const robots = document.head.querySelector('meta[name="robots"]');
    if (noindex) setTag('meta[name="robots"]', meta("name", "robots"), "noindex, nofollow");
    else robots?.remove();
  }, [fullTitle, description, url, imageUrl, noindex]);

  // Structured data (JSON-LD): a small block of facts for Google, e.g. "this page is a Restaurant at this address".
  const schemaText = schema ? JSON.stringify({ "@context": "https://schema.org", ...schema }) : "";
  useEffect(() => {
    if (!schemaText) return;
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.dataset.seo = "true";
    script.text = schemaText;
    document.head.appendChild(script);
    return () => script.remove();
  }, [schemaText]);

  return null;
}
