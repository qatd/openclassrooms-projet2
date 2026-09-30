import type { FC } from 'react'
import { RouterProvider } from 'react-router-dom'
import { router } from './app/router'

export const App: FC = () => {
  // Anti-pattern 5 — console.log à retirer.
  console.log('App rendered')

  return <RouterProvider router={router} />
}
