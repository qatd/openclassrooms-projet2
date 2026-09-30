import type { ChartData, ChartOptions } from 'chart.js'
import type { Country, Participation } from '../models/olympics'
import { getTotalMedals } from './olympics'

// thème sombre partagé par les deux graphiques
const TEXT_COLOR = 'white'
const GRID_COLOR = 'rgba(255, 255, 255, 0.1)'

export const buildMedalsPieData = (countries: Country[]): ChartData<'pie'> => ({
    labels: countries.map((c) => c.name),
    datasets: [
        {
            label: 'Total des médailles',
            data: countries.map(getTotalMedals),
            backgroundColor: [
                'rgba(255, 99, 132, 0.6)',
                'rgba(54, 162, 235, 0.6)',
                'rgba(255, 206, 86, 0.6)',
                'rgba(75, 192, 192, 0.6)',
                'rgba(153, 102, 255, 0.6)',
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
            ],
            borderWidth: 1,
        },
    ],
})

export const medalsPieOptions: ChartOptions<'pie'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: { position: 'bottom', labels: { color: TEXT_COLOR } },
    },
}

export const buildMedalsLineData = (participations: Participation[]): ChartData<'line'> => {
    // tri chronologique, sinon l'axe X va de 2020 à 2004
    const sorted = [...participations].sort((a, b) => a.year - b.year)

    return {
        labels: sorted.map((p) => String(p.year)),
        datasets: [
            {
                label: 'Nombre de médailles',
                data: sorted.map((p) => p.medalsCount),
                borderColor: 'rgb(75, 192, 192)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
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
