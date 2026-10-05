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

// conteneur en "relative" car requis par Chart.js pour redimensionnement avec la fenetre
export const MedalsLineChart = ({ participations }: MedalsLineChartProps) => (
    <div className="relative h-80 md:h-96">
        <Line data={buildMedalsLineData(participations)} options={medalsLineOptions} />
    </div>
)
