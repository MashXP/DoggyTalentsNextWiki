import { getNavSlugs } from "@/lib/wiki";
import SidebarNav from "@/components/SidebarNav";

// Server component — fetches slugs via fs, passes to client SidebarNav
export default function Sidebar() {
  const slugs = getNavSlugs();
  return <SidebarNav slugs={slugs} />;
}
