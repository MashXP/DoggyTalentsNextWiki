'use client';

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";

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

function FolderItem({
  label,
  slug,
  children,
  level,
  defaultOpen,
}: {
  label: string;
  slug?: string;
  children: React.ReactNode;
  level: number;
  defaultOpen: boolean;
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(defaultOpen);
  const isActive = slug && (pathname === `/${slug}` || pathname === `/${slug}/`);

  return (
    <div className="nav-folder-wrapper">
      <div className={`nav-folder-header${level === 0 ? ' has-parent-bg' : ''}`}>
        {slug ? (
          <Link href={`/${slug}`} className={`nav-item nav-folder-link indent-${level}${isActive ? ' active' : ''}`}>
            {label}
          </Link>
        ) : (
          <span className={`nav-item nav-folder-link indent-${level}`} style={{ cursor: 'default', userSelect: 'none' }}>
            {label}
          </span>
        )}
        <button
          className="nav-toggle-btn"
          onClick={() => setOpen(o => !o)}
          aria-label={open ? 'Collapse' : 'Expand'}
        >
          {open ? '▾' : '▸'}
        </button>
      </div>
      {open && <div className="nav-children">{children}</div>}
    </div>
  );
}

function NavTree({ node, level = 0 }: { node: { [key: string]: NavTreeNode }; level?: number }) {
  const pathname = usePathname();

  const sortedKeys = Object.keys(node).sort((a, b) => {
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
          return (
            <FolderItem
              key={key}
              label={displayName}
              slug={item.slug}
              level={level}
              defaultOpen={false}
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

export default function SidebarNav({ slugs }: { slugs: string[] }) {
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
      </div>
      <nav className="nav-links">
        <Link href="/" className={`nav-item${pathname === '/' ? ' active' : ''}`}>
          🏠 Home
        </Link>
        <div className="separator" />
        <NavTree node={tree} />
      </nav>
    </aside>
  );
}
