import type { SVGProps } from "react";
export type IconStyle = "outline" | "solid" | "duotone";
export type IconCategory = "Navigation" | "Actions" | "Business" | "HRMS" | "CRM" | "Finance" | "Communication" | "Documents" | "Analytics" | "System" | "Status" | "Media" | "Animated";
export type IconAnimation = "spin" | "pulse" | "success" | "error" | "send" | "upload" | "download";
export type IconSource = "ifranchise" | "fontawesome";
export type FontAwesomeStyle = "solid" | "regular" | "brands";
export type IconDefinition = { name: string; componentName: string; slug: string; category: IconCategory; description: string; tags: string[]; paths: string[]; animated?: IconAnimation; source?: IconSource; fontAwesomeStyle?: FontAwesomeStyle; fontAwesomeExport?: string; unicode?: string; viewBox?: string; filled?: boolean };
export type IconDefinitionInput = Omit<IconDefinition, "componentName" | "tags"> & Partial<Pick<IconDefinition, "componentName" | "tags">>;
export type BaseIconProps = SVGProps<SVGSVGElement> & { size?: number | string; color?: string; strokeWidth?: number; label?: string; variant?: IconStyle; animated?: boolean };
