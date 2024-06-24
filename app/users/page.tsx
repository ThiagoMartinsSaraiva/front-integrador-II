import { Button } from "@/components/ui/button";
import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Link from "next/link";
import { UserList } from "./user-list";

export default function Users() {
  return (
    <main className="flex h-min-screen h-screen justify-center mt-24">
      <div className="h-1/2 w-3/4 flex flex-col gap-6">
        <div className="w-fit self-end">
          <Button className="align-right" asChild><Link href="/users/new">Adicionar usuário</Link></Button>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-xl text-center">Nome</TableHead>
              <TableHead className="text-xl text-center">Total de empréstimos</TableHead>
              <TableHead className="text-xl text-center">Atrasos</TableHead>
              <TableHead className="text-xl text-center">Empréstimos ativos</TableHead>
              <TableHead className="text-xl text-center">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <UserList />
          </TableBody>
        </Table>
      </div>
    </main>
  )
}