import type { Metadata } from 'next';
import { Lexend } from 'next/font/google';

import '../theme/index.css';

const lexend = Lexend({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-lexend'
});

export const metadata: Metadata = {
  title: 'Home',
  description: 'Main page'
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={lexend.variable}>
      <body className={`${lexend.className} antialiased`}>{children}</body>
    </html>
  );
}
