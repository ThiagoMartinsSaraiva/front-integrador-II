'use client'

import { TableCell, TableRow } from "@/components/ui/table"
import Link from "next/link"
import { useGlobal } from "../context/globalContext"

export function ItemList() {
  const { data } = useGlobal()

  return (
    <>
      {data?.data?.items?.map(item => (
        <TableRow key={item.name} className="odd:bg-slate-200 hover:bg-slate-300">
          <TableCell className="text-lg text-center">{item.name}</TableCell>
          <TableCell className="text-lg text-center">{item.type}</TableCell>
          <TableCell className="text-lg text-center">{item.amount}</TableCell>
          <TableCell className="text-lg text-center">{item.availiable}</TableCell>
          <TableCell className="text-lg text-center">{item.lent}</TableCell>
          <TableCell className="text-lg text-center">{item.broken}</TableCell>
          <TableCell className="text-lg text-center flex gap-6 justify-center">
            <Link href={`/items/new/${item.name}`}>Editar</Link>
          </TableCell>
        </TableRow>
      ))}
    </>
  )
}