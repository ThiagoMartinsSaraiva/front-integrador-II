import { Button } from "@/components/ui/button";
import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Link from "next/link";
import { ItemList } from "./item-list";

export default function Items() {
  return (
    <main className="flex h-min-screen h-screen justify-center mt-24">
      <div className="h-1/2 w-3/4 flex flex-col gap-6">
        <div className="w-fit self-end">
          <Button className="align-right" asChild><Link href="/items/new">Adicionar Item</Link></Button>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-xl text-center">Nome</TableHead>
              <TableHead className="text-xl text-center">Tipo</TableHead>
              <TableHead className="text-xl text-center">Quantidade total</TableHead>
              <TableHead className="text-xl text-center">Disponíveis</TableHead>
              <TableHead className="text-xl text-center">Emprestados</TableHead>
              <TableHead className="text-xl text-center">Danificados</TableHead>
              <TableHead className="text-xl text-center">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <ItemList />
          </TableBody>
        </Table>
      </div>
    </main>
  )
}