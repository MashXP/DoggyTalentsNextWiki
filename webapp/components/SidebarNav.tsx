'use client';

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import Search from "./Search";
import { SearchItem } from "@/lib/wiki";
import { getAssetPath } from "@/lib/utils";
import { useSidebar } from "./SidebarContext";

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

function NavItem({ 
  label, 
  slug, 
  level, 
  isActive 
}: { 
  label: string; 
  slug?: string; 
  level: number;
  isActive: boolean;
}) {
  const content = (
    <>
      <div className="nav-item-bg" />
      <span className="nav-item-indent-marker" style={{ width: 0, height: 0, visibility: 'hidden' }} />
      {label}
    </>
  );

  if (slug) {
    return (
      <Link 
        href={`/${slug}`} 
        className={`nav-item indent-${level}${isActive ? ' active' : ''}`}
      >
        {content}
      </Link>
    );
  }

  return (
    <span className={`nav-item indent-${level}${isActive ? ' active' : ''}`} style={{ cursor: 'default', userSelect: 'none' }}>
      {content}
    </span>
  );
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
        <NavItem label={label} slug={slug} level={level} isActive={isActive || false} />
        <button
          className="nav-toggle-btn"
          onClick={(e) => {
            e.stopPropagation();
            setOpen(o => !o);
          }}
          aria-label={open ? 'Collapse' : 'Expand'}
        >
          <span style={{ transform: open ? 'rotate(90deg)' : 'rotate(0deg)' }}>
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

  const SEPARATOR_BEFORE = [
    "Dog_Menu",
    "Configuration",
    "Unfinished_Wiki_Pages",
  ];

  return (
    <>
      {sortedKeys.map(key => {
        const item = node[key];
        const hasChildren = Object.keys(item.children).length > 0;
        const displayName = key.replace(/_/g, ' ');
        const showSeparator = level === 0 && SEPARATOR_BEFORE.includes(key);

        return (
          <div key={key}>
            {showSeparator && <div className="separator" />}
            {hasChildren ? (
              <FolderItem
                label={displayName}
                slug={item.slug}
                level={level}
                defaultOpen={false}
                isChildActive={hasActiveInside(item.children, pathname)}
              >
                <NavTree node={item.children} level={level + 1} />
              </FolderItem>
            ) : item.slug ? (
              <NavItem label={displayName} slug={item.slug} level={level} isActive={pathname === `/${item.slug}` || pathname === `/${item.slug}/`} />
            ) : null}
          </div>
        );
      })}
    </>
  );
}

export default function SidebarNav({ slugs, searchData }: { slugs: string[]; searchData: SearchItem[] }) {
  const tree = buildTree(slugs.filter(s => s !== 'Doggy_Talents_Next_Wiki'));
  const pathname = usePathname();
  const navRef = useRef<HTMLElement>(null);
  const { isOpen, setIsOpen } = useSidebar();
  
  // Touch gesture state
  const touchStart = useRef<{ x: number, y: number } | null>(null);
  const touchEnd = useRef<{ x: number, y: number } | null>(null);
  const minSwipeDistance = 40;

  useEffect(() => {
    const handleTouchStart = (e: globalThis.TouchEvent) => {
      touchStart.current = {
        x: e.targetTouches[0].clientX,
        y: e.targetTouches[0].clientY
      };
      touchEnd.current = null;
    };

    const handleTouchMove = (e: globalThis.TouchEvent) => {
      touchEnd.current = {
        x: e.targetTouches[0].clientX,
        y: e.targetTouches[0].clientY
      };
    };

    const handleTouchEnd = () => {
      if (!touchStart.current || !touchEnd.current) return;
      
      const xDiff = touchStart.current.x - touchEnd.current.x;
      const yDiff = touchStart.current.y - touchEnd.current.y;
      
      // Ensure horizontal swipe is dominant and exceeds threshold
      if (Math.abs(xDiff) > Math.abs(yDiff) && Math.abs(xDiff) > minSwipeDistance) {
        if (xDiff < 0 && !isOpen) {
          setIsOpen(true);
        } else if (xDiff > 0 && isOpen) {
          setIsOpen(false);
        }
      }
    };

    window.addEventListener('touchstart', handleTouchStart);
    window.addEventListener('touchmove', handleTouchMove);
    window.addEventListener('touchend', handleTouchEnd);

    return () => {
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isOpen, setIsOpen]);

  const [indicatorStyle, setIndicatorStyle] = useState<React.CSSProperties>({
    opacity: 0,
    transform: 'translate(0, 0)',
    height: 0
  });

  useEffect(() => {
    const moveIndicator = (element: HTMLElement) => {
      const navContainer = navRef.current;
      if (!navContainer || !element) return;

      const containerRect = navContainer.getBoundingClientRect();
      const itemRect = element.getBoundingClientRect();
      
      // Calculate vertical position relative to container
      const top = itemRect.top - containerRect.top;
      const height = itemRect.height;
      
      setIndicatorStyle({
        opacity: 1,
        transform: `translateY(${top}px)`,
        height: `${height}px`
      });
    };

    const activeItem = navRef.current?.querySelector('.nav-item.active') as HTMLElement;
    if (activeItem) {
      // Use a small delay to ensure layout is ready after folder toggles
      const timer = setTimeout(() => moveIndicator(activeItem), 50);
      return () => clearTimeout(timer);
    } else {
      setIndicatorStyle(prev => ({ ...prev, opacity: 0 }));
    }

    // Global listener for hover effects
    const handleMouseMove = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const navItem = target.closest('.nav-item') as HTMLElement;
      if (navItem) {
        moveIndicator(navItem);
      }
    };

    const handleMouseLeave = () => {
      if (activeItem) {
        moveIndicator(activeItem);
      } else {
        setIndicatorStyle(prev => ({ ...prev, opacity: 0 }));
      }
    };

    const navContainer = navRef.current;
    if (navContainer) {
      navContainer.addEventListener('mousemove', handleMouseMove);
      navContainer.addEventListener('mouseleave', handleMouseLeave);
    }

    return () => {
      if (navContainer) {
        navContainer.removeEventListener('mousemove', handleMouseMove);
        navContainer.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, [pathname]);

  return (
    <>
      <div 
        className={`sidebar-overlay ${isOpen ? 'active' : ''}`} 
        onClick={() => setIsOpen(false)}
      />
      <aside 
        className={`sidebar glass ${isOpen ? 'open' : ''}`}
      >
        <div className="sidebar-header">
          <Link href="/" className="sidebar-logo">
            <Image
              src={getAssetPath("/images/site-logo.png")}
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
        <nav className="nav-links" ref={navRef}>
          <div className="nav-indicator" style={indicatorStyle} />
          <NavTree node={tree} />
        </nav>
      </aside>
    </>
  );
}
