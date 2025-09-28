// Fichier: kairn/frontend/src/lib/api.ts

// L'URL de base de notre API backend. 
// En production, cette valeur devrait provenir d'une variable d'environnement.
const API_BASE_URL = 'http://localhost:8000/api/v1';

/**
 * Gère les requêtes fetch vers notre API, en normalisant les réponses et les erreurs.
 * @param {string} endpoint - Le point de terminaison de l'API à appeler (ex: "/users/").
 * @param {RequestInit} options - Les options de la requête fetch (méthode, headers, body, etc.).
 * @returns {Promise<any>} - La réponse JSON de l'API.
 * @throws {Error} - Une erreur avec le message du backend en cas d'échec.
 */
async function fetchApi(endpoint: string, options: RequestInit = {}): Promise<any> {
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
        const errorData = await response.json().catch(() => ({}));
        const errorMessage = errorData.detail || `HTTP error! status: ${response.status}`;
        throw new Error(errorMessage);
    }

    // Si la réponse est 204 No Content, il n'y a pas de corps à parser.
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
export function registerUser(email: any, password: any) {
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
    // L'API attend des données de formulaire pour le login OAuth2
    const formData = new URLSearchParams();
    formData.append('username', email);
    formData.append('password', password);

    return fetchApi('/users/login/access-token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formData.toString(),
    });
}

