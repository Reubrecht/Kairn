// Fichier: kairn/frontend/src/lib/api.ts

// L'URL de base de notre API backend.
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1';

/**
 * Gère les requêtes fetch vers notre API, en normalisant les réponses et les erreurs.
 * @param {string} endpoint - Le point de terminaison de l'API à appeler (ex: "/users/").
 * @param {RequestInit} options - Les options de la requête fetch (méthode, headers, body, etc.).
 * @returns {Promise<any>} - La réponse JSON de l'API.
 * @throws {Error} - Une erreur avec le message du backend en cas d'échec.
 */
async function fetchApi(endpoint: string, options: RequestInit = {}): Promise<any> {
    const url = `${API_BASE_URL}${endpoint}`;

    // *** CORRECTION DU BUG CI-DESSOUS ***
    // On ne met le header 'Content-Type': 'application/json' par défaut que s'il n'est pas
    // déjà fourni dans les options. C'est ce qui cassait notre appel de login.
    const headers = {
        'Content-Type': 'application/json',
        ...options.headers,
    };

    const response = await fetch(url, { ...options, headers: headers });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        const errorMessage = errorData.detail || `HTTP error! status: ${response.status}`;
        throw new Error(errorMessage);
    }

    if (response.status === 204) {
        return null;
    }

    return response.json();
}

/**
 * Fonction spécifique pour l'inscription d'un nouvel utilisateur.
 * @param {string} email - L'email de l'utilisateur.
 * @param {string} password - Le mot de passe de l'utilisateur.
 * @returns {Promise<any>} - Les données de l'utilisateur créé.
 */
export function registerUser(email: string, password: string) {
    return fetchApi('/users/', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
    });
}

/**
 * Fonction spécifique pour la connexion d'un utilisateur.
 * @param {string} email - L'email de l'utilisateur (passé comme username).
 * @param {string} password - Le mot de passe de l'utilisateur.
 * @returns {Promise<any>} - Le token d'accès.
 */
export function loginUser(email: string, password: string) {
    const formData = new URLSearchParams();
    formData.append('username', email);
    formData.append('password', password);

    return fetchApi('/users/login/access-token', {
        method: 'POST',
        headers: {
            // Cet en-tête spécifique ne sera plus écrasé par le défaut.
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formData.toString(),
    });
}

/**
 * Récupère le profil de l'utilisateur actuellement connecté.
 * @param {string} token - Le token JWT d'authentification.
 * @returns {Promise<any>} - Les données du profil de l'utilisateur.
 */
export function getProfile(token: string) {
    return fetchApi('/profiles/me', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    });
}