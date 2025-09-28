// Fichier: kairn/frontend/src/app/(auth)/login/page.tsx

'use client';

import { SetStateAction, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccess(null);

    try {
      await login(email, password);
      setSuccess('Connexion réussie ! Redirection...');
      // Redirige vers le tableau de bord avec un indicateur de succès
      router.push('/dashboard?loggedin=true');
    } catch (err: any) {
      setError(err.message || 'Une erreur est survenue lors de la connexion.');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center p-4">
      <div className="max-w-md w-full mx-auto">
        <h2 className="text-center text-3xl font-extrabold text-gray-900">
          Se connecter à Kairn
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Pas encore de compte ?{' '}
          <Link href="/register" className="font-medium text-blue-600 hover:text-blue-500">
            Inscrivez-vous
          </Link>
        </p>
      </div>
      <div className="max-w-md w-full mx-auto mt-8 bg-white p-8 border border-gray-200 rounded-lg shadow-md">
        <form className="space-y-6" onSubmit={handleSubmit}>
          {error && <p className="text-sm text-red-600 text-center p-3 bg-red-50 rounded-md">{error}</p>}
          {success && <p className="text-sm text-green-600 text-center p-3 bg-green-50 rounded-md">{success}</p>}
          
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
                onChange={(e: { target: { value: SetStateAction<string>; }; }) => setEmail(e.target.value)}
                disabled={isLoading}
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="password"
              className="text-sm font-medium text-gray-700"
            >
              Mot de passe
            </label>
            <div className="mt-1">
              <Input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e: { target: { value: SetStateAction<string>; }; }) => setPassword(e.target.value)}
                disabled={isLoading}
              />
            </div>
          </div>

          <div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? 'Connexion en cours...' : 'Connexion'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}