import type { MetadataRoute } from "next";
import { site } from "@/content/site";

// output: "export" only builds this if it is pinned static
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${site.url}/sitemap.xml`,
  };
}
