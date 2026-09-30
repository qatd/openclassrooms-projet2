import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    LineElement,
    PointElement,
    Tooltip,
    Legend,
} from 'chart.js'
import { Line } from 'react-chartjs-2'
import type { Participation } from '../models/olympics'
import { buildMedalsLineData, medalsLineOptions } from '../utils/charts'

// on indique les éléments dont chartjs a besoin pour les graphiques
ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Tooltip, Legend)

interface MedalsLineChartProps {
    participations: Participation[]
}

export const MedalsLineChart = ({ participations }: MedalsLineChartProps) => (
    <div style={{ height: '400px' }}>
        <Line data={buildMedalsLineData(participations)} options={medalsLineOptions} />
    </div>
)
