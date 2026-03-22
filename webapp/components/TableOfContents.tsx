'use client';

import React, { useEffect, useState, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useSidebar } from './SidebarContext';

interface TOCItem {
  id: string;
  title: string;
}

interface TOCProps {
  sections: { title: string }[];
  viewMode?: 'full' | 'tabs';
  activeTabIndex?: number;
  onTabChange?: (index: number) => void;
}

export default function TableOfContents({ sections, viewMode = 'full', activeTabIndex, onTabChange }: TOCProps) {
  const [activeId, setActiveId] = useState<string>('');
  const [tocItems, setTocItems] = useState<TOCItem[]>([]);
  const { isTOCOpen, setIsTOCOpen, isSidebarOpen, closeAll } = useSidebar();
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Touch gesture state
  const touchStart = useRef<{ x: number, y: number } | null>(null);
  const touchEnd = useRef<{ x: number, y: number } | null>(null);
  const minSwipeDistance = 60;

  useEffect(() => {
    setMounted(true);
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 1200);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Slugification matching rehype-slug (github-slugger style)
  const slugify = (text: string) => {
    return text
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '') // Remove non-word chars (except spaces and hyphens)
      .replace(/[\s_]+/g, '-')  // Replace spaces/underscores with hyphens
      .replace(/^-+|-+$/g, ''); // Trim leading/trailing hyphens
  };

  useEffect(() => {
    // Filter out Overview and Map to items
    const items = sections
      .filter(s => s.title.toLowerCase() !== 'overview')
      .map(s => ({
        id: slugify(s.title),
        title: s.title,
      }));
    setTocItems(items);
  }, [sections]);

  useEffect(() => {
    if (viewMode === 'tabs') {
      const offsetIndex = sections[0]?.title.toLowerCase() === 'overview' ? activeTabIndex! - 1 : activeTabIndex!;
      if (offsetIndex >= 0 && tocItems[offsetIndex]) {
        setActiveId(tocItems[offsetIndex].id);
      } else {
        setActiveId('');
      }
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { 
        rootMargin: '-80px 0% -80% 0%', // Adjusted for sticky header
        threshold: 0
      }
    );

    const headings = document.querySelectorAll('h2[id]');
    headings.forEach((heading) => observer.observe(heading));

    return () => {
      headings.forEach((heading) => observer.unobserve(heading));
    };
  }, [tocItems, viewMode, activeTabIndex, sections]);

  // Separate effect for touch events to avoid observer noise
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
      
      if (Math.abs(xDiff) > Math.abs(yDiff) && Math.abs(xDiff) > minSwipeDistance) {
        if (xDiff > 0) { // Right to Left
          if (!isTOCOpen && !isSidebarOpen) {
            setIsTOCOpen(true);
          }
        } else if (xDiff < 0) { // Left to Right
          if (isTOCOpen) {
            setIsTOCOpen(false);
          }
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
  }, [isTOCOpen, setIsTOCOpen, isSidebarOpen]);

  const highlightElement = (el: HTMLElement) => {
    el.classList.add('hash-highlight');
    setTimeout(() => {
      el.classList.remove('hash-highlight');
    }, 1000);
  };

  const scrollToTop = () => {
    document.body.style.overflow = '';
    window.scrollTo({ top: 0, behavior: 'smooth' });
    window.history.pushState(null, '', window.location.pathname);
    closeAll();
  };

  const scrollToBottom = () => {
    document.body.style.overflow = '';
    const scrollHeight = Math.max(
      document.body.scrollHeight, 
      document.documentElement.scrollHeight
    );
    window.scrollTo({ top: scrollHeight, behavior: 'smooth' });
    closeAll();
  };

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    
    const sectionIndex = sections.findIndex(s => slugify(s.title) === id);

    if (viewMode === 'tabs' && onTabChange && sectionIndex !== -1) {
      onTabChange(sectionIndex);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      window.history.pushState(null, '', window.location.pathname);
      closeAll();
      return;
    }

    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setTimeout(() => {
        highlightElement(element);
      }, 800);
      window.history.pushState(null, '', `#${id}`);
      closeAll();
    }
  };

  if (tocItems.length === 0 && !sections.length) return null;

  const tocContent = (
    <>
      <div 
        className={`sidebar-overlay toc-overlay ${isTOCOpen ? 'active' : ''}`} 
        onClick={closeAll}
      />
      <nav className={`toc-container ${isTOCOpen ? 'open' : ''}`}>
        <div className="toc-header">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line></svg>
          <span>On this page</span>
        </div>
        
        <div className="toc-content-scrollable">
          {tocItems.length > 0 && (
            <ul className="toc-list">
              {tocItems.map((item) => (
                <li key={item.id} className={`toc-item ${activeId === item.id ? 'active' : ''}`}>
                  <a 
                    href={`#${item.id}`} 
                    onClick={(e) => handleClick(e, item.id)}
                  >
                    {item.title}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="toc-footer-controls">
          <button onClick={scrollToTop} title="Scroll to Top" aria-label="Scroll to Top">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 15l-6-6-6 6"/></svg>
            <span style={{ fontSize: '0.7rem', fontWeight: 600, marginLeft: '4px' }}></span>
          </button>
          <button onClick={scrollToBottom} title="Scroll to Bottom" aria-label="Scroll to Bottom">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9l6 6 6-6"/></svg>
            <span style={{ fontSize: '0.7rem', fontWeight: 600, marginLeft: '4px' }}></span>
          </button>
        </div>
      </nav>
    </>
  );

  if (mounted && isMobile) {
    return createPortal(tocContent, document.body);
  }

  return tocContent;
}
