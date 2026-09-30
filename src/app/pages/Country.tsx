import { useParams } from 'react-router-dom'
import { useOlympics } from '../hooks/useOlympics'
import { getTotalAthletes, getTotalMedals } from '../utils/olympics'
import { Indicator, type IndicatorProps } from '../components/Indicator'
import { MedalsLineChart } from '../components/MedalsLineChart'
import { Loader } from '../components/Loader'
import { ErrorMessage } from '../components/ErrorMessage'

export const Country = () => {
    const { id } = useParams()
    const { data, loading, error } = useOlympics()

    if (loading) {
        return <Loader />
    }

    if (error) {
        return <ErrorMessage message={error} />
    }

    // find renvoie undefined si l'id n'existe pas dans les données
    const country = data.find((c) => c.id === Number(id))

    if (!country) {
        return <div>Pays introuvable</div>
    }

    const indicators: IndicatorProps[] = [
        { title: 'Participations', value: country.participations.length, color: 'blue' },
        { title: 'Total médailles', value: getTotalMedals(country), color: 'yellow' },
        { title: 'Total athlètes', value: getTotalAthletes(country), color: 'green' },
    ]

    return (
        <div className="min-h-screen bg-gray-900 text-white p-8">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-4xl font-bold mb-8">{country.name}</h1>

                <div className="mb-2 space-y-2">
                    {indicators.map((indicator) => (
                        <Indicator key={indicator.title} {...indicator} />
                    ))}
                </div>

                <div className="bg-gray-800 p-8 rounded-lg shadow-xl">
                    <MedalsLineChart participations={country.participations} />
                </div>

                <div className="text-sm text-gray-400">
                    <p>Données des 5 dernières éditions des Jeux Olympiques</p>
                </div>
            </div>
        </div>
    )
}
