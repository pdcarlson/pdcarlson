import { renderOgImage, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";
import { resume } from "@/content/resume";
import { site } from "@/content/site";

// output: "export" only builds this if it is pinned static
export const dynamic = "force-static";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = `Resume · ${site.name}`;

export default function Image() {
  return renderOgImage({
    eyebrow: site.name,
    title: "Resume",
    description: resume.ogDescription,
  });
}
