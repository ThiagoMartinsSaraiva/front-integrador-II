'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useGlobal } from "../context/globalContext"

export function DashboardList() {
  const { data } = useGlobal()

  const itemsData = data?.data?.items

  const itemsAmount = itemsData?.reduce((acc, curr) => {
    return acc + curr.amount
  }, 0)

  const lentItems = itemsData?.reduce((acc, curr) => {
    return acc + curr.lent
  }, 0)

  const brokenItems = itemsData?.reduce((acc, curr) => {
    return acc + curr.broken
  }, 0)

  const availiableItems = itemsData?.reduce((acc, curr) => {
    return acc + curr.availiable
  }, 0)

  return (
    <>
      <Card className="flex flex-col gap-6 justify-between 2xl-justify-center">
        <CardHeader>
          <CardTitle className="text-3xl text-center">Total de itens</CardTitle>
        </CardHeader>
        <CardContent className="text-3xl font-bold text-center">{itemsAmount}</CardContent>
      </Card>
      <Card className="flex flex-col gap-6 justify-between 2xl-justify-center">
        <CardHeader>
          <CardTitle className="text-3xl text-center">Itens emprestados</CardTitle>
        </CardHeader>
        <CardContent className="text-3xl font-bold text-center">{lentItems}</CardContent>
      </Card>
      <Card className="flex flex-col gap-6 justify-between 2xl-justify-center">
        <CardHeader>
          <CardTitle className="text-3xl text-center">Itens disponíveis</CardTitle>
        </CardHeader>
        <CardContent className="text-3xl font-bold text-center">{availiableItems}</CardContent>
      </Card>
      <Card className="flex flex-col gap-6 justify-between 2xl-justify-center">
        <CardHeader>
          <CardTitle className="text-3xl text-center">Itens danificados</CardTitle>
        </CardHeader>
        <CardContent className="text-3xl font-bold text-center">{brokenItems}</CardContent>
      </Card>
    </>
  )
}