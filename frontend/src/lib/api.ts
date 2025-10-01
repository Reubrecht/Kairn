// Fichier: kairn/frontend/src/lib/api.ts

// L'URL de base de notre API backend.
// Cette valeur provient d'une variable d'environnement pour être flexible
// entre le développement (Docker) et la production.
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1';

// Définition des types pour les réponses de l'API
export interface UserProfile {
  email: string;
  id: number;
  is_active: boolean;
  is_superuser: boolean;
  is_verified: boolean;
}

export interface LoginResponse {
  access_token: string;
  token_type: string;
}

/**
 * Gère les requêtes fetch vers notre API, en normalisant les réponses et les erreurs.
 * @param {string} endpoint - Le point de terminaison de l'API à appeler (ex: "/users/").
 * @param {RequestInit} options - Les options de la requête fetch (méthode, headers, body, etc.).
 * @returns {Promise<T>} - La réponse JSON de l'API.
 * @throws {Error} - Une erreur avec le message du backend en cas d'échec.
 */
async function fetchApi<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;
    
    // Ajoute les headers par défaut, sauf si c'est pour un formulaire
    const defaultHeaders = {
        'Content-Type': 'application/json',
        ...options.headers,
    };

    const response = await fetch(url, { ...options, headers: defaultHeaders });

    if (!response.ok) {
        // Si la réponse n'est pas "ok" (status 2xx), on essaie de lire le corps de la réponse
        // pour obtenir un message d'erreur plus précis du backend.
        const errorData: { detail?: string } = await response.json().catch(() => ({}));
        const errorMessage = errorData.detail || `HTTP error! status: ${response.status}`;
        throw new Error(errorMessage);
    }

    // Si la réponse est 204 No Content, il n'y a pas de corps à parser.
    if (response.status === 204) {
        return null as T;
    }

    return response.json();
}

/**
 * Fonction spécifique pour l'inscription d'un nouvel utilisateur.
 * @param {string} email - L'email de l'utilisateur.
 * @param {string} password - Le mot de passe de l'utilisateur.
 * @returns {Promise<UserProfile>} - Les données de l'utilisateur créé.
 */
export function registerUser(email: string, password: string): Promise<UserProfile> {
    return fetchApi<UserProfile>('/users/', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
    });
}

/**
 * Fonction spécifique pour la connexion d'un utilisateur.
 * @param {string} email - L'email de l'utilisateur (passé comme username).
 * @param {string} password - Le mot de passe de l'utilisateur.
 * @returns {Promise<LoginResponse>} - Le token d'accès.
 */
export function loginUser(email: string, password: string): Promise<LoginResponse> {
    // L'API attend des données de formulaire pour le login OAuth2
    const formData = new URLSearchParams();
    formData.append('username', email);
    formData.append('password', password);

    return fetchApi<LoginResponse>('/users/login/access-token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formData.toString(),
    });
}

/**
 * Fonction pour récupérer le profil de l'utilisateur actuellement connecté.
 * @param {string} token - Le token d'accès de l'utilisateur.
 * @returns {Promise<UserProfile>} - Les données du profil de l'utilisateur.
 */
export function getProfile(token: string): Promise<UserProfile> {
    return fetchApi<UserProfile>('/users/me', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    });
}