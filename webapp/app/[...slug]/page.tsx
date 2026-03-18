import { getPageBySlug, getAllPageSlugs } from '@/lib/wiki';
import MarkdownRenderer from '@/components/MarkdownRenderer';
import { notFound, redirect } from 'next/navigation';

export const dynamicParams = false;

export async function generateStaticParams() {
  const slugs = getAllPageSlugs();
  
  return slugs.map((slug) => ({
    slug: slug.split('/'),
  }));
}

export default async function WikiPage({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const resolvedParams = await params;
  const slugJoined = resolvedParams.slug.join('/');
  const pageContent = getPageBySlug(slugJoined);

  if (!pageContent) {
    notFound();
  }

  // Redirect to canonical hierarchical URL if flat URL was used
  if (pageContent.slug !== slugJoined) {
    redirect(`/${pageContent.slug}`);
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
