'use client';

import { useSidebar } from './SidebarContext';
import { getAssetPath } from '@/lib/utils';
import Image from 'next/image';

export default function MobileHeader() {
  const { toggleSidebar, toggleTOC } = useSidebar();

  return (
    <header className="mobile-header glass">
      <button 
        className="menu-toggle" 
        onClick={toggleSidebar}
        aria-label="Toggle Menu"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="3" y1="12" x2="21" y2="12"></line>
          <line x1="3" y1="6" x2="21" y2="6"></line>
          <line x1="3" y1="18" x2="21" y2="18"></line>
        </svg>
      </button>

      <div className="mobile-logo">
        <Image
          src={getAssetPath("/images/site-logo.png")}
          alt="Logo"
          width={55}
          height={32}
        />
      </div>
          
      <button 
        className="menu-toggle" 
        onClick={toggleTOC}
        aria-label="Toggle TOC"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="8" y1="6" x2="21" y2="6"></line>
          <line x1="8" y1="12" x2="21" y2="12"></line>
          <line x1="8" y1="18" x2="21" y2="18"></line>
          <line x1="3" y1="6" x2="3.01" y2="6"></line>
          <line x1="3" y1="12" x2="3.01" y2="12"></line>
          <line x1="3" y1="18" x2="3.01" y2="18"></line>
        </svg>
      </button>
    </header>
  );
}
