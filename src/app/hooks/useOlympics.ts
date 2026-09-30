import { useEffect, useState } from 'react'
import type { Country } from '../models/olympics'
import { getOlympics } from '../api/olympics'

export const useOlympics = () => {
    const [data, setData] = useState<Country[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        // annule la requête si le composant est démonté avant la réponse
        const controller = new AbortController()

        getOlympics(controller.signal)
            .then(setData)
            .catch((err: unknown) => {
                if (controller.signal.aborted) return
                setError(err instanceof Error ? err.message : 'Erreur inconnue')
            })
            .finally(() => {
                if (!controller.signal.aborted) setLoading(false)
            })

        return () => controller.abort()
    }, [])

    return { data, loading, error }
}
