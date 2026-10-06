import { BackLink } from './BackLink'

interface ErrorMessageProps {
    message: string
    // optionnel, pour le cas où par exemple les datas chargent pas et qu'on est sur home
    showBackLink?: boolean
}

export const ErrorMessage = ({ message, showBackLink = false }: ErrorMessageProps) => (
    <div className="flex flex-col gap-4 items-center p-4">
        <p>Erreur : {message}</p>
        {showBackLink && <BackLink />}
    </div>
)
