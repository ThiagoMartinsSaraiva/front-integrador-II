'use client'

import { ReactNode } from "react"
import { GlobalProvider } from "./context/globalContext"

interface IProviders {
  children: ReactNode
}

export function Providers({ children }: IProviders) {
  return (
    <GlobalProvider>
      {children}
    </GlobalProvider>
  )
}