import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { HistoryList } from "./history-list";

export default function History() {
  return (
    <main className="flex h-min-screen h-screen justify-center mt-24">
      <div className="h-1/2 w-3/4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-xl text-center">Item</TableHead>
              <TableHead className="text-xl text-center">Tipo</TableHead>
              <TableHead className="text-xl text-center">Usuário</TableHead>
              <TableHead className="text-xl text-center">Data de empréstimo</TableHead>
              <TableHead className="text-xl text-center">Data de devolução</TableHead>
              <TableHead className="text-xl text-center">Previsão de devolução</TableHead>
              <TableHead className="text-xl text-center">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <HistoryList />
          </TableBody>
        </Table>
      </div>
    </main>
  )
}