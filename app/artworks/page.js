import { getCMSData } from '../../lib/data';
import ArtworkGallery from '../../components/ArtworkGallery';

export const metadata = {
  title: 'Artworks — Kasyif Gallery',
  description: 'Browse all student artworks from the MA Al Kasyif 2026 exhibition.',
};

export default function ArtworksPage() {
  const { artworks } = getCMSData();

  return (
    <main>
      <section className="page-header" aria-label="Page title">
        <span className="eyebrow reveal">Collection 2026</span>
        <h1 className="page-title reveal">The <em>Artworks</em></h1>
        <p className="page-sub reveal">Click any work to discover the story behind the art — the artist, the process, the vision.</p>
      </section>

      <ArtworkGallery artworks={artworks} />
    </main>
  );
}
