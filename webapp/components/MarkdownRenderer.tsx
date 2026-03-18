import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import Link from 'next/link';

import RecipeDisplay from './RecipeDisplay';

export default function MarkdownRenderer({ content }: { content: string }) {
  return (
    <div className="article-body">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
        components={{
          a: ({ node: _node, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement> & { node?: unknown }) => {
            let href = (props.href as string) || '';
            // Handle internal wiki links
            if (href && !href.startsWith('http') && !href.startsWith('mailto:') && !href.startsWith('#')) {
              // Keep underscores, just decode
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
            // If the src does not start with http or root slash, assume it's a wiki image
            if (src && !src.startsWith('http') && !src.startsWith('data:') && !src.startsWith('/')) {
              src = '/images/' + src;
            }
            return <img loading="lazy" {...props} src={src} alt={props.alt || ''} />;
          },
          // Handle custom MediaWiki tags that made it through Pandoc
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
          }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } as any}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
