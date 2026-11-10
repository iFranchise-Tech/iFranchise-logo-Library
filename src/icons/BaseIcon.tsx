import type { BaseIconProps } from "./types";

type GlyphProps = BaseIconProps & { paths: string[]; animation?: string; viewBox?: string; filled?: boolean };
export function BaseIcon({ paths, size = 24, color = "currentColor", strokeWidth = 1.8, className, label, variant = "outline", animated = false, animation, viewBox = "0 0 24 24", filled = false, ...props }: GlyphProps) {
  const isDecorative = !label && !props["aria-label"];
  const animClass = animated && animation ? `icon-motion icon-motion-${animation}` : "";
  const isFilled = filled || variant === "solid";
  return <svg viewBox={viewBox} width={size} height={size} fill={isFilled ? "currentColor" : "none"} color={color} stroke={isFilled ? "none" : "currentColor"} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={["if-icon", animClass, className].filter(Boolean).join(" ")} role={isDecorative ? undefined : "img"} aria-hidden={isDecorative ? true : undefined} aria-label={label} {...props}>
    {variant === "duotone" && <g fill="currentColor" opacity=".14" stroke="none"><circle cx="12" cy="12" r="8.7" /></g>}
    {paths.map((d, index) => <path key={index} d={d} fill={isFilled ? "currentColor" : "none"} />)}
  </svg>;
}
