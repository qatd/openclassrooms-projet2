import type { ActiveElement, ChartData, ChartEvent, ChartOptions } from 'chart.js'
import type { Country, Participation } from '../models/olympics'
import { getTotalMedals } from './olympics'


// thème clair pour les deux graphiques
const TEXT_COLOR = '#374151' // gray-700 de Tailwind
const GRID_COLOR = 'rgba(0, 0, 0, 0.1)'
// couleur qui viennent du pdf fourni en specs, car pas de maquette Figma..
const CHART_COLORS = ['#793d52', '#89a1db', '#9780a1', '#bfe0f1', '#b8cbe7', '#956065']

export const buildMedalsPieData = (countries: Country[]): ChartData<'pie'> => ({
    labels: countries.map((c) => c.name),
    datasets: [
        {
            label: 'Total des médailles',
            data: countries.map(getTotalMedals),
            backgroundColor: CHART_COLORS,
            borderColor: 'white',
            borderWidth: 1,
        },
    ],
})

export const buildMedalsPieOptions = (
    countries: Country[],
    onCountryClick: (id: number) => void,
): ChartOptions<'pie'> => ({
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: { position: 'bottom', labels: { color: TEXT_COLOR } },
    },
    onClick: (_event: ChartEvent, elements: ActiveElement[]) => {
        if (elements.length > 0) {
            const index = elements[0].index
            const country = countries[index]
            onCountryClick(country.id)
        }
    },
})

export const buildMedalsLineData = (participations: Participation[]): ChartData<'line'> => {
    // tri chronologique, sinon l'axe X va de 2020 à 2004
    const sorted = [...participations].sort((a, b) => a.year - b.year)

    return {
        labels: sorted.map((p) => String(p.year)),
        datasets: [
            {
                label: 'Nombre de médailles',
                data: sorted.map((p) => p.medalsCount),
                borderColor: CHART_COLORS[0],
                backgroundColor: CHART_COLORS[0],
                tension: 0.3,
            },
        ],
    }
}

const axis = { ticks: { color: TEXT_COLOR }, grid: { color: GRID_COLOR } }

export const medalsLineOptions: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: { position: 'top', labels: { color: TEXT_COLOR } },
    },
    scales: { x: axis, y: axis },
}
