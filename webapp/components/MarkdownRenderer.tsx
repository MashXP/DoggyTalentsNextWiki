'use client';

import { useState, useMemo, useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import rehypeSlug from 'rehype-slug';
import Link from 'next/link';

import RecipeDisplay from './RecipeDisplay';
import { ItemSlot } from './CraftingGrid';
import Gallery from './Gallery';

interface Section {
  title: string;
  content: string;
}

function CollapsibleDetails({ children, ...props }: any) {
  const [isOpen, setIsOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  
  // Find summary and content
  const childrenArray = Array.isArray(children) ? children : [children];
  const summary = childrenArray.find((c: any) => c?.type === 'summary' || c?.props?.node?.tagName === 'summary');
  const otherChildren = childrenArray.filter((c: any) => c !== summary);

  const handleToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isAnimating) return;
    
    setIsAnimating(true);
    setIsOpen(!isOpen);
  };

  const onTransitionEnd = () => {
    setIsAnimating(false);
  };

  // The details tag should be open if state is open OR if we are animating closed
  const isActuallyOpen = isOpen || isAnimating;

  return (
    <details 
      {...props} 
      open={isActuallyOpen} 
      className={`animated-details ${isOpen ? 'is-open' : ''}`}
    >
      <summary onClick={handleToggle}>
        <span className="summary-title">{summary ? (summary as any).props?.children : 'Details'}</span>
        <span className="summary-icon"></span>
      </summary>
      <div 
        className="details-content-wrapper" 
        onTransitionEnd={onTransitionEnd}
      >
        <div className="details-content-inner">
          {otherChildren}
        </div>
      </div>
    </details>
  );
}

function splitByH2(content: string): Section[] {
  const sections: Section[] = [];
  const lines = content.split('\n');
  let currentTitle = 'Overview';
  let currentContent: string[] = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line.startsWith('## ') && !line.startsWith('### ')) {
      const contentStr = currentContent.join('\n').trim();
      if (contentStr !== '') {
        sections.push({ title: currentTitle, content: currentContent.join('\n') });
      }
      currentTitle = line.replace('## ', '').trim();
      currentContent = [line];
    } else {
      currentContent.push(line);
    }
  }

  const lastContentStr = currentContent.join('\n').trim();
  if (lastContentStr !== '') {
    sections.push({ title: currentTitle, content: currentContent.join('\n') });
  }

  return sections;
}

