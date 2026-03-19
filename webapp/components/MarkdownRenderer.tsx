'use client';

import { useState, useMemo, useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import Link from 'next/link';

import RecipeDisplay from './RecipeDisplay';
import { ItemSlot } from './CraftingGrid';

interface Section {
  title: string;
  content: string;
}

function splitByH2(content: string): Section[] {
  const sections: Section[] = [];
  const lines = content.split('\n');
  let currentTitle = 'Overview';
  let currentContent: string[] = [];

  lines.forEach(line => {
    if (line.startsWith('## ') && !line.startsWith('### ')) {
      if (currentContent.length > 0 || sections.length === 0) {
        sections.push({ title: currentTitle, content: currentContent.join('\n') });
      }
      currentTitle = line.replace('## ', '').trim();
      currentContent = [line];
    } else {
      currentContent.push(line);
    }
  });

  if (currentContent.length > 0 || sections.length === 0) {
    sections.push({ title: currentTitle, content: currentContent.join('\n') });
  }

  return sections;
}

export default function MarkdownRenderer({ content }: { content: string }) {
  const [viewMode, setViewMode] = useState<'full' | 'tabs'>('full');
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
    const savedMode = localStorage.getItem('wiki_view_mode');
    if (savedMode === 'full' || savedMode === 'tabs') setViewMode(savedMode);
  }, []);

  const handleToggleView = (mode: 'full' | 'tabs') => {
    setViewMode(mode);
    localStorage.setItem('wiki_view_mode', mode);
  };

  const sections = useMemo(() => splitByH2(content), [content]);
  const hasMultipleSections = sections.length > 1;

  useEffect(() => setActiveTabIndex(0), [content]);

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
      if (href && !href.startsWith('http') && !href.startsWith('mailto:') && !href.startsWith('#')) {
        href = decodeURIComponent(href);
        if (!href.startsWith('/')) href = '/' + href;
        return <Link href={href}>{props.children}</Link>;
      }
      return <a target="_blank" rel="noopener noreferrer" {...props} />;
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
    }
  };

  return (
    <div className="article-body">
      {hasMultipleSections && (
        <div className="view-toggle">
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

      {viewMode === 'tabs' && hasMultipleSections ? (
        <div className="tabs-content-wrapper">
          <div className="tabs-container">
            {sections.map((s, idx) => (
              <button key={idx} className={`tab-btn ${activeTabIndex === idx ? 'active' : ''}`} onClick={() => setActiveTabIndex(idx)}>{s.title}</button>
            ))}
          </div>
          <div className="tab-content" key={activeTabIndex}>
            <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]} components={MarkdownComponents as any}>{sections[activeTabIndex].content}</ReactMarkdown>
          </div>
        </div>
      ) : (
        <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]} components={MarkdownComponents as any}>{content}</ReactMarkdown>
      )}

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
