import { Indicator, type IndicatorProps } from './Indicator'

interface HeaderComponentProps {
    title: string
    indicators: IndicatorProps[]
}

export const HeaderComponent = ({ title, indicators }: HeaderComponentProps) => (
    <header className="mb-8">
        <h1 className="mx-auto mb-8 w-fit rounded-lg bg-primary px-6 py-2 text-center text-4xl font-semibold text-white">
            {title}
        </h1>

        <div className="space-y-2">
            {indicators.map((indicator) => (
                <Indicator key={indicator.title} {...indicator} />
            ))}
        </div>
    </header>
)
