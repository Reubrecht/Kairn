// Fichier: kairn/frontend/src/app/layout.tsx
import type { Metadata } from 'next';
import { GeistSans } from 'geist/font/sans';
import './globals.css';
import { Navbar } from '@/components/layout/Navbar';
import { AuthProvider } from '@/context/AuthContext'; // Importer le Provider

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
      <body>
        {/* Envelopper toute l'application avec le AuthProvider */}
        <AuthProvider>
          <Navbar />
          <main>{children}</main>
        </AuthProvider>
      </body>
    </html>
  );
}
