import type { Metadata } from "next";
import "./globals.css";
import "./upgrades.css";
import "./fontawesome.css";
export const metadata: Metadata = { title: "iFranchise Icon Studio", description: "The home for the iFranchise icon system." };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en"><body>{children}</body></html>; }
