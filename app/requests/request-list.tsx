'use client'

import { TableCell, TableRow } from "@/components/ui/table"
import Link from "next/link"
import { useGlobal } from "../context/globalContext"

export function RequestList() {
  const { data } = useGlobal()

  return (
    <>
      {data?.data?.requests?.map(request => (
        <TableRow key={request.user.name+request.item.name} className="odd:bg-slate-200 hover:bg-slate-300">
          <TableCell className="text-lg text-center">{request.user.name}</TableCell>
          <TableCell className="text-lg text-center">{request.item.name}</TableCell>
          <TableCell className="text-lg text-center">{request.requestDate}</TableCell>
          <TableCell className="text-lg text-center">{request.devolutionDate}</TableCell>
          <TableCell className="text-lg text-center">{request.status}</TableCell>
          <TableCell className="text-lg text-center flex gap-6 justify-center">
            <Link href={`/approve-request/${request.id}`}>Avaliar</Link>
            <Link href={`/devolution/${request.id}`}>Devolver</Link>
          </TableCell>
        </TableRow>
      ))}
    </>
  )
}