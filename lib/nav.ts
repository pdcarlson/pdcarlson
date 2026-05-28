import { Home, FileText, Boxes, MapPin } from "lucide-react";

export const nav = [
  { href: "/", label: "Home", icon: Home },
  { href: "/resume", label: "Resume", icon: FileText },
  { href: "/projects", label: "Projects", icon: Boxes },
  { href: "/about", label: "About & Contact", icon: MapPin },
] as const;

export type NavItem = (typeof nav)[number];
