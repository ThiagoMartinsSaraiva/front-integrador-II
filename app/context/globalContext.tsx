import { ReactNode, createContext, useContext, useState } from "react";

interface User {
  name: string
  requestsCount: number
  arrears: number
  activeRequests: number
  password: string
  email: string
}

interface Item {
  name: string
  type: string
  amount: number
  availiable: number
  lent: number
  broken: number
}

interface Request {
  id: number
  user: User
  item: Item
  requestDate: string
  devolutionDate: string
  status: string
  broken: boolean
}

interface History {
  user: User
  item: Item
  requestDate: string
  devolutionDate: string
  devolutionExpectationDate: string
}

interface StockItem {
  title: string
  amount: string
}

interface IGlobalData {
  data: {
    users: User[]
    items: Item[]
    requests: Request[]
    histories: History[]
    stock: StockItem[]
  }
}

interface GlobalData {
  data: IGlobalData
  setData: any
}

interface GlobalContextData {
  children: ReactNode
}

const GlobalContext = createContext<GlobalData>({} as GlobalData)

export function GlobalProvider({ children }: GlobalContextData) {
  const [data, setData] = useState<IGlobalData>({} as IGlobalData)

  return (
    <GlobalContext.Provider value={{ data, setData }}>
      {children}
    </GlobalContext.Provider>
  )
}

export function useGlobal() {
  const context = useContext(GlobalContext)

  return context
}