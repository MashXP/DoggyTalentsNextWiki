'use client';

import React, { useState, useEffect } from 'react';
import { getAssetPath } from '@/lib/utils';

interface InfoboxRow {
  label: string;
  value: string;
}

interface InfoboxData {
  title: string;
  image?: string | null;
  rows: Record<string, string | number>[];
  description?: string | null;
}

interface InfoboxDisplayProps {
  defaultData?: InfoboxData;
}

const InfoboxDisplay: React.FC<InfoboxDisplayProps> = ({ defaultData }) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return <div className="infobox-placeholder" style={{ minHeight: '200px' }} />;

  const data = defaultData;

  if (!data) {
    return (
      <div className="recipe-error">
        Infobox data not found in frontmatter.
      </div>
    );
  }

  return (
    <aside className="infobox glass">
      <div className="infobox-title">{data.title}</div>
      {data.image && (
        <div className="infobox-image-wrapper">
          <img
            src={getAssetPath(`/images/${data.image}`)}
            alt={data.title}
            className="infobox-image"
          />
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
