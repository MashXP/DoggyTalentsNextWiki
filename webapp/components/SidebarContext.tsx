'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

interface SidebarContextType {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (isOpen: boolean) => void;
  toggleSidebar: () => void;
  isTOCOpen: boolean;
  setIsTOCOpen: (isOpen: boolean) => void;
  toggleTOC: () => void;
  closeAll: () => void;
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export function SidebarProvider({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isTOCOpen, setIsTOCOpen] = useState(false);
  const pathname = usePathname();

  const toggleSidebar = () => {
    setIsSidebarOpen(prev => !prev);
    if (!isSidebarOpen) setIsTOCOpen(false); // Close TOC if opening sidebar
  };

  const toggleTOC = () => {
    setIsTOCOpen(prev => !prev);
    if (!isTOCOpen) setIsSidebarOpen(false); // Close sidebar if opening TOC
  };

  const closeAll = () => {
    setIsSidebarOpen(false);
    setIsTOCOpen(false);
  };

  // Close everything when navigating to a new page
  useEffect(() => {
    closeAll();
  }, [pathname]);

  // Prevent scrolling when either sidebar is open on mobile
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsSidebarOpen(false);
      }
      if (window.innerWidth > 1200) {
        setIsTOCOpen(false);
      }
    };
    
    window.addEventListener('resize', handleResize);
    
    if ((isSidebarOpen && window.innerWidth <= 768) || (isTOCOpen && window.innerWidth <= 1200)) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      window.removeEventListener('resize', handleResize);
      document.body.style.overflow = '';
    };
  }, [isSidebarOpen, isTOCOpen]);

  return (
    <SidebarContext.Provider value={{ 
      isSidebarOpen, setIsSidebarOpen, toggleSidebar,
      isTOCOpen, setIsTOCOpen, toggleTOC,
      closeAll
    }}>
      {children}
    </SidebarContext.Provider>
  );
}

export function useSidebar() {
  const context = useContext(SidebarContext);
  if (context === undefined) {
    throw new Error('useSidebar must be used within a SidebarProvider');
  }
  return context;
}
