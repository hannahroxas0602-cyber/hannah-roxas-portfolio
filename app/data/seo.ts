import type { Metadata } from "next";

export const siteUrl = "https://www.hannahroxas.com";
export const siteName = "Hannah Roxas | Product Designer";
export const siteDescription =
  "Hannah Roxas is a product designer who designs connected digital systems that reward curiosity, and ships her own front-end code.";

const previewImage = {
  url: "/images/Link_preview_final.png",
  width: 2846,
  height: 1512,
  alt: "Hannah Roxas, Product Designer — Portfolio",
};

// openGraph and twitter are replaced, not merged, by child segments, so every
// page builds the full set here to keep its own description and URL.
export function pageMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url: path,
      siteName,
      images: [previewImage],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [previewImage.url],
    },
  };
}

export function caseStudyTitle(name: string) {
  return `${name} | Hannah Roxas, Product Designer`;
}
