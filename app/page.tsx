import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <div className="z-10 w-1/3 items-center justify-between font-mono text-sm flex flex-col border-2 rounded-lg p-12">
        <div className="grid w-full items-center gap-2 mb-8">
          <Label htmlFor="login">Usuário</Label>
          <Input type="login" placeholder="Digite seu usuário" name="login" id="login" />
        </div>
        <div className="grid w-full items-center gap-2 mb-8">
          <Label htmlFor="password">Senha</Label>
          <Input type="password" placeholder="Digite sua senha" name="password" id="password" />
        </div>
        <Button className="w-full mb-4">Entrar</Button>
        <Button variant='secondary' className="w-full" asChild><Link href="password-recovery">Esqueci minha senha</Link></Button>
      </div>
    </main>
  );
}
