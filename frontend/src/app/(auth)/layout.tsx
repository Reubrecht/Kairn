// Fichier: kairn/frontend/src/app/(auth)/layout.tsx
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center p-4">
      <div className="w-full max-w-md">
        <div className="flex justify-center mb-8">
          <Link href="/">
            <Image
              src="/kairn_logo.png"
              alt="Kairn Logo"
              width={100}
              height={100}
            />
          </Link>
        </div>
        {children}
      </div>
    </div>
  );
}