import { Button } from "@/components/ui/button";
import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Link from "next/link";
import { RequestList } from "./request-list";


export default function Requests() {
  return (
    <main className="flex h-min-screen h-screen justify-center mt-24">
      <div className="h-1/2 w-3/4 flex flex-col gap-6">
        <div className="w-fit self-end">
          <Button className="align-right" asChild><Link href="/requests/new">Adicionar Solicitação</Link></Button>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-xl text-center">Usuário</TableHead>
              <TableHead className="text-xl text-center">Item</TableHead>
              <TableHead className="text-xl text-center">Data de Solicitação</TableHead>
              <TableHead className="text-xl text-center">Data de Devolução</TableHead>
              <TableHead className="text-xl text-center">Status</TableHead>
              <TableHead className="text-xl text-center">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <RequestList />
          </TableBody>
        </Table>
      </div>
    </main>
  )
}