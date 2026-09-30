import type { FC } from 'react'
import { BrowserRouter, Routes, Route, useParams } from 'react-router-dom'
import { useOlympics } from './app/hooks/useOlympics'
import {
  getGamesEditionsCount,
  getTotalAthletes,
  getTotalMedals,
} from './app/utils/olympics'
import { Indicator, type IndicatorProps } from './app/components/Indicator'
import { MedalsPieChart } from './app/components/MedalsPieChart'
import { MedalsLineChart } from './app/components/MedalsLineChart'
import { Loader } from './app/components/Loader'
import { ErrorMessage } from './app/components/ErrorMessage'

// Anti-pattern 2 — Composant incohérent avec le nom du fichier (ex. Home dans App.tsx).
const Home: FC = () => {
  const { data, loading, error } = useOlympics()

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

// Anti-pattern 9 — Plusieurs composants dans le même fichier — un fichier par composant recommandé.
// Composant non utilisé pour le moment, mais conservé pour la suite du projet.
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Country: FC = () => {
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

// Anti-pattern 11 — Routing dans App.tsx — idéalement : module dédié.
export const App: FC = () => {
  // Anti-pattern 5 — console.log à retirer.
  console.log('App rendered')

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/country/:id" element={<Country />} />
      </Routes>
    </BrowserRouter>
  )
}
