'use client';

import { useState, useMemo, useEffect } from 'react';
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
    // Check if line is an H2 heading (starting with ## but not ###)
    if (line.startsWith('## ') && !line.startsWith('### ')) {
      // Save current section
      if (currentContent.length > 0 || sections.length === 0) {
        sections.push({ title: currentTitle, content: currentContent.join('\n') });
      }
      // Start new section
      currentTitle = line.replace('## ', '').trim();
      currentContent = [line]; // Include the heading line itself
    } else {
      currentContent.push(line);
    }
  });

  // Save the last section
  if (currentContent.length > 0 || sections.length === 0) {
    sections.push({ title: currentTitle, content: currentContent.join('\n') });
  }

  return sections;
}

const MarkdownComponents = {
  a: ({ node: _node, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement> & { node?: unknown }) => {
    let href = (props.href as string) || '';
    if (href && !href.startsWith('http') && !href.startsWith('mailto:') && !href.startsWith('#')) {
      href = decodeURIComponent(href);
      if (!href.startsWith('/')) {
        href = '/' + href;
      }
      return <Link href={href}>{props.children}</Link>;
    }
    return <a target="_blank" rel="noopener noreferrer" {...props} />;
  },
  img: ({ node: _node, ...props }: React.ImgHTMLAttributes<HTMLImageElement> & { node?: unknown }) => {
    let src = (props.src as string) || '';
    if (src && !src.startsWith('http') && !src.startsWith('data:') && !src.startsWith('/')) {
      src = '/images/' + src;
    }
    return <img loading="lazy" {...props} src={src} alt={props.alt || ''} />;
  },
  references: ({ node: _node, ...props }: React.HTMLAttributes<HTMLDivElement> & { node?: unknown }) => <div className="references" {...props} />,
  ref: ({ node: _node, ...props }: React.HTMLAttributes<HTMLElement> & { node?: unknown }) => (
    <sup className="ref-tag" title="Reference">
      {props.children}
    </sup>
  ),
  recipe: (props: any) => {
    const id = props.id || props.node?.properties?.id;
    return (
      <>
        <RecipeDisplay id={id} />
        {props.children}
      </>
    );
  },
  item: (props: any) => {
    const id = props.id || props.node?.properties?.id;
    return <ItemSlot itemId={id} />;
  }
};

export default function MarkdownRenderer({ content }: { content: string }) {
  const [viewMode, setViewMode] = useState<'full' | 'tabs'>('full');
  const [activeTabIndex, setActiveTabIndex] = useState(0);

  // Load preference from localStorage on mount
  useEffect(() => {
    const savedMode = localStorage.getItem('wiki_view_mode');
    if (savedMode === 'full' || savedMode === 'tabs') {
      setViewMode(savedMode);
    }
  }, []);

  // Update localStorage when viewMode changes
  const handleToggleView = (mode: 'full' | 'tabs') => {
    setViewMode(mode);
    localStorage.setItem('wiki_view_mode', mode);
  };

  const sections = useMemo(() => splitByH2(content), [content]);
  const hasMultipleSections = sections.length > 1;

  // Reset active tab when content changes (different page)
  useEffect(() => {
    setActiveTabIndex(0);
  }, [content]);

  return (
    <div className="article-body">
      {hasMultipleSections && (
        <div className="view-toggle">
          <button
            className={`view-toggle-btn ${viewMode === 'full' ? 'active' : ''}`}
            onClick={() => handleToggleView('full')}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="3" y1="9" x2="21" y2="9"></line><line x1="3" y1="15" x2="21" y2="15"></line><line x1="9" y1="3" x2="9" y2="21"></line><line x1="15" y1="3" x2="15" y2="21"></line></svg>
            Full View
          </button>
          <button
            className={`view-toggle-btn ${viewMode === 'tabs' ? 'active' : ''}`}
            onClick={() => handleToggleView('tabs')}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="3" y1="9" x2="21" y2="9"></line><line x1="9" y1="21" x2="9" y2="9"></line></svg>
            Tab View
          </button>
        </div>
      )}

      {viewMode === 'tabs' && hasMultipleSections ? (
        <div className="tabs-content-wrapper">
          <div className="tabs-container">
            {sections.map((section, idx) => (
              <button
                key={idx}
                className={`tab-btn ${activeTabIndex === idx ? 'active' : ''}`}
                onClick={() => setActiveTabIndex(idx)}
              >
                {section.title}
              </button>
            ))}
          </div>
          <div className="tab-content" key={activeTabIndex}>
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeRaw]}
              components={MarkdownComponents as any}
            >
              {sections[activeTabIndex].content}
            </ReactMarkdown>
          </div>
        </div>
      ) : (
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeRaw]}
          components={MarkdownComponents as any}
        >
          {content}
        </ReactMarkdown>
      )}
    </div>
  );
}
