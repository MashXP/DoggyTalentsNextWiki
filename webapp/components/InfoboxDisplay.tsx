'use client';

import React, { useState, useEffect } from 'react';
import { getAssetPath } from '@/lib/utils';

interface InfoboxRow {
  label: string;
  value: string;
}

interface InfoboxData {
  title: string;
  image?: string | string[] | null;
  rows: Record<string, string | number>[];
  description?: string | null;
}

interface InfoboxDisplayProps {
  defaultData?: InfoboxData;
  onImageClick?: (src: string, alt: string) => void;
}

const InfoboxDisplay: React.FC<InfoboxDisplayProps> = ({ defaultData, onImageClick }) => {
  const [isClient, setIsClient] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const images = React.useMemo(() => {
    if (!defaultData?.image) return [];
    return Array.isArray(defaultData.image) ? defaultData.image : [defaultData.image];
  }, [defaultData?.image]);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient && images.length > 1) {
      const interval = setInterval(() => {
        setCurrentImageIndex((prev) => (prev + 1) % images.length);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [isClient, images.length, currentImageIndex]);

  if (!isClient) return <div className="infobox-placeholder" style={{ minHeight: '200px' }} />;

  const data = defaultData;

  if (!data) {
    return (
      <div className="recipe-error">
        Infobox data not found in frontmatter.
      </div>
    );
  }

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <aside className="infobox glass">
      <div className="infobox-title">{data.title}</div>
      {images.length > 0 && (
        <div 
          className="infobox-image-wrapper"
          onClick={() => onImageClick?.(getAssetPath(`/images/${images[currentImageIndex]}`), data.title)}
          style={{ cursor: onImageClick ? 'zoom-in' : 'default' }}
        >
          <img
            src={getAssetPath(`/images/${images[currentImageIndex]}`)}
            alt={data.title}
            className="infobox-image"
          />
          {images.length > 1 && (
            <>
              <button className="infobox-nav prev" onClick={prevImage} aria-label="Previous image">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="15 18 9 12 15 6"></polyline>
                </svg>
              </button>
              <button className="infobox-nav next" onClick={nextImage} aria-label="Next image">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
              </button>
              <div className="infobox-dots-container">
                <div 
                  className="infobox-image-dots"
                  style={{ 
                    transform: `translateX(${50 - (currentImageIndex * 12 + 3)}px)`,
                  }}
                >
                  {images.map((_, idx) => {
                    const distance = Math.abs(idx - currentImageIndex);
                    const scale = Math.max(0.4, 1 - distance * 0.2);
                    const opacity = Math.max(0.2, 1 - distance * 0.3);
                    
                    return (
                      <span 
                        key={idx} 
                        className={`dot ${idx === currentImageIndex ? 'active' : ''}`}
                        style={{ 
                          transform: `scale(${scale})`,
                          opacity: opacity
                        }}
                        onClick={() => setCurrentImageIndex(idx)}
                      />
                    );
                  })}
                </div>
              </div>
            </>
          )}
        </div>
      )}
      <div className="infobox-content">
        {data.rows.map((rowObj, idx) => {
          const [label, value] = Object.entries(rowObj)[0];
          let displayValue: React.ReactNode = String(value);
          let isNo = false;

          if (label.toLowerCase() === 'stackable') {
            const num = parseInt(String(value));
            if (num === 0 || num === 1 || String(value).toLowerCase() === 'no') {
              isNo = true;
              displayValue = (
                <span className="no-stackable">
                  No <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: '4px', color: '#ff4444' }}><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                </span>
              );
            }
          }

          return (
            <div key={idx} className="infobox-row">
              <b>{label}</b>
              <span dangerouslySetInnerHTML={isNo ? undefined : { __html: String(value) }}>
                {isNo ? displayValue : null}
              </span>
            </div>
          );
        })}
      </div>
      {data.description && (
        <div className="infobox-description" dangerouslySetInnerHTML={{ __html: data.description }} />
      )}
    </aside>
  );
};

export default InfoboxDisplay;
