import { renderHomeOgImage, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";
import { home } from "@/content/home";
import { site } from "@/content/site";

// output: "export" only builds this if it is pinned static
export const dynamic = "force-static";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = `${site.name}, with his photo. ${home.ogLabel}`;

export default function Image() {
  return renderHomeOgImage({ title: site.name, label: home.ogLabel });
}
