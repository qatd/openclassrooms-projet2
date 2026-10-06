import { useNavigate } from 'react-router-dom'
import { useData } from '../hooks/useData'
import { getGamesEditionsCount } from '../utils/olympics'
import type { IndicatorProps } from '../components/Indicator'
import { HeaderComponent } from '../components/HeaderComponent'
import { MedalsPieChart } from '../components/MedalsPieChart'
import { Loader } from '../components/Loader'
import { ErrorMessage } from '../components/ErrorMessage'

export const Home = () => {
    const { data, loading, error } = useData()
    const navigate = useNavigate()

    const handleCountryClick = (id: number) => navigate(`/country/${id}`)

    if (loading) {
        return <Loader />
    }

    if (error) {
        return <ErrorMessage message={error} />
    }

    const indicators: IndicatorProps[] = [
        { title: 'Pays participants', value: data.length },
        { title: 'Éditions des JO', value: getGamesEditionsCount(data) },
    ]

    return (
        <div className="min-h-screen bg-white px-4 py-8 text-gray-800 md:px-8">
            {/* colonne centrée, l'espacement entre les blocs est géré par gap */}
            <div className="mx-auto flex max-w-6xl flex-col gap-6 md:gap-8">
                <HeaderComponent
                    title="Historique des Jeux Olympiques - TéléSport"
                    indicators={indicators}
                />

                <p className="text-center md:text-lg">
                    Bienvenue sur la page dédiée à l'historique des Jeux Olympiques.
                    Explorez les performances des pays au fil des années.
                </p>

                <div className="rounded-lg bg-gray-50 p-4 shadow md:p-8">
                    <MedalsPieChart countries={data} onCountryClick={handleCountryClick} />
                </div>

                <p className="text-center text-sm text-gray-600">
                    Cliquez sur un pays pour voir ses détails
                </p>
            </div>
        </div>
    )
}
