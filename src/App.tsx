import type { FC } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Home } from './app/pages/Home'
import { Country } from './app/pages/Country'

// Anti-pattern 11 — Routing dans App.tsx — idéalement : module dédié.
export const App: FC = () => {
  // Anti-pattern 5 — console.log à retirer.
  console.log('App rendered')

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/country/:id" element={<Country />} />
      </Routes>
    </BrowserRouter>
  )
}
