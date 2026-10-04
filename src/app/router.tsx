import { createBrowserRouter } from 'react-router-dom'
import { Home } from './pages/Home'
import { Country } from './pages/Country'
import { NotFound } from './pages/NotFound'

export const router = createBrowserRouter([
    { path: '/', element: <Home /> },
    { path: '/country/:id', element: <Country /> },
    // les URLs inconnues affichent la page 404 / not found
    { path: '*', element: <NotFound /> },
])
