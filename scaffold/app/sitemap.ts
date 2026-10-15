import type { MetadataRoute } from "next";
import { getPortfolio } from "@/lib/data";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { projects } = await getPortfolio();
  const origin = process.env.NEXT_PUBLIC_SITE_URL || "https://example.com";

  const staticRoutes: MetadataRoute.Sitemap = [
    "",
    "/about",
    "/projects",
    "/experience",
    "/education",
    "/contact",
  ].map((path) => ({
    url: `${origin}${path}`,
    lastModified: new Date(),
  }));

  const projectRoutes: MetadataRoute.Sitemap = projects
    .filter((p) => p.published)
    .map((p) => {
      const dateStr = p.updated_at || p.created_at;
      const validDate = dateStr && !isNaN(new Date(dateStr).getTime()) ? new Date(dateStr) : new Date();
      return {
        url: `${origin}/projects/${p.slug}`,
        lastModified: validDate,
      };
    });

  return [...staticRoutes, ...projectRoutes];
}
