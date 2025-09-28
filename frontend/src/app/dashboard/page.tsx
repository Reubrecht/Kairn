// Fichier: kairn/frontend/src/app/dashboard/page.tsx
'use client';

import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function DashboardPage() {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Si le chargement est terminé et que l'utilisateur n'est pas authentifié,
    // on le redirige vers la page de connexion.
    if (!isLoading && !isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, isLoading, router]);

  // Affiche un état de chargement pendant la vérification de l'authentification
  if (isLoading) {
    return <div className="text-center p-10">Chargement...</div>;
  }

  // Si l'utilisateur est authentifié, on affiche le contenu du tableau de bord
  return (
    isAuthenticated && (
      <div className="container mx-auto p-8">
        <h1 className="text-4xl font-bold">Bienvenue sur votre Tableau de Bord</h1>
        <p className="mt-4">C'est ici que la magie opère.</p>
        {/* C'est ici que nous ajouterons les composants de visualisation de données */}
      </div>
    )
  );
}
