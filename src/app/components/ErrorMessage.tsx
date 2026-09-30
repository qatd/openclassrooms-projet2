interface ErrorMessageProps {
    message: string
}

export const ErrorMessage = ({ message }: ErrorMessageProps) => <div>Erreur : {message}</div>
