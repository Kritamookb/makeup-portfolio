import type { MetadataRoute } from "next";
import { site } from "@/content/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: site.brand.name,
    short_name: site.brand.name,
    description: site.seo.description.th,
    start_url: "/th",
    display: "standalone",
    background_color: "#fbf7f4",
    theme_color: "#fbf7f4",
    icons: [
      { src: "/icon.png", sizes: "512x512", type: "image/png" },
      { src: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  };
}
