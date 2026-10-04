import { renderOgImage, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";
import { accessibility } from "@/content/accessibility";
import { site } from "@/content/site";

// output: "export" only builds this if it is pinned static
export const dynamic = "force-static";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = `Accessibility · ${site.name}`;

export default function Image() {
  return renderOgImage({
    eyebrow: site.name,
    title: "Accessibility",
    description: accessibility.ogDescription,
  });
}
