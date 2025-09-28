// Fichier: kairn/frontend/src/app/(auth)/register/page.tsx

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';

export default function RegisterPage() {
  const router = useRouter();
  // const { register } = useAuth(); // Décommentez si vous gérez l'inscription via le contexte
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas.");
      return;
    }
    setIsLoading(true);
    setError(null);

    try {
      // Remplacez par votre logique d'appel à l'API
      // await register(email, password); 
      console.log("Inscription réussie (simulation)", { email, password });
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.message || "Une erreur est survenue lors de l'inscription.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center p-4">
      <div className="max-w-md w-full mx-auto">
        <h2 className="text-center text-3xl font-extrabold text-gray-900">
          Créez votre compte Kairn
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Déjà un compte ?{' '}
          <Link href="/login" className="font-medium text-blue-600 hover:text-blue-500">
            Connectez-vous
          </Link>
        </p>
      </div>

      <div className="max-w-md w-full mx-auto mt-8 bg-white p-8 border border-gray-200 rounded-lg shadow-md">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Adresse email
            </label>
            <div className="mt-1">
              <Input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                placeholder="nom@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Mot de passe
            </label>
            <div className="mt-1">
              <Input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="confirm-password"
              className="block text-sm font-medium text-gray-700"
            >
              Confirmez le mot de passe
            </label>
            <div className="mt-1">
              <Input
                id="confirm-password"
                name="confirm-password"
                type="password"
                autoComplete="new-password"
                required
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                disabled={isLoading}
              />
            </div>
          </div>

          {error && <p className="text-sm text-red-600 text-center">{error}</p>}

          <div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? 'Création en cours...' : "S'inscrire"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}