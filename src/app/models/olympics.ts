// Participation d'un pays aux JO
export interface Participation {
    id: number
    year: number
    city: string
    medalsCount: number
    athleteCount: number
}

// Pays et historique de ses participations
export interface Country {
    id: number
    name: string
    participations: Participation[]
}
