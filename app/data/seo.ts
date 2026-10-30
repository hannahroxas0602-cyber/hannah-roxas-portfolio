import type { Metadata } from "next";

export const siteUrl = "https://www.hannahroxas.com";
export const targetRole = "Product Designer / Design Engineer";
export const siteName = `Hannah Roxas | ${targetRole}`;
export const siteDescription =
  "Hannah Roxas is a product designer who ships her own front-end code. Product designer at Learvo, an ed-tech startup, where she designed and built onboarding, navigation, and the landing page.";

const previewImage = {
  url: "/images/Link_preview_home.png",
  width: 2400,
  height: 1260,
  alt: `Hannah Roxas, ${targetRole} — Portfolio`,
};

// openGraph and twitter are replaced, not merged, by child segments, so every
// page builds the full set here to keep its own description and URL. Case
// studies pass a share-specific ogTitle/ogDescription; otherwise they match
// the page's title and description.
export function pageMetadata({
  title,
  description,
  path,
  ogTitle = title,
  ogDescription = description,
}: {
  title: string;
  description: string;
  path: string;
  ogTitle?: string;
  ogDescription?: string;
}): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: ogTitle,
      description: ogDescription,
      url: path,
      siteName,
      images: [previewImage],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description: ogDescription,
      images: [previewImage.url],
    },
  };
}

export function caseStudyTitle(name: string) {
  return `${name} | Hannah Roxas, ${targetRole}`;
}
