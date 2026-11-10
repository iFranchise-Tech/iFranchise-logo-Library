import type { IconDefinition, IconDefinitionInput } from "./types";
import { expandedIcons } from "./expanded";
import { validateIconCatalog } from "./quality";
// iFranchise Icon Language: 24px grid, 3.5px optical safe margin, 1.8px stroke,
// 1.5px softened corners, and short rounded terminals for a quiet geometric signature.
const iconDefinitions: IconDefinitionInput[] = [
  {name:"Home",slug:"home",category:"Navigation",description:"Return to your workspace overview.",paths:["M4.25 10.65 12 4.5l7.75 6.15","M6.25 9.1v9.15q0 1.25 1.25 1.25h3.25v-5.75h2.5v5.75h3.25q1.25 0 1.25-1.25V9.1"]},
  {name:"Dashboard",slug:"dashboard",category:"Navigation",description:"A quick view of key business activity.",paths:["M4.25 4.75h6.5v6.5h-6.5z","M13.25 4.75h6.5v3.5h-6.5z","M13.25 10.75h6.5v8.5h-6.5z","M4.25 13.25h6.5v6h-6.5z"]},
  {name:"Menu",slug:"menu",category:"Navigation",description:"Open the primary navigation.",paths:["M4.25 6.25h15.5","M4.25 12h15.5","M4.25 17.75h15.5"]},
  {name:"Search",slug:"search",category:"Navigation",description:"Find icons, people, and records.",paths:["M10.65 17.65a6.6 6.6 0 1 1 0-13.2 6.6 6.6 0 0 1 0 13.2Z","m15.65 15.65 4.1 4.1"]},
  {name:"Back",slug:"back",category:"Navigation",description:"Move to the previous view.",paths:["M19.5 12H5","m10.5 17-5-5 5-5"]},
  {name:"Forward",slug:"forward",category:"Navigation",description:"Move to the next view.",paths:["M4.5 12H19","m13.5 7 5 5-5 5"]},
  {name:"ChevronDown",slug:"chevron-down",category:"Navigation",description:"Reveal a menu or section.",paths:["m6.5 9.5 5.5 5 5.5-5"]},
  {name:"ChevronRight",slug:"chevron-right",category:"Navigation",description:"Continue into a section.",paths:["m9.5 6.5 5 5.5-5 5.5"]},
  {name:"Grid",slug:"grid",category:"Navigation",description:"Show content in a grid.",paths:["M4.5 4.5h6v6h-6z","M13.5 4.5h6v6h-6z","M4.5 13.5h6v6h-6z","M13.5 13.5h6v6h-6z"]},
  {name:"List",slug:"list",category:"Navigation",description:"Show content as a list.",paths:["M9.5 6.25h10","M9.5 12h10","M9.5 17.75h10","M4.75 6.25h.01","M4.75 12h.01","M4.75 17.75h.01"]},
  {name:"Add",slug:"add",category:"Actions",description:"Create a new item.",paths:["M12 5v14","M5 12h14"]},
  {name:"Edit",slug:"edit",category:"Actions",description:"Change an existing item.",paths:["m13.5 6.5 4 4","M4 20l4.4-.9L19 8.5a2.1 2.1 0 0 0-3-3L5.4 16.1 4 20Z"]},
  {name:"Delete",slug:"delete",category:"Actions",description:"Remove an item from this view.",paths:["M4.5 7h15","M9 7V4.5h6V7","m7 7 .7 12h8.6L17 7","M10 10.5v5","M14 10.5v5"]},
  {name:"Save",slug:"save",category:"Actions",description:"Save your changes.",paths:["M5 4.5h12l2.5 2.5v12.5H4.5v-15Z","M8 4.5v5h8v-5","M8 19.5v-6h8v6"]},
  {name:"Copy",slug:"copy",category:"Actions",description:"Copy this item to your clipboard.",paths:["M8 8V5a1.5 1.5 0 0 1 1.5-1.5h9A1.5 1.5 0 0 1 20 5v10a1.5 1.5 0 0 1-1.5 1.5h-3","M5 8h9a1.5 1.5 0 0 1 1.5 1.5v9A1.5 1.5 0 0 1 14 20H5a1.5 1.5 0 0 1-1.5-1.5v-9A1.5 1.5 0 0 1 5 8Z"]},
  {name:"Download",slug:"download",category:"Actions",description:"Save a local copy of this file.",paths:["M12 3.5v11","m7.5 10 4.5 4.5 4.5-4.5","M4.5 17v3h15v-3"],animated:"download"},
  {name:"Upload",slug:"upload",category:"Actions",description:"Add a file from your device.",paths:["M12 14.5v-11","m7.5 8 4.5-4.5L16.5 8","M4.5 17v3h15v-3"],animated:"upload"},
  {name:"Share",slug:"share",category:"Actions",description:"Share a direct link to this item.",paths:["M14 7.5 9 10.5","m14 16.5-5-3","M17 9.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z","M7 14.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z","M17 19.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z"]},
  {name:"Filter",slug:"filter",category:"Actions",description:"Narrow results by relevant fields.",paths:["M4 5h16l-6.2 7v5.5l-3.6 2V12L4 5Z"]},
  {name:"Sort",slug:"sort",category:"Actions",description:"Change the order of results.",paths:["M8 5v14","m4.5 9 3.5-4 3.5 4","M16 19V5","m12.5 15 3.5 4 3.5-4"]},
  {name:"Refresh",slug:"refresh",category:"Actions",description:"Reload the latest information.",paths:["M19 8V4l-2.5 2.5A7.5 7.5 0 0 0 5 9","M5 16v4l2.5-2.5A7.5 7.5 0 0 0 19 15"],animated:"spin"},
  {name:"Settings",slug:"settings",category:"Actions",description:"Adjust preferences and configuration.",paths:["M12 8.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7Z","M19.4 13.5a7.8 7.8 0 0 0 0-3l1.1-1-1.8-3.1-1.4.5a7.7 7.7 0 0 0-2.6-1.5L14.5 4h-5l-.2 1.4a7.7 7.7 0 0 0-2.6 1.5l-1.4-.5-1.8 3.1 1.1 1a7.8 7.8 0 0 0 0 3l-1.1 1 1.8 3.1 1.4-.5a7.7 7.7 0 0 0 2.6 1.5l.2 1.4h5l.2-1.4a7.7 7.7 0 0 0 2.6-1.5l1.4.5 1.8-3.1-1.1-1Z"]},
  {name:"Close",slug:"close",category:"Actions",description:"Dismiss the current panel.",paths:["m6 6 12 12","M18 6 6 18"]},
  {name:"Check",slug:"check",category:"Actions",description:"Confirm a completed action.",paths:["m4.5 12.5 5 5 10-11"]},
  {name:"Notification",slug:"notification",category:"Communication",description:"See updates that need your attention.",paths:["M18 9a6 6 0 0 0-12 0c0 7-2.5 7-2.5 9h17C20.5 16 18 16 18 9Z","M10 21h4"],animated:"pulse"},
  {name:"Email",slug:"email",category:"Communication",description:"Send and receive email.",paths:["M4.5 5.5h15a1.5 1.5 0 0 1 1.5 1.5v10a1.5 1.5 0 0 1-1.5 1.5h-15A1.5 1.5 0 0 1 3 17V7a1.5 1.5 0 0 1 1.5-1.5Z","m4 7 8 6 8-6"]},
  {name:"Phone",slug:"phone",category:"Communication",description:"Start a phone call.",paths:["M7 4h3l1.5 4-2 1.5a14 14 0 0 0 5 5l1.5-2 4 1.5v3a2 2 0 0 1-2.2 2A15 15 0 0 1 5 7a2 2 0 0 1 2-3Z"]},
  {name:"Message",slug:"message",category:"Communication",description:"Leave a message for a teammate.",paths:["M4 5.5h16v11H9l-5 3v-14Z","M8 10h.01","M12 10h.01","M16 10h.01"]},
  {name:"Chat",slug:"chat",category:"Communication",description:"Start a conversation.",paths:["M4 5.5h16v11H9l-5 3v-14Z","M8 10h8"]},
  {name:"Send",slug:"send",category:"Communication",description:"Send this message.",paths:["M21 3 14 21l-3.5-7.5L3 10l18-7Z","M10.5 13.5 15 9"] ,animated:"send"},
  {name:"Employee",slug:"employee",category:"HRMS",description:"An individual employee profile.",paths:["M12 12a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z","M5 20a7 7 0 0 1 14 0","M18 5.5h3","M19.5 4v3"]},
  {name:"Team",slug:"team",category:"HRMS",description:"A group working together.",paths:["M9 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z","M17 10a2.5 2.5 0 1 0-1.8-4.2","M3.5 19a5.5 5.5 0 0 1 11 0","M16 14a5 5 0 0 1 4.5 5"]},
  {name:"Attendance",slug:"attendance",category:"HRMS",description:"Track work attendance and presence.",paths:["M4.5 5.5h15v15h-15z","M8 3.5v4","M16 3.5v4","M4.5 9.5h15","m8 14 2.5 2.5 5-5"]},
  {name:"Leave",slug:"leave",category:"HRMS",description:"Review time off and leave requests.",paths:["M5 4.5h14v15H5z","M8 8h8","M8 12h3","M8 16h5","M16 13v6"]},
  {name:"Calendar",slug:"calendar",category:"HRMS",description:"View dates, events, and schedules.",paths:["M4 6h16v14H4z","M8 4v4","M16 4v4","M4 10h16","M8 13h.01 M12 13h.01 M16 13h.01 M8 16h.01 M12 16h.01"]},
  {name:"Payroll",slug:"payroll",category:"HRMS",description:"Manage compensation and payroll.",paths:["M4 6h16v13H4z","M8 10h8","M8 14h3","M16.5 16.5h.01","M6 3.5h12"]},
  {name:"Candidate",slug:"candidate",category:"HRMS",description:"Track a candidate in hiring.",paths:["M10 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z","M4.5 19a5.5 5.5 0 0 1 11 0","M16 7h4","M18 5v4","M17 15h3","M17 18h3"]},
  {name:"Lead",slug:"lead",category:"CRM",description:"A prospective customer or opportunity.",paths:["M12 12a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z","M5 20a7 7 0 0 1 14 0","M17.5 5.5l1 1 2-2"]},
  {name:"Customer",slug:"customer",category:"CRM",description:"A customer account and relationship.",paths:["M12 11a3.2 3.2 0 1 0 0-6.4 3.2 3.2 0 0 0 0 6.4Z","M5 20a7 7 0 0 1 14 0","M18 5v4","M16 7h4"]},
  {name:"Meeting",slug:"meeting",category:"CRM",description:"Schedule time with a customer.",paths:["M4 6h16v14H4z","M8 4v4","M16 4v4","M4 10h16","M9 14h6"]},
  {name:"Deal",slug:"deal",category:"CRM",description:"A commercial opportunity in progress.",paths:["M4 7.5 12 3l8 4.5v9L12 21l-8-4.5v-9Z","m4.5 7.8 7.5 4.4 7.5-4.4","M12 12.2V21"]},
  {name:"Pipeline",slug:"pipeline",category:"CRM",description:"Track opportunities through stages.",paths:["M4 5h4v4H4z","M10 10h4v4h-4z","M16 15h4v4h-4z","M8 7h4v3","M14 12h4v3"]},
  {name:"Target",slug:"target",category:"CRM",description:"Keep a goal or outcome in focus.",paths:["M20 12a8 8 0 1 1-2.3-5.7","M20 4v5h-5","M16 12a4 4 0 1 1-1.2-2.8","M12 12h.01"]},
  {name:"Approval",slug:"approval",category:"CRM",description:"Review and approve a request.",paths:["M12 3.5 20 7v5c0 4.5-3.2 7.2-8 9-4.8-1.8-8-4.5-8-9V7l8-3.5Z","m8.5 12 2.2 2.2 4.8-4.8"]},
  {name:"Company",slug:"company",category:"Business",description:"A business, brand, or organization.",paths:["M4 20V5.5L12 3v17","M12 9h8v11","M7 7.5h.01","M7 11h.01","M7 14.5h.01","M15.5 12h.01","M15.5 15.5h.01","M8.5 20v-3h2v3"]},
  {name:"Invoice",slug:"invoice",category:"Finance",description:"A statement for a payment or transaction.",paths:["M6 3.5h12v17l-3-2-3 2-3-2-3 2v-17Z","M9 8h6","M9 12h6","M9 16h3"]},
  {name:"Document",slug:"document",category:"Documents",description:"A file containing business information.",paths:["M6 3.5h8l4 4v13H6z","M14 3.5v5h4","M9 13h6","M9 16.5h6"]},
  {name:"Analytics",slug:"analytics",category:"Analytics",description:"Understand trends and performance.",paths:["M4 19.5h16","M6.5 16V11","M11.5 16V6","M16.5 16V9","M5 8l5-4 5 3 4-3"]},
  {name:"User",slug:"user",category:"System",description:"An account or user identity.",paths:["M12 12a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z","M5 20a7 7 0 0 1 14 0"]},
  {name:"Users",slug:"users",category:"System",description:"Manage the people using your workspace.",paths:["M9 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z","M3.5 19a5.5 5.5 0 0 1 11 0","M16 11a3 3 0 1 0-.5-5.9","M16 14a5.2 5.2 0 0 1 4.5 5"]},
  {name:"Role",slug:"role",category:"System",description:"A set of permissions for a user.",paths:["M12 3.5 20 7v5c0 4.5-3.2 7.2-8 9-4.8-1.8-8-4.5-8-9V7l8-3.5Z","M9 12h6","M12 9v6"]},
  {name:"Lock",slug:"lock",category:"System",description:"Keep sensitive information protected.",paths:["M5 10h14v10H5z","M8 10V7a4 4 0 0 1 8 0v3","M12 14v2"]},
  {name:"Security",slug:"security",category:"System",description:"Protect your workspace and data.",paths:["M12 3.5 20 7v5c0 4.5-3.2 7.2-8 9-4.8-1.8-8-4.5-8-9V7l8-3.5Z","M12 8v4","M12 16h.01"]},
  {name:"Database",slug:"database",category:"System",description:"Store and organize structured data.",paths:["M4 5.5c0-1.4 3.6-2.5 8-2.5s8 1.1 8 2.5-3.6 2.5-8 2.5-8-1.1-8-2.5Z","M4 5.5v13c0 1.4 3.6 2.5 8 2.5s8-1.1 8-2.5v-13","M4 12c0 1.4 3.6 2.5 8 2.5s8-1.1 8-2.5"]},
  {name:"Integration",slug:"integration",category:"System",description:"Connect tools and services together.",paths:["M7 4v5","M5 7h4","M17 15v5","M15 17h4","M9 7h3a4 4 0 0 1 4 4v2","M15 17h-3a4 4 0 0 1-4-4v-2"]},
  {name:"Loading",slug:"loading",category:"Status",description:"Show that a task is in progress.",paths:["M12 4v3","M12 17v3","m4.9 4.9 2.1 2.1","m17 17 2.1 2.1","M4 12h3","M17 12h3"],animated:"spin"},
  {name:"Success",slug:"success",category:"Status",description:"Confirm a successful outcome.",paths:["M12 3.5a8.5 8.5 0 1 0 0 17 8.5 8.5 0 0 0 0-17Z","m7.5 12.5 3 3 6-7"],animated:"success"},
  {name:"Error",slug:"error",category:"Status",description:"Show an action that needs attention.",paths:["M12 3.5a8.5 8.5 0 1 0 0 17 8.5 8.5 0 0 0 0-17Z","M12 8v5","M12 16.5h.01"],animated:"error"},
  ...expandedIcons
];

const tagOverrides: Record<string, string[]> = {
  home:["start","overview"],dashboard:["overview","workspace"],menu:["navigation","drawer"],search:["find","lookup"],employee:["staff","person","hr"],team:["people","group","staff"],notification:["alert","updates"],lead:["prospect","sales"],customer:["account","client"],company:["organization","business"],attendance:["time","presence"],payroll:["salary","compensation"],approval:["review","authorize"],database:["storage","data"],integration:["connect","sync"],analytics:["insights","metrics","report"]
};
const words = (value: string) => value.replace(/([a-z])([A-Z])/g,"$1 $2").toLowerCase().split(/[\s-]+/).filter(Boolean);
export const iconCatalog: IconDefinition[] = iconDefinitions.map((icon) => ({
  ...icon,
  componentName: icon.componentName ?? `${icon.name}Icon`,
  tags: [...new Set([...(icon.tags ?? []), ...words(icon.name), ...words(icon.category), ...(tagOverrides[icon.slug] ?? [])])],
}));
const qualityIssues = validateIconCatalog(iconCatalog);
if (qualityIssues.length) throw new Error(`Icon library quality check failed:\n${qualityIssues.join("\n")}`);
