'use client'

import { TableCell, TableRow } from "@/components/ui/table"
import Link from "next/link"
import { useGlobal } from "../context/globalContext"

export function UserList() {
  const { data } = useGlobal()

  return (
    <>
      {data?.data?.users?.map(user => (
        <TableRow key={user.name} className="odd:bg-slate-200 hover:bg-slate-300">
          <TableCell className="text-lg text-center">{user.name}</TableCell>
          <TableCell className="text-lg text-center">{user.requestsCount}</TableCell>
          <TableCell className="text-lg text-center">{user.arrears}</TableCell>
          <TableCell className="text-lg text-center">{user.activeRequests}</TableCell>
          <TableCell className="text-lg text-center flex gap-6 justify-center">
            <Link href={`/users/new/${user.name}`}>Editar</Link>
          </TableCell>
        </TableRow>
      ))}
    </>
  )
}