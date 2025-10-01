// Fichier: kairn/frontend/src/app/dashboard/page.tsx
'use client';

import { useAuth } from '@/context/AuthContext';
import { getProfile } from '@/lib/api';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

// Définition d'un type pour le profil utilisateur
interface UserProfile {
  email: string;
  id: number;
  is_active: boolean;
  is_superuser: boolean;
  is_verified: boolean;
}

export default function DashboardPage() {
  const { isAuthenticated, isLoading, token } = useAuth();
  const router = useRouter();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Redirection si l'utilisateur n'est pas authentifié
    if (!isLoading && !isAuthenticated) {
      router.push('/login');
    }

    // Récupération du profil si le token est disponible
    if (token) {
      getProfile(token)
        .then(data => setProfile(data))
        .catch(err => {
          console.error("Erreur lors de la récupération du profil:", err);
          setError("Impossible de charger le profil utilisateur.");
        });
    }
  }, [isAuthenticated, isLoading, router, token]);

  // Affiche un état de chargement
  if (isLoading || !profile) {
    return (
      <div className="flex h-[calc(100vh-4rem)] items-center justify-center">
        <p className="text-gray-500 dark:text-gray-400">Chargement du profil...</p>
      </div>
    );
  }

  // Affiche une erreur si la récupération du profil a échoué
  if (error) {
    return (
      <div className="flex h-[calc(100vh-4rem)] items-center justify-center">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  // Contenu du tableau de bord une fois le profil chargé
  return (
    <main className="flex-1">
      <div className="container py-8">
        <div className="flex items-center justify-between space-y-2">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Tableau de Bord</h1>
            {profile && <p className="text-gray-500">Bienvenue, {profile.email} !</p>}
          </div>
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
              <li>- Session d&apos;entraînement enregistrée</li>
              <li>- Record personnel battu</li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
}