// Fichier: kairn/frontend/src/app/layout.tsx
import type { Metadata } from 'next';
import { GeistSans } from 'geist/font/sans';
import './globals.css';
import { Navbar } from '@/components/layout/Navbar';

export const metadata: Metadata = {
  title: "Kairn - Profilage d'Athlètes",
  description: 'Votre plateforme de suivi de performance.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={GeistSans.className}>
      <body className="bg-gray-50">
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}