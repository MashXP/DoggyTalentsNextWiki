'use client';

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import Search from "./Search";
import { SearchItem } from "@/lib/wiki";

interface NavTreeNode {
  slug?: string;
  children: { [key: string]: NavTreeNode };
}

function buildTree(slugs: string[]): { [key: string]: NavTreeNode } {
  const tree: { [key: string]: NavTreeNode } = {};
  slugs.forEach(slug => {
    const parts = slug.split('/');
    let current = tree;
    parts.forEach((part, index) => {
      if (!current[part]) current[part] = { children: {} };
      if (index === parts.length - 1) {
        current[part].slug = slug;
      } else {
        current = current[part].children;
      }
    });
  });
  return tree;
}

function hasActiveInside(node: { [key: string]: NavTreeNode }, pathname: string): boolean {
  return Object.values(node).some(item => {
    if (item.slug) {
      const href = `/${item.slug}`;
      if (pathname === href || pathname === `${href}/`) return true;
    }
    return hasActiveInside(item.children, pathname);
  });
}

function FolderItem({
  label,
  slug,
  children,
  level,
  defaultOpen,
  isChildActive,
}: {
  label: string;
  slug?: string;
  children: React.ReactNode;
  level: number;
  defaultOpen: boolean;
  isChildActive: boolean;
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(defaultOpen);
  const isActive = slug && (pathname === `/${slug}` || pathname === `/${slug}/`);

  useEffect(() => {
    if (isChildActive) {
      setOpen(true);
    }
  }, [isChildActive]);

  return (
    <div className="nav-folder-wrapper">
      <div className={`nav-folder-header${isChildActive ? ' active' : ''}`}>
        {slug ? (
          <Link href={`/${slug}`} className={`nav-item nav-folder-link indent-${level}${isActive ? ' active' : ''}`}>
            {label}
          </Link>
        ) : (
          <span className={`nav-item nav-folder-link indent-${level}${isChildActive ? ' active' : ''}`} style={{ cursor: 'default', userSelect: 'none' }}>
            {label}
          </span>
        )}
        <button
          className="nav-toggle-btn"
          onClick={() => setOpen(o => !o)}
          aria-label={open ? 'Collapse' : 'Expand'}
        >
          <span style={{ display: 'inline-block', transform: open ? 'rotate(90deg)' : 'rotate(0deg)', transition: 'transform 0.2s ease' }}>
            ▸
          </span>
        </button>
      </div>
      <div className={`nav-folder-content ${open ? 'open' : ''}`}>
        <div className="nav-children">
          <div className="nav-children-inner">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

const ROOT_ORDER = [
  "Getting_Started",
  "Dog_Menu",
  "Behaviors",
  "Items",
  "Talents",
  "Achievements",
  "Configuration",
  "For_Developers_and_Creators",
  "FAQ",
  "Unfinished_Wiki_Pages",
  "DTN_s_Palette_Of_Paws_Variant_Checklist",
];

function NavTree({ node, level = 0 }: { node: { [key: string]: NavTreeNode }; level?: number }) {
  const pathname = usePathname();

  const sortedKeys = Object.keys(node).sort((a, b) => {
    if (level === 0) {
      const indexA = ROOT_ORDER.indexOf(a);
      const indexB = ROOT_ORDER.indexOf(b);

      if (indexA !== -1 && indexB !== -1) {
        return indexA - indexB;
      }
      if (indexA !== -1) return -1;
      if (indexB !== -1) return 1;
    }

    const aHasChildren = Object.keys(node[a].children).length > 0;
    const bHasChildren = Object.keys(node[b].children).length > 0;
    if (aHasChildren && !bHasChildren) return -1;
    if (!aHasChildren && bHasChildren) return 1;
    return a.localeCompare(b);
  });

  return (
    <>
      {sortedKeys.map(key => {
        const item = node[key];
        const hasChildren = Object.keys(item.children).length > 0;
        const displayName = key.replace(/_/g, ' ');

        if (hasChildren) {
          const isChildActive = hasActiveInside(item.children, pathname);
          return (
            <FolderItem
              key={key}
              label={displayName}
              slug={item.slug}
              level={level}
              defaultOpen={false}
              isChildActive={isChildActive}
            >
              <NavTree node={item.children} level={level + 1} />
            </FolderItem>
          );
        } else if (item.slug) {
          const href = `/${item.slug}`;
          const isActive = pathname === href || pathname === `${href}/`;
          return (
            <Link
              key={item.slug}
              href={href}
              className={`nav-item indent-${level}${isActive ? ' active' : ''}`}
            >
              {displayName}
            </Link>
          );
        }
        return null;
      })}
    </>
  );
}

export default function SidebarNav({ slugs, searchData }: { slugs: string[]; searchData: SearchItem[] }) {
  const tree = buildTree(slugs.filter(s => s !== 'Doggy_Talents_Next_Wiki'));
  const pathname = usePathname();

  return (
    <aside className="sidebar glass">
      <div className="sidebar-header">
        <Link href="/" className="sidebar-logo">
          <Image
            src="/images/site-logo.png"
            alt="Doggy Talents Next Logo"
            width={500}
            height={500}
            style={{ width: '100%', height: 'auto' }}
            priority
          />
        </Link>
        <div className="separator" style={{ marginLeft: '-1rem', marginRight: '-1rem' }} />
        <Search data={searchData} />
      </div>
      <nav className="nav-links">
        <NavTree node={tree} />
      </nav>
    </aside>
  );
}
