// Fichier: kairn/frontend/src/app/layout.tsx
import type { Metadata } from 'next';
import { GeistSans } from 'geist/font/sans';
import './globals.css';
import { Navbar } from '@/components/layout/Navbar';
import { AuthProvider } from '@/context/AuthContext'; // Le "cerveau" de l'authentification

// Métadonnées pour le référencement et l'affichage dans le navigateur
export const metadata: Metadata = {
  title: "Kairn - Plateforme de Profilage pour Athlètes",
  description: "Votre plateforme pour l'analyse, la prédiction de performance et la gestion de l'entraînement.",
};

/**
 * C'est le Layout Racine de toute l'application.
 * Il combine le meilleur des deux approches :
 * 1.  Une structure de base (<html>, <body>) comme dans une application web classique.
 * 2.  Un Provider global (`AuthProvider`) qui rend l'état de connexion disponible
 * partout, remplaçant le simple `isLoggedIn` de ton fichier App (1).tsx.
 * 3.  Une barre de navigation (`Navbar`) présente sur toutes les pages.
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={GeistSans.className}>
      <body>
        {/*
          AuthProvider enveloppe TOUT. C'est lui qui sait si l'utilisateur est connecté
          et qui fournit les fonctions login/logout aux autres composants.
          C'est la version robuste de ton `const [isLoggedIn, setIsLoggedIn] = useState(true);`
        */}
        <AuthProvider>
          {/* La Navbar est ici pour être affichée sur toutes les pages */}
          <Navbar />
          {/* 'children' représente la page active (ex: dashboard, login, etc.) */}
          <main className="container mx-auto p-4 sm:p-8">
            {children}
          </main>
        </AuthProvider>
      </body>
    </html>
  );
}