import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Pie } from 'react-chartjs-2'
import type { Country } from '../models/olympics'
import { buildMedalsPieData, medalsPieOptions } from '../utils/charts'

// on indique les éléments que Chart.js va utiliser pour le graphique
ChartJS.register(ArcElement, Tooltip, Legend)

interface MedalsPieChartProps {
    countries: Country[]
}

export const MedalsPieChart = ({ countries }: MedalsPieChartProps) => (
    <div style={{ height: '400px' }}>
        <Pie data={buildMedalsPieData(countries)} options={medalsPieOptions} />
    </div>
)
