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

  // Affiche un état de chargement plus centré
  if (isLoading || !isAuthenticated) {
    return (
      <div className="flex h-[calc(100vh-4rem)] items-center justify-center">
        <p className="text-gray-500 dark:text-gray-400">Chargement...</p>
      </div>
    );
  }

  // Si l'utilisateur est authentifié, on affiche le contenu du tableau de bord
  return (
    <main className="flex-1">
      <div className="container py-8">
        <div className="flex items-center justify-between space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Tableau de Bord</h1>
        </div>
        <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Carte 1 */}
          <div className="rounded-xl border bg-white p-6 shadow-sm dark:bg-gray-900 dark:border-gray-800">
            <h3 className="text-lg font-semibold">Statistique Clé 1</h3>
            <p className="mt-4 text-4xl font-bold">1,234</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">+5% vs le mois dernier</p>
          </div>
          {/* Carte 2 */}
          <div className="rounded-xl border bg-white p-6 shadow-sm dark:bg-gray-900 dark:border-gray-800">
            <h3 className="text-lg font-semibold">Statistique Clé 2</h3>
            <p className="mt-4 text-4xl font-bold">56%</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Objectif atteint</p>
          </div>
          {/* Carte 3 */}
          <div className="rounded-xl border bg-white p-6 shadow-sm dark:bg-gray-900 dark:border-gray-800">
            <h3 className="text-lg font-semibold">Activité Récente</h3>
            <ul className="mt-4 space-y-2 text-sm text-gray-600 dark:text-gray-300">
              <li>- Nouvel athlète ajouté</li>
              <li>- Session d'entraînement enregistrée</li>
              <li>- Record personnel battu</li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
}