'use client'

import { TableCell, TableRow } from "@/components/ui/table"
import { useGlobal } from "../context/globalContext"

export function HistoryList() {
  const { data } = useGlobal()

  return (
    <>
      {data?.data?.histories?.map(history => (
        <TableRow key={history.user.name+history.item.name} className="odd:bg-slate-200 hover:bg-slate-300">
          <TableCell className="text-lg text-center">{history.item.name}</TableCell>
          <TableCell className="text-lg text-center">{history.item.type}</TableCell>
          <TableCell className="text-lg text-center">{history.user.name}</TableCell>
          <TableCell className="text-lg text-center">{history.requestDate}</TableCell>
          <TableCell className="text-lg text-center">{history.devolutionDate}</TableCell>
          <TableCell className="text-lg text-center">{history.devolutionExpectationDate}</TableCell>
        </TableRow>
      ))}
    </>
  )
}