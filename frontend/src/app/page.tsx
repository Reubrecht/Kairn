// Fichier: kairn/frontend/src/app/dashboard/page.tsx
'use client';

import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getProfile } from '@/lib/api';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

// Le type Profile pour typer nos données. Il correspond au schéma Pydantic `Profile`.
type Profile = {
  weight: number | null;
  height: number | null;
  gender: string | null;
  birthdate: string | null;
  hr_max_manual: number | null;
};

export default function DashboardPage() {
  const { isAuthenticated, isLoading: isAuthLoading, token } = useAuth();
  const router = useRouter();

  // États locaux pour le profil et le chargement des données
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isLoadingProfile, setIsLoadingProfile] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Si l'authentification est en cours, on ne fait rien.
    if (isAuthLoading) {
      return;
    }
    // Si l'utilisateur n'est pas authentifié, on le redirige.
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }
    // Si on a un token, on va chercher les données du profil.
    if (token) {
      const fetchProfile = async () => {
        try {
          setIsLoadingProfile(true);
          const profileData = await getProfile(token);
          setProfile(profileData);
        } catch (err: any) {
          setError('Impossible de charger le profil. ' + err.message);
        } finally {
          setIsLoadingProfile(false);
        }
      };

      fetchProfile();
    }
  }, [isAuthenticated, isAuthLoading, token, router]);

  // Affiche un état de chargement tant que l'authentification ou le profil ne sont pas prêts.
  if (isAuthLoading || isLoadingProfile) {
    return (
      <div className="flex h-[calc(100vh-8rem)] items-center justify-center">
        <p className="text-gray-500 dark:text-gray-400">Chargement du profil...</p>
      </div>
    );
  }

  // Affiche une erreur si le chargement a échoué.
  if (error) {
     return <div className="text-red-500 text-center">{error}</div>;
  }

  // Affiche le tableau de bord une fois les données chargées.
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Mon Profil</h1>
        <Button>Modifier le profil</Button>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Informations Générales</CardTitle>
          <CardDescription>Vos données anthropométriques et personnelles.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2">
          <div className="flex items-center justify-between border-b pb-2">
            <span className="text-muted-foreground">Poids</span>
            <span className="font-medium">{profile?.weight ? `${profile.weight} kg` : 'Non renseigné'}</span>
          </div>
          <div className="flex items-center justify-between border-b pb-2">
            <span className="text-muted-foreground">Taille</span>
            <span className="font-medium">{profile?.height ? `${profile.height} cm` : 'Non renseigné'}</span>
          </div>
          <div className="flex items-center justify-between border-b pb-2">
            <span className="text-muted-foreground">Sexe</span>
            <span className="font-medium">{profile?.gender || 'Non renseigné'}</span>
          </div>
          <div className="flex items-center justify-between border-b pb-2">
            <span className="text-muted-foreground">Date de naissance</span>
            <span className="font-medium">{profile?.birthdate || 'Non renseigné'}</span>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Marqueurs Physiologiques</CardTitle>
          <CardDescription>Vos données de performance clés.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2">
           <div className="flex items-center justify-between border-b pb-2">
            <span className="text-muted-foreground">Fréquence Cardiaque Maximale</span>
            <span className="font-medium">{profile?.hr_max_manual ? `${profile.hr_max_manual} bpm` : 'Non renseigné'}</span>
          </div>
          {/* D'autres marqueurs pourront être ajoutés ici */}
        </CardContent>
      </Card>
    </div>
  );
}