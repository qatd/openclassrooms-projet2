import { createBrowserRouter } from 'react-router-dom'
import { Home } from './pages/Home'
import { Country } from './pages/Country'
import { NotFound } from './pages/NotFound'

export const router = createBrowserRouter([
    { path: '/', element: <Home /> },
    { path: '/country/:id', element: <Country /> },
    // toute URL inconnue affiche la page 404
    { path: '*', element: <NotFound /> },
])
