import { getPageBySlug } from '@/lib/wiki';
import MarkdownRenderer from '@/components/MarkdownRenderer';
import { notFound } from 'next/navigation';

export default async function HomePage() {
  const pageContent = getPageBySlug('Doggy_Talents_Next_Wiki'); // the main wiki homepage

  if (!pageContent) {
    notFound();
  }

  return (
    <article>
      <header className="article-header glass" style={{ padding: '2rem', borderRadius: '12px' }}>
        <h1>{pageContent.title}</h1>
      </header>
      <div style={{ marginTop: '2rem' }}>
        <MarkdownRenderer content={pageContent.content} />
      </div>
    </article>
  );
}