export default function MarkdownRenderer({ content }: { content: string }) {
  const [viewMode, setViewMode] = useState<'full' | 'tabs'>('full');
  const [isReady, setIsReady] = useState(false);
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [selectedImage, setSelectedImage] = useState<{ src: string; alt: string; title?: string } | null>(null);
  const [imgDimensions, setImgDimensions] = useState<{ width: number; height: number } | null>(null);
  
  // Advanced Zoom & Pan State
  const [zoomLevel, setZoomLevel] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [transformOrigin, setTransformOrigin] = useState('center');
  const [isDragging, setIsDragging] = useState(false);
  const dragDistanceRef = useRef(0);

  // Dynamic Zoom Steps based on image size
  const dynamicZoomSteps = useMemo(() => {
    if (!imgDimensions) return [1, 2, 4, 8];
    // For very small images (icons), allow up to 16x
    // For large images, cap at 2x or 3x
    const maxScale = Math.max(2, Math.min(16, Math.floor(4000 / Math.max(imgDimensions.width, imgDimensions.height))));
    const steps = [1];
    let current = 2;
    while (current <= maxScale) {
      steps.push(current);
      current *= 2;
    }
    return steps;
  }, [imgDimensions]);

  const [isInfoActive, setIsInfoActive] = useState(true);
  const [isMouseOverInfo, setIsMouseOverInfo] = useState(false);
  const fadeTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('wiki_view_mode');
    if (saved === 'full' || saved === 'tabs') setViewMode(saved as 'full' | 'tabs');
    setIsReady(true);
  }, []);

  const handleToggleView = (mode: 'full' | 'tabs') => {
    setViewMode(mode);
    localStorage.setItem('wiki_view_mode', mode);
  };

  const sections = useMemo(() => splitByH2(content), [content]);
  const hasMultipleSections = sections.length > 1;

  // Combined effect to handle initial mount, content changes, and hash changes
  useEffect(() => {
    const handleNavigation = () => {
      if (typeof window === 'undefined') return;
      
      const rawHash = window.location.hash.replace('#', '');
      if (!rawHash) {
        // No hash, reset if content changed
        return; 
      }

      const hash = decodeURIComponent(rawHash).toLowerCase();
      // Also normalize hash to match slugified versions (replace spaces/underscores with hyphens)
      const normalizedHash = hash.replace(/[\s_]+/g, '-');

      if (viewMode === 'tabs') {
        // Try to find section matching the hash
        const targetIndex = sections.findIndex(s => {
          // 1. Match against title (normalized)
          const normalizedTitle = s.title.toLowerCase().replace(/[\s_]+/g, '-');
          if (normalizedTitle === normalizedHash || 
              normalizedTitle === hash || 
              s.title.toLowerCase() === hash) return true;
          
          // 2. Also check if the hash might be an ID *within* the section's content
          // Normalizing both sides for better match
          const contentLower = s.content.toLowerCase();
          if (contentLower.includes(`id="${hash}"`) || 
              contentLower.includes(`id='${hash}'`) ||
              contentLower.includes(`id="${normalizedHash}"`) ||
              contentLower.includes(`id="${rawHash}"`) ||
              contentLower.includes(`## ${hash}`) ||
              contentLower.includes(`## ${normalizedHash}`) ||
              contentLower.includes(`### ${hash}`) ||
              contentLower.includes(`### ${normalizedHash}`)) {
            return true;
          }
          return false;
        });

        if (targetIndex !== -1) {
          setActiveTabIndex(targetIndex);
          // Small delay to ensure rendering finished if we need to scroll *inside* the tab
          setTimeout(() => {
            const element = document.getElementById(rawHash) || document.getElementById(hash) || document.getElementById(normalizedHash);
            if (element) {
              element.scrollIntoView({ behavior: 'smooth' });
              highlightElement(element);
            } else {
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }
          }, 150); // Slightly longer delay for rendering stability
        }
      } else {
        // Full view scroll and highlight
        setTimeout(() => {
          const element = document.getElementById(rawHash) || document.getElementById(hash) || document.getElementById(normalizedHash);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
            highlightElement(element);
          }
        }, 150);
      }
    };

    const highlightElement = (el: HTMLElement) => {
      el.classList.add('hash-highlight');
      setTimeout(() => {
        el.classList.remove('hash-highlight');
      }, 1000); // Changed to 1 second as requested
    };

    // If no hash, and content just changed, default to first tab
    if (!window.location.hash && viewMode === 'tabs') {
      setActiveTabIndex(0);
    }

    handleNavigation();
    window.addEventListener('hashchange', handleNavigation);
    return () => window.removeEventListener('hashchange', handleNavigation);
  }, [content, sections, viewMode]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedImage(null);
        resetZoom();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  // Global mouse handlers for panning
  useEffect(() => {
    if (!isDragging) return;

    const onGlobalMouseMove = (e: MouseEvent) => {
      setOffset(prev => ({
        x: prev.x + e.movementX,
        y: prev.y + e.movementY
      }));
      dragDistanceRef.current += Math.abs(e.movementX) + Math.abs(e.movementY);
      resetFadeTimer();
    };

    const onGlobalMouseUp = () => {
      setIsDragging(false);
    };

    window.addEventListener('mousemove', onGlobalMouseMove);
    window.addEventListener('mouseup', onGlobalMouseUp);
    return () => {
      window.removeEventListener('mousemove', onGlobalMouseMove);
      window.removeEventListener('mouseup', onGlobalMouseUp);
    };
  }, [isDragging]);

  useEffect(() => {
    if (selectedImage && !isMouseOverInfo) {
      if (fadeTimerRef.current) clearTimeout(fadeTimerRef.current);
      fadeTimerRef.current = setTimeout(() => setIsInfoActive(false), 3000);
    }
    return () => { if (fadeTimerRef.current) clearTimeout(fadeTimerRef.current); };
  }, [selectedImage, isMouseOverInfo]);

  const resetFadeTimer = () => {
    setIsInfoActive(true);
    if (fadeTimerRef.current) clearTimeout(fadeTimerRef.current);
    if (!isMouseOverInfo) {
      fadeTimerRef.current = setTimeout(() => setIsInfoActive(false), 3000);
    }
  };

  const resetZoom = () => {
    setZoomLevel(1);
    setOffset({ x: 0, y: 0 });
    setTransformOrigin('center');
    setIsDragging(false);
    dragDistanceRef.current = 0;
  };

  const handleImageClick = (e: React.MouseEvent<HTMLImageElement>) => {
    // If we just finished a significant drag, don't trigger zoom
    if (dragDistanceRef.current > 10) {
      dragDistanceRef.current = 0;
      return;
    }

    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    setZoomLevel(prev => {
      const currentIndex = dynamicZoomSteps.indexOf(prev);
      const nextIndex = (currentIndex + 1) % dynamicZoomSteps.length;
      const nextZoom = dynamicZoomSteps[nextIndex];
      
      if (nextZoom === 1) {
        setOffset({ x: 0, y: 0 });
        setTransformOrigin('center');
      } else {
        // Only update origin if zooming in from 1x, otherwise keep it to prevent jumps
        if (prev === 1) {
          setTransformOrigin(`${x}% ${y}%`);
        }
      }
      return nextZoom;
    });
  };

  const onMouseDown = (e: React.MouseEvent) => {
    if (zoomLevel === 1) return;
    e.preventDefault(); // Prevent ghost image dragging
    setIsDragging(true);
    dragDistanceRef.current = 0;
  };

  const MarkdownComponents = {
    a: ({ node: _node, ...props }: any) => {
      let href = props.href || '';
      const isInternal = href && !href.startsWith('http') && !href.startsWith('mailto:');
      const isHashOnly = href.startsWith('#');

      if (isInternal && !isHashOnly) {
        href = decodeURIComponent(href);
        if (!href.startsWith('/')) href = '/' + href;
        
        // Ensure trailing slash for paths to match next.config.mjs trailingSlash: true
        // This prevents redirects that drop URL hashes.
        let [pathPart, hashPart] = href.split('#');
        // Normalize spaces to underscores in the path part to match canonical slugs
        pathPart = pathPart.replace(/ /g, '_');
        
        if (!pathPart.endsWith('/') && !pathPart.includes('.')) {
          href = pathPart + '/' + (hashPart ? '#' + hashPart : '');
        } else {
          href = pathPart + (hashPart ? '#' + hashPart : '');
        }
        
        return <Link href={href}>{props.children}</Link>;
      }
      
      return (
        <a 
          {...props} 
          target={!isInternal ? "_blank" : undefined} 
          rel={!isInternal ? "noopener noreferrer" : undefined} 
        />
      );
    },
    img: ({ node: _node, ...props }: any) => {
      let src = props.src || '';
      if (src && !src.startsWith('http') && !src.startsWith('data:') && !src.startsWith('/')) {
        src = '/images/' + src;
      }
      const isIcon = props.className?.includes('recipe-item-icon') || props.className?.includes('item-icon');
      return (
        <img 
          loading="lazy" 
          {...props} 
          src={src} 
          alt={props.alt || ''} 
          onClick={() => {
            if (!isIcon) {
              setSelectedImage({ src, alt: props.alt || '', title: props.title });
              setIsInfoActive(true);
              resetZoom();
            }
          }}
        />
      );
    },
    references: (props: any) => <div className="references" {...props} />,
    ref: (props: any) => <sup className="ref-tag" title="Reference">{props.children}</sup>,
    recipe: (props: any) => {
      const id = props.id || props.node?.properties?.id;
      return <><RecipeDisplay id={id} />{props.children}</>;
    },
    item: (props: any) => {
      const id = props.id || props.node?.properties?.id;
      const count = props.count || props.node?.properties?.count;
      return <ItemSlot itemId={id} count={count ? parseInt(count) : undefined} />;
    },
    gallery: (props: any) => (
      <Gallery 
        onImageClick={(src: string, alt: string) => {
          setSelectedImage({ src, alt });
          setIsInfoActive(true);
          resetZoom();
        }}
      >
        {props.children}
      </Gallery>
    ),
    details: (props: any) => <CollapsibleDetails {...props} />
  };

  return (
    <div className="article-body">
      {hasMultipleSections && (
        <div className={`view-toggle ${isReady ? 'ready' : ''}`}>
          <div className={`view-toggle-pill ${viewMode}`}></div>
          <button className={`view-toggle-btn ${viewMode === 'full' ? 'active' : ''}`} onClick={() => handleToggleView('full')}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="3" y1="9" x2="21" y2="9"></line><line x1="3" y1="15" x2="21" y2="15"></line><line x1="9" y1="3" x2="9" y2="21"></line><line x1="15" y1="3" x2="15" y2="21"></line></svg>
            Full View
          </button>
          <button className={`view-toggle-btn ${viewMode === 'tabs' ? 'active' : ''}`} onClick={() => handleToggleView('tabs')}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="3" y1="9" x2="21" y2="9"></line><line x1="9" y1="21" x2="9" y2="9"></line></svg>
            Tab View
          </button>
        </div>
      )}

      <div className={`view-mode-container ${isReady ? 'ready' : ''}`}>
        {viewMode === 'tabs' && hasMultipleSections ? (
          <div className="tabs-content-wrapper">
            <div className="tabs-container">
              {sections.map((s, idx) => (
                <button key={idx} className={`tab-btn ${activeTabIndex === idx ? 'active' : ''}`} onClick={() => setActiveTabIndex(idx)}>{s.title}</button>
              ))}
            </div>
            <div className="tab-content" key={activeTabIndex}>
              <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw, rehypeSlug]} components={MarkdownComponents as any}>{sections[activeTabIndex].content}</ReactMarkdown>
            </div>
          </div>
        ) : (
          <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw, rehypeSlug]} components={MarkdownComponents as any}>{content}</ReactMarkdown>
        )}
      </div>

      {selectedImage && (
        <div 
          className="lightbox-overlay" 
          onClick={() => { setSelectedImage(null); resetZoom(); }}
          onMouseMove={resetFadeTimer}
        >
          <div 
            className="lightbox-info" 
            style={{ 
              opacity: (isInfoActive || isMouseOverInfo) ? 1 : 0.1,
              pointerEvents: (isInfoActive || isMouseOverInfo) ? 'auto' : 'none'
            }}
            onClick={(e) => e.stopPropagation()}
            onMouseEnter={() => { setIsMouseOverInfo(true); setIsInfoActive(true); }}
            onMouseLeave={() => setIsMouseOverInfo(false)}
          >
            {selectedImage.title && <div className="lightbox-title">{selectedImage.title}</div>}
            {selectedImage.alt && (
              <><div className="info-label">Description</div><div className="lightbox-description">{selectedImage.alt}</div></>
            )}
            <div className="info-label">Filename</div>
            <div className="info-value">{selectedImage.src.split('/').pop()}</div>
            {imgDimensions && (
              <>
                <div className="info-label">Resolution</div>
                <div className="info-value">{imgDimensions.width} × {imgDimensions.height}</div>
                <div className="info-label">Current Zoom</div>
                <div className="info-value">{zoomLevel}x</div>
              </>
            )}
          </div>

          <div className="lightbox-content">
            <img 
              src={selectedImage.src} 
              alt={selectedImage.alt} 
              className={`lightbox-image ${isDragging ? 'dragging' : ''}`} 
              style={{ 
                transform: `translate(${offset.x}px, ${offset.y}px) scale(${zoomLevel})`,
                transformOrigin: transformOrigin,
                cursor: zoomLevel === 1 ? 'zoom-in' : (isDragging ? 'grabbing' : 'grab')
              }}
              onMouseDown={onMouseDown}
              onClick={(e) => { e.stopPropagation(); handleImageClick(e); }}
              onLoad={(e) => {
                const img = e.currentTarget;
                setImgDimensions({ width: img.naturalWidth, height: img.naturalHeight });
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
