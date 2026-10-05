import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Pie } from 'react-chartjs-2'
import type { Country } from '../models/olympics'
import { buildMedalsPieData, medalsPieOptions } from '../utils/charts'

// on indique les éléments que Chart.js va utiliser pour le graphique
ChartJS.register(ArcElement, Tooltip, Legend)

interface MedalsPieChartProps {
    countries: Country[]
}

// conteneur "relative" dédié au canvas : requis par Chart.js pour se redimensionner avec la fenêtre
export const MedalsPieChart = ({ countries }: MedalsPieChartProps) => (
    <div className="relative h-80 md:h-96">
        <Pie data={buildMedalsPieData(countries)} options={medalsPieOptions} />
    </div>
)
