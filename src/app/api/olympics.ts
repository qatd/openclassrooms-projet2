import type { Country } from '../models/olympics'

// JSON mock - sera remplacé plus tard par l'url de la vraie api
const OLYMPICS_URL = '/data/olympics.json'

// ici, signal (optionnel), permet d'annuler une requête en cours (si user quitte la page par ex)
export const getOlympics = async (signal?: AbortSignal): Promise<Country[]> => {
    const response = await fetch(OLYMPICS_URL, { signal })

    if (!response.ok) {
        throw new Error(`Erreur ${response.status} lors du chargement des données`)
    }

    return response.json()
}
