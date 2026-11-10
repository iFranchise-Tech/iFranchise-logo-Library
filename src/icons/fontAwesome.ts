import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import type { IconDefinition as FaIcon } from "@fortawesome/fontawesome-svg-core";
import type { FontAwesomeStyle, IconDefinition } from "./types";

const labelWords = (value: string) => value.replace(/([a-z])([A-Z])/g, "$1 $2").replace(/-/g," ").toLowerCase().split(/\s+/).filter(Boolean);
function collect(style: FontAwesomeStyle, entries: Record<string, FaIcon>): IconDefinition[] {
  const seen = new Set<string>();
  return Object.entries(entries).flatMap(([exportName, icon]) => {
    const iconName = icon.iconName;
    // Font Awesome keeps backwards-compatible aliases in each pack. Keep one
    // card per real glyph/style so the library has stable React keys and counts.
    if (seen.has(iconName)) return [];
    seen.add(iconName);
    const [width, height, , unicode, rawPaths] = icon.icon;
    const paths = (Array.isArray(rawPaths) ? rawPaths : [rawPaths]).filter((path): path is string => typeof path === "string");
    const styleLabel = style === "brands" ? "Brand" : style === "regular" ? "Regular" : "Solid";
    return [{
      name: iconName,
      componentName: exportName,
      slug: `fa-${style}-${iconName}`,
      category: "Media",
      description: `Font Awesome ${iconName.replace(/-/g," ")} icon (${styleLabel.toLowerCase()} style).`,
      tags: [...new Set(["font awesome", style, ...labelWords(iconName)])],
      paths,
      source: "fontawesome",
      fontAwesomeStyle: style,
      fontAwesomeExport: exportName,
      unicode,
      viewBox: `0 0 ${width} ${height}`,
      filled: true,
    }];
  });
}

const featuredIcons = ["house", "circle-user", "image", "file", "camera", "calendar", "cloud", "alarm-clock", "truck", "thumbs-up", "face-smile", "headphones", "bell", "user", "comment", "envelope", "globe", "trophy", "hand", "eye", "inbox", "print", "suitcase", "volume-high"];
const styleOrder: Record<FontAwesomeStyle, number> = { solid: 0, regular: 1, brands: 2 };
export const fontAwesomeCatalog: IconDefinition[] = [
  ...collect("solid", fas),
  ...collect("regular", far),
  ...collect("brands", fab),
].sort((a, b) => {
  // Keep the first gallery rows clean and familiar like Font Awesome's own
  // browse page; style duplicates remain available immediately after the set.
  const aFeature = a.fontAwesomeStyle === "solid" ? featuredIcons.indexOf(a.name) : -1;
  const bFeature = b.fontAwesomeStyle === "solid" ? featuredIcons.indexOf(b.name) : -1;
  if (aFeature >= 0 || bFeature >= 0) return aFeature < 0 ? 1 : bFeature < 0 ? -1 : aFeature - bFeature;
  return styleOrder[a.fontAwesomeStyle!] - styleOrder[b.fontAwesomeStyle!] || a.name.localeCompare(b.name);
});
