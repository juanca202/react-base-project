import type { Metadata } from 'next';
import { Lexend } from 'next/font/google';
import '@/theme/index.css';

const lexend = Lexend({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  display: 'swap'
});

export const metadata: Metadata = {
  title: {
    default: 'Banca demo',
    template: '%s · Banca demo'
  },
  description: 'Demostración de banca web (mocks)'
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={lexend.className}>{children}</body>
    </html>
  );
}
