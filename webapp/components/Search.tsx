'use client';

import { useState, useEffect, useRef } from 'react';
import Fuse from 'fuse.js';
import Link from 'next/link';
import { SearchItem } from '@/lib/wiki';

interface SearchProps {
  data: SearchItem[];
}

export default function Search({ data }: SearchProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);

  const fuse = new Fuse(data, {
    keys: [
      { name: 'title', weight: 1 },
      { name: 'content', weight: 0.3 }
    ],
    threshold: 0.3,
    includeMatches: true,
  });

  useEffect(() => {
    if (query.length > 1) {
      const searchResults = fuse.search(query).map(r => r.item).slice(0, 8);
      setResults(searchResults);
      setIsOpen(true);
      setActiveIndex(-1);
    } else {
      setResults([]);
      setIsOpen(false);
    }
  }, [query]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex(prev => (prev < results.length - 1 ? prev + 1 : prev));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex(prev => (prev > 0 ? prev - 1 : prev));
    } else if (e.key === 'Enter' && activeIndex >= 0) {
      e.preventDefault();
      const target = results[activeIndex];
      window.location.href = `/${target.slug}`;
    } else if (e.key === 'Escape') {
      setIsOpen(false);
    }
  };

  return (
    <div className="search-container" ref={containerRef}>
      <div className="search-input-wrapper">
        <span className="search-icon">🔍</span>
        <input
          type="text"
          placeholder="Search wiki..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => query.length > 1 && setIsOpen(true)}
          className="search-input"
        />
      </div>

      {isOpen && results.length > 0 && (
        <div className="search-results glass-card">
          {results.map((result, index) => (
            <Link
              key={result.slug}
              href={`/${result.slug}`}
              className={`search-result-item ${index === activeIndex ? 'active' : ''}`}
              onClick={() => {
                setQuery('');
                setIsOpen(false);
              }}
            >
              <div className="search-result-title">{result.title}</div>
              {result.content && (
                <div className="search-result-snippet">
                  {result.content.length > 100 ? `${result.content.slice(0, 100)}...` : result.content}
                </div>
              )}
              {result.category && (
                <div className="search-result-category">{result.category}</div>
              )}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
