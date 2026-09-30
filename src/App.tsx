import type { FC } from 'react'
import { BrowserRouter, Routes, Route, useParams } from 'react-router-dom'
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
} from 'chart.js'
import { Pie, Line } from 'react-chartjs-2'
import { useOlympics } from './app/hooks/useOlympics'
import {
  getGamesEditionsCount,
  getTotalAthletes,
  getTotalMedals,
} from './app/utils/olympics'
import {
  buildMedalsLineData,
  buildMedalsPieData,
  medalsLineOptions,
  medalsPieOptions,
} from './app/utils/charts'

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
)

// Anti-pattern 2 — Composant incohérent avec le nom du fichier (ex. Home dans App.tsx).
const Home: FC = () => {
  const { data, loading, error } = useOlympics()

  if (loading) {
    return <div>Chargement...</div>
  }

  if (error) {
    return <div>Erreur : {error}</div>
  }

  const totalParticipatingCountries = data.length
  const totalGamesEditions = getGamesEditionsCount(data)

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

        {/* Anti-pattern 8 — Cartes dupliquées — extraire en composant réutilisable (Indicator.tsx). */}
        <div className="mb-2">
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-center mb-2">
            <h3 className="text-xl font-semibold mb-2">Pays participants</h3>
            <p className="text-4xl font-bold text-blue-400">
              {totalParticipatingCountries}
            </p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-center">
            <h3 className="text-xl font-semibold mb-2">Éditions des JO</h3>
            <p className="text-4xl font-bold text-green-400">
              {totalGamesEditions}
            </p>
          </div>
        </div>

        <div className="bg-gray-800 p-8 rounded-lg shadow-xl">
          <div style={{ height: '400px' }}>
            <Pie data={buildMedalsPieData(data)} options={medalsPieOptions} />
          </div>
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
    return <div>Chargement...</div>
  }

  if (error) {
    return <div>Erreur : {error}</div>
  }

  // find renvoie undefined si l'id n'existe pas dans les données
  const country = data.find((c) => c.id === Number(id))

  if (!country) {
    return <div>Pays introuvable</div>
  }

  const totalMedals = getTotalMedals(country)
  const totalAthletes = getTotalAthletes(country)
  const totalParticipations = country.participations.length

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">{country.name}</h1>

        {/* Anti-pattern 8 — Cartes dupliquées avec Home — extraire en composant réutilisable (Indicator.tsx). */}
        <div className="mb-2">
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg mb-2">
            <h3 className="text-xl font-semibold mb-2">Participations</h3>
            <p className="text-4xl font-bold text-blue-400">
              {totalParticipations}
            </p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg mb-2">
            <h3 className="text-xl font-semibold mb-2">Total médailles</h3>
            <p className="text-4xl font-bold text-yellow-400">{totalMedals}</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-2">Total athlètes</h3>
            <p className="text-4xl font-bold text-green-400">{totalAthletes}</p>
          </div>
        </div>

        <div className="bg-gray-800 p-8 rounded-lg shadow-xl">
          <div style={{ height: '400px' }}>
            <Line
              data={buildMedalsLineData(country.participations)}
              options={medalsLineOptions}
            />
          </div>
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
