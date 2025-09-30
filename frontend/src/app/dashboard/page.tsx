// Fichier: kairn/frontend/src/app/dashboard/page.tsx
'use client';

import { useAuth } from '@/context/AuthContext';
import { getProfile } from '@/lib/api';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

// Interface pour typer les données du profil
interface ProfileData {
    weight?: number;
    height?: number;
    gender?: string;
    birthdate?: string;
    // Ajoutez d'autres champs de votre modèle de profil ici
}

export default function DashboardPage() {
  const { isAuthenticated, isLoading: isAuthLoading, token } = useAuth();
  const router = useRouter();
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Si l'authentification est terminée et que l'utilisateur n'est pas connecté, rediriger
    if (!isAuthLoading && !isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, isAuthLoading, router]);

  useEffect(() => {
    // Si l'utilisateur est authentifié et que nous avons un token, récupérer le profil
    if (isAuthenticated && token) {
      const fetchProfile = async () => {
        try {
          setIsLoading(true);
          const profileData = await getProfile(token);
          setProfile(profileData);
        } catch (err: any) {
          setError(err.message || 'Impossible de charger le profil.');
        } finally {
          setIsLoading(false);
        }
      };
      fetchProfile();
    }
  }, [isAuthenticated, token]);

  // Affiche un état de chargement global
  if (isAuthLoading || isLoading) {
    return <div className="text-center p-10">Chargement...</div>;
  }
  
  // Si l'utilisateur n'est pas authentifié, ne rien afficher (la redirection va s'opérer)
  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-bold">Bienvenue sur votre Tableau de Bord</h1>
      {error && <p className="mt-4 text-red-500">{error}</p>}
      
      {profile ? (
        <div className="mt-6 bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold">Votre Profil</h2>
            <ul className="mt-4 space-y-2">
                <li><strong>Poids:</strong> {profile.weight || 'Non renseigné'} kg</li>
                <li><strong>Taille:</strong> {profile.height || 'Non renseigné'} cm</li>
                <li><strong>Sexe:</strong> {profile.gender || 'Non renseigné'}</li>
                <li><strong>Date de naissance:</strong> {profile.birthdate || 'Non renseignée'}</li>
            </ul>
        </div>
      ) : (
        <p className="mt-4">Aucune donnée de profil trouvée.</p>
      )}
    </div>
  );
}

