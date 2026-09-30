import { useData } from '../hooks/useData'
import { getGamesEditionsCount } from '../utils/olympics'
import { Indicator, type IndicatorProps } from '../components/Indicator'
import { MedalsPieChart } from '../components/MedalsPieChart'
import { Loader } from '../components/Loader'
import { ErrorMessage } from '../components/ErrorMessage'

export const Home = () => {
    const { data, loading, error } = useData()

    if (loading) {
        return <Loader />
    }

    if (error) {
        return <ErrorMessage message={error} />
    }

    const indicators: IndicatorProps[] = [
        { title: 'Pays participants', value: data.length, color: 'blue' },
        { title: 'Éditions des JO', value: getGamesEditionsCount(data), color: 'green' },
    ]

    return (
        <div className="min-h-screen bg-gray-900 text-white p-8">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-4xl font-bold mb-8">
                    Historique des Jeux Olympiques - TéléSport
                </h1>

                <div className="mb-8">
                    <p className="text-lg">
                        Bienvenue sur la page dédiée à l'historique des Jeux Olympiques.
                        Explorez les performances des pays au fil des années.
                    </p>
                </div>

                <div className="mb-2 space-y-2">
                    {indicators.map((indicator) => (
                        <Indicator key={indicator.title} {...indicator} />
                    ))}
                </div>

                <div className="bg-gray-800 p-8 rounded-lg shadow-xl">
                    <MedalsPieChart countries={data} />
                </div>

                <div className="text-sm text-gray-400">
                    <p>Cliquez sur un pays pour voir ses détails</p>
                </div>
            </div>
        </div>
    )
}
