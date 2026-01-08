import { useEffect } from "react";
import { SITE_URL, OG_IMAGE } from "../../content/siteConfig";

function upsertMeta(attr, key, value) {
  if (!value) return;
  const selector = `meta[${attr}="${key}"]`;
  let el = document.head.querySelector(selector);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", value);
}

function upsertLink(rel, href) {
  if (!href) return;
  let el = document.head.querySelector(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

export default function useSEO({
  title,
  description,
  path = "/",
  image = OG_IMAGE,
}) {
  useEffect(() => {
    const url = `${SITE_URL}${path}`;

    // Title
    if (title) document.title = title;

    // Basic
    upsertMeta("name", "description", description);
    upsertMeta("name", "robots", "index,follow");

    // Canonical
    upsertLink("canonical", url);

    // Open Graph
    upsertMeta("property", "og:type", "website");
    upsertMeta("property", "og:title", title);
    upsertMeta("property", "og:description", description);
    upsertMeta("property", "og:url", url);
    upsertMeta("property", "og:image", image);

    // Twitter
    upsertMeta("name", "twitter:card", "summary_large_image");
    upsertMeta("name", "twitter:title", title);
    upsertMeta("name", "twitter:description", description);
    upsertMeta("name", "twitter:image", image);
  }, [title, description, path, image]);
}