import type { Country } from '../models/olympics'

export const getTotalMedals = (country: Country): number =>
    country.participations.reduce((sum, p) => sum + p.medalsCount, 0)

export const getTotalAthletes = (country: Country): number =>
    country.participations.reduce((sum, p) => sum + p.athleteCount, 0)

// nombre d'éditions des JO, calculé depuis les datas
export const getGamesEditionsCount = (countries: Country[]): number =>
    new Set(countries.flatMap((c) => c.participations.map((p) => p.year))).size
