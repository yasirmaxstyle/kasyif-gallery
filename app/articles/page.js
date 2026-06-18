import { getCMSData } from '../../lib/data';
import ArticleGallery from '../../components/ArticleGallery';

export const metadata = {
  title: 'Articles — Kasyif Gallery',
  description: 'Read articles and reflections from MA Al Kasyif students about art, creativity, and the creative process.',
};

export default function ArticlesPage() {
  const { articles } = getCMSData();

  return (
    <main>
      <section className="page-header" aria-label="Page title">
        <span className="eyebrow reveal">Student Voices</span>
        <h1 className="page-title reveal">The <em>Articles</em></h1>
        <p className="page-sub reveal">Reflections, essays, and thoughts on creativity, process, and art — written by the artists themselves.</p>
      </section>

      <ArticleGallery articles={articles} />
    </main>
  );
}
