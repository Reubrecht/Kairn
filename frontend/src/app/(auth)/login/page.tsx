// Fichier: kairn/frontend/src/app/(auth)/login/page.tsx
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center">
      <div className="max-w-md w-full mx-auto">
        <h2 className="text-center text-3xl font-extrabold text-gray-900">
          Se connecter
        </h2>
      </div>
      <div className="max-w-md w-full mx-auto mt-8 bg-white p-8 border border-gray-300 rounded-lg">
        <form className="space-y-6">
          <div>
            <label htmlFor="email" className="text-sm font-medium text-gray-700">
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
                placeholder="********"
              />
            </div>
          </div>

          <div>
            <Button type="submit" className="w-full">
              Connexion
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}