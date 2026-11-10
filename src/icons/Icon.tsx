import { iconCatalog } from "./catalog";
import { fontAwesomeCatalog } from "./fontAwesome";
import { BaseIcon } from "./BaseIcon";
import type { BaseIconProps } from "./types";

export function Icon({ name, slug, ...props }: BaseIconProps & { name: string; slug?: string }) {
  const definition = (slug ? fontAwesomeCatalog.find((item) => item.slug === slug) : undefined) ?? iconCatalog.find((item) => item.name === name);
  if (!definition) return null;
  return <BaseIcon {...props} paths={definition.paths} animation={definition.animated} viewBox={definition.viewBox} filled={definition.filled} />;
}
