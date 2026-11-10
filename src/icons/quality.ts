import type { IconDefinition } from "./types";

export function validateIconCatalog(icons: readonly IconDefinition[]): string[] {
  const errors: string[] = [];
  const slugs = new Set<string>();
  const components = new Set<string>();
  for (const icon of icons) {
    if (slugs.has(icon.slug)) errors.push(`Duplicate icon URL slug: ${icon.slug}`);
    if (components.has(icon.componentName)) errors.push(`Duplicate component name: ${icon.componentName}`);
    slugs.add(icon.slug);
    components.add(icon.componentName);
    if (!icon.name || !icon.category || !icon.description || icon.paths.length === 0 || icon.tags.length === 0) errors.push(`Incomplete icon metadata: ${icon.name || icon.slug}`);
    if (icon.paths.length > 8) errors.push(`${icon.name} has ${icon.paths.length} separate paths; simplify or combine paths.`);
    if (icon.paths.some(path => !path.trim() || path.length > 320)) errors.push(`${icon.name} contains an empty or overly complex path.`);
  }
  return errors;
}
