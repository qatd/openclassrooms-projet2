import { Link, useParams } from 'react-router-dom'
import { useData } from '../hooks/useData'
import { getTotalAthletes, getTotalMedals } from '../utils/olympics'
import type { IndicatorProps } from '../components/Indicator'
import { HeaderComponent } from '../components/HeaderComponent'
import { MedalsLineChart } from '../components/MedalsLineChart'
import { Loader } from '../components/Loader'
import { ErrorMessage } from '../components/ErrorMessage'

export const Country = () => {
    const { id } = useParams()
    const { data, loading, error } = useData()

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
        { title: 'Participations', value: country.participations.length },
        { title: 'Total médailles', value: getTotalMedals(country) },
        { title: 'Total athlètes', value: getTotalAthletes(country) },
    ]

    return (
        <div className="min-h-screen bg-white px-4 py-8 text-gray-800 md:px-8">
            <div className="mx-auto flex max-w-6xl flex-col gap-6 md:gap-8">
                
                <Link
                    to="/"
                    className="self-start rounded-lg border-2 border-primary px-4 py-2 font-semibold text-primary hover:bg-primary hover:text-white"
                >
                    Retour
                </Link>

                <HeaderComponent title={country.name} indicators={indicators} />

                <div className="rounded-lg bg-gray-50 p-4 shadow md:p-8">
                    <MedalsLineChart participations={country.participations} />
                </div>

                <p className="text-center text-sm text-gray-600">
                    Données des 5 dernières éditions des Jeux Olympiques
                </p>
            </div>
        </div>
    )
}
