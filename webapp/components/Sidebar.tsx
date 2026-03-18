import { getNavSlugs, getSearchData } from "@/lib/wiki";
import SidebarNav from "@/components/SidebarNav";

// Server component — fetches slugs and search data via fs, passes to client SidebarNav
export default function Sidebar() {
  const slugs = getNavSlugs();
  const searchData = getSearchData();
  return <SidebarNav slugs={slugs} searchData={searchData} />;
}
