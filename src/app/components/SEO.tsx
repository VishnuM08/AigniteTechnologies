import { useEffect } from "react";

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
}

export function SEO({
  title = "Aignite Technologies - Thoughtful Web, App, and AI Products",
  description = "We build clean, useful, and human-centered technology products. Designed with clarity. Built for people.",
  keywords = "Aignite Technologies, web development, app development, AI products, Peerova, Kakeibo, software engineering",
  ogImage = "/og-image.png",
}: SEOProps) {
  useEffect(() => {
    document.title = title;

    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", description);
    } else {
      const meta = document.createElement("meta");
      meta.name = "description";
      meta.content = description;
      document.head.appendChild(meta);
    }

    const metaKeywords = document.querySelector('meta[name="keywords"]');
    if (metaKeywords) {
      metaKeywords.setAttribute("content", keywords);
    } else {
      const meta = document.createElement("meta");
      meta.name = "keywords";
      meta.content = keywords;
      document.head.appendChild(meta);
    }

    // Open Graph tags
    const ogTags = [
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:image", content: ogImage },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
      { name: "twitter:image", content: ogImage },
    ];

    ogTags.forEach(({ property, name, content }) => {
      const selector = property
        ? `meta[property="${property}"]`
        : `meta[name="${name}"]`;
      let tag = document.querySelector(selector);

      if (tag) {
        tag.setAttribute("content", content);
      } else {
        const meta = document.createElement("meta");
        if (property) meta.setAttribute("property", property);
        if (name) meta.setAttribute("name", name);
        meta.setAttribute("content", content);
        document.head.appendChild(meta);
      }
    });
  }, [title, description, keywords, ogImage]);

  return null;
}
