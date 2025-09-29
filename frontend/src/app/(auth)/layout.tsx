import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

// Ce composant de mise en page est partagé par les pages de connexion et d'inscription.
export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex flex-col justify-center items-center p-4">
      <div className="w-full max-w-md">
        {/* Logo cliquable qui redirige vers la page d'accueil */}
        <div className="flex justify-center mb-6">
          <Link href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
            <Image
              src="/kairn_logo.png"
              alt="Kairn Logo"
              width={80} // Taille ajustée pour un look plus épuré
              height={80}
              priority // Charger l'image prioritairement
            />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              Kairn
            </span>
          </Link>
        </div>

        {/* Conteneur principal pour le contenu du formulaire (connexion ou inscription) */}
        <main className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg p-6 sm:p-8">
          {children}
        </main>

        {/* Pied de page optionnel */}
        <footer className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
          <p>&copy; {new Date().getFullYear()} Kairn. Tous droits réservés.</p>
        </footer>
      </div>
    </div>
  );
}