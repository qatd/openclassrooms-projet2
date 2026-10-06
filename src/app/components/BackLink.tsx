import { Link } from 'react-router-dom'

// bouton retour vers le dashboard, utilisé par Country et les msgs d'erreur
export const BackLink = () => (
    <Link
        to="/"
        className="w-fit rounded-lg border-2 border-primary px-4 py-2 font-semibold text-primary hover:bg-primary hover:text-white"
    >
        Retour
    </Link>
)
