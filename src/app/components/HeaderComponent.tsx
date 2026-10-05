import { Indicator, type IndicatorProps } from './Indicator'

interface HeaderComponentProps {
    title: string
    indicators: IndicatorProps[]
}

export const HeaderComponent = ({ title, indicators }: HeaderComponentProps) => (
    <header className="flex flex-col gap-6 md:gap-8">
        <h1 className="mx-auto w-fit rounded-lg bg-primary px-6 py-2 text-center text-2xl font-semibold text-white md:text-4xl">
            {title}
        </h1>

        {/* mobile : indicateurs empilés / tablette et desktop : côte à côte */}
        <div className="flex flex-col gap-4 md:flex-row md:justify-center">
            {indicators.map((indicator) => (
                <Indicator key={indicator.title} {...indicator} />
            ))}
        </div>
    </header>
)
