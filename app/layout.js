import './globals.css';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import Cursor from '../components/Cursor';
import ScrollReveal from '../components/ScrollReveal';

export const metadata = {
  title: 'Kasyif Gallery — Student Art Exhibition 2026',
  description: 'An online exhibition showcasing the creative works of MA Al Kasyif students.',
  openGraph: {
    title: 'Kasyif Gallery — Student Art Exhibition 2026',
    description: 'An online exhibition showcasing the creative works of MA Al Kasyif students.',
    url: 'https://al-kasyifgallery.42web.io/',
    siteName: 'Kasyif Gallery',
    locale: 'id_ID',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="id" data-theme="light">
      <body>
        <Cursor />
        <ScrollReveal />
        <Nav />
        {children}
        <Footer />
      </body>
    </html>
  );
}
