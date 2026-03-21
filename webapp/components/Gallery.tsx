'use client';

import { useState, useCallback } from 'react';
import { getAssetPath } from '@/lib/utils';

interface GalleryProps {
  children?: React.ReactNode;
  onImageClick: (src: string, alt: string) => void;
  defaultData?: any[];
}

export default function Gallery({ children, onImageClick, defaultData }: GalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  // Extract text content from children
  const getTextContent = (node: React.ReactNode): string => {
    if (!node) return '';
    if (typeof node === 'string' || typeof node === 'number') return node.toString();
    if (Array.isArray(node)) return node.map(getTextContent).join('');
    if (typeof node === 'object' && 'props' in node) {
      return getTextContent((node as any).props.children);
    }
    return '';
  };

  const processItems = () => {
    if (defaultData && Array.isArray(defaultData)) {
      return defaultData.map((item: any) => {
        let filename = '';
        let caption = '';

        if (typeof item === 'string') {
          const [filePart, cap] = item.split('|');
          filename = filePart.replace(/File:/i, '').trim();
          caption = cap?.trim() || '';
        } else if (typeof item === 'object') {
          filename = (item.image || item.file || '').replace(/File:/i, '').trim();
          caption = item.caption || '';
        }

        let src = filename;
        if (src && !src.startsWith('http') && !src.startsWith('data:') && !src.startsWith('/')) {
          const normalizedFilename = filename.toLowerCase().replace(/\s+/g, '_');
          src = '/images/' + normalizedFilename;
        }
        src = getAssetPath(src);

        return { src, caption };
      });
    }

    const content = getTextContent(children);
    const lines = content.split('\n').filter((l) => l.trim() !== '');
    
    return lines.map((line) => {
      const [filePart, caption] = line.split('|');
      let filename = filePart.replace(/File:/i, '').trim();
      
      let src = filename;
      if (src && !src.startsWith('http') && !src.startsWith('data:') && !src.startsWith('/')) {
        const normalizedFilename = filename.toLowerCase().replace(/\s+/g, '_');
        src = '/images/' + normalizedFilename;
      }
      src = getAssetPath(src);
      
      return { src, caption: caption?.trim() || '' };
    });
  };

  const items = processItems();

  const nextImage = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % items.length);
  }, [items.length]);

  const prevImage = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + items.length) % items.length);
  }, [items.length]);

  if (items.length === 0) return null;

  const currentItem = items[activeIndex];

  return (
    <div className="gallery-carousel">
      <div className="carousel-main">
        {items.length > 1 && (
          <button className="carousel-nav prev" onClick={prevImage} aria-label="Previous image">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </button>
        )}
        
        <div className="carousel-image-container" onClick={() => onImageClick(currentItem.src, currentItem.caption)}>
          <img 
            key={activeIndex} // Key forces animation/re-render for new images
            src={currentItem.src} 
            alt={currentItem.caption} 
            className="carousel-image"
          />
        </div>

        {items.length > 1 && (
          <button className="carousel-nav next" onClick={nextImage} aria-label="Next image">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>
        )}
      </div>

      <div className="carousel-info">
        {currentItem.caption && <div className="carousel-caption">{currentItem.caption}</div>}
        {items.length > 1 && (
          <div className="carousel-counter">
            Image {activeIndex + 1} of {items.length}
          </div>
        )}
      </div>

      {items.length > 1 && (
        <div className="carousel-thumbnails">
          {items.map((item, idx) => (
            <div 
              key={idx} 
              className={`thumbnail ${idx === activeIndex ? 'active' : ''}`}
              onClick={() => setActiveIndex(idx)}
            >
              <img src={item.src} alt={`Thumbnail ${idx + 1}`} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
