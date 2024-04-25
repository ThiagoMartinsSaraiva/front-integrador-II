import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

export default function PasswordRecovery() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <div className="z-10 w-1/3 items-center justify-between font-mono text-sm flex flex-col border-2 rounded-lg p-12">
        <div className="grid w-full items-center gap-2 mb-8">
          <Label htmlFor="email">E-mail</Label>
          <Input type="email" placeholder="Digite seu e-mail" name="email" id="email" />
        </div>
        <Button className="w-full mb-4" asChild><Link href="/">Recuperar senha</Link></Button>
      </div>
    </main>
  )
}