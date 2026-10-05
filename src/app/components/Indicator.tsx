export interface IndicatorProps {
    title: string
    value: number
}

export const Indicator = ({ title, value }: IndicatorProps) => (
    <div className="rounded-lg border-2 border-primary px-6 py-2 text-center">
        <h3 className="text-gray-600">{title}</h3>
        <p className="text-xl font-bold">{value}</p>
    </div>
)
