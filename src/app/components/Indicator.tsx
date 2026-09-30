// classes écrites en entier : Tailwind ne génère pas les classes construites dynamiquement
const valueColors = {
    blue: 'text-blue-400',
    green: 'text-green-400',
    yellow: 'text-yellow-400',
}

export interface IndicatorProps {
    title: string
    value: number
    color: keyof typeof valueColors
}

export const Indicator = ({ title, value, color }: IndicatorProps) => (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-center">
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className={`text-4xl font-bold ${valueColors[color]}`}>{value}</p>
    </div>
)
