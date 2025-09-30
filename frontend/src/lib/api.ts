// Fichier: kairn/frontend/src/lib/api.ts (Version Complète)

const API_URL = 'http://localhost:8000/api/v1';

// --- FONCTIONS EXISTANTES ---

export async function registerUser(userData: any) {
  const response = await fetch(`${API_URL}/users/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData),
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.detail || 'Erreur lors de l\'inscription');
  }
  return response.json();
}

export async function loginUser(credentials: any) {
  const params = new URLSearchParams();
  params.append('username', credentials.username);
  params.append('password', credentials.password);

  const response = await fetch(`${API_URL}/users/login/access-token`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: params,
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.detail || 'Email ou mot de passe incorrect');
  }
  return response.json();
}


// --- NOUVELLES FONCTIONS ---

export async function getProfile(token: string) {
  const response = await fetch(`${API_URL}/profiles/me`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Impossible de récupérer le profil');
  }
  return response.json();
}

export async function updateProfile(token: string, profileData: any) {
  const response = await fetch(`${API_URL}/profiles/me`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(profileData),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.detail || 'Erreur lors de la mise à jour du profil');
  }
  return response.json();
}