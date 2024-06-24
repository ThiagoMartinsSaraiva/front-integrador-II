'use client'

import { useGlobal } from "@/app/context/globalContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";

interface IEditUser {
  params: any
}

export default function EditUser({ params }: IEditUser) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  })

  const { data } = useGlobal()

  const userData = data?.data?.users.find(user => user.name === params.name)

  useEffect(() => {
    setFormData({
      name: userData?.name || '',
      email: userData?.email || '',
      password: userData?.password || '',
    })
  }, [userData])

  function handleFormChange(key: string, value: string) {
    setFormData(currentFormValue => {
      return ({
        ...currentFormValue,
        [key]: value
      })
    })
  }

  function handleSubmit() {
    const globalData = {...data}

    const usersToSave = globalData.data.users.map(user => {
      if (user.name === params.name) {
        return {
          ...user,
          ...formData
        }
      }
      return user
    })

    globalData.data.users = usersToSave

    const objectToSave = {
      ...globalData,
    }

    const parsedObjectToSave = JSON.stringify(objectToSave)
    fetch(`${window.location.protocol}//${window.location.host}/api/global`, {
      method: 'POST',
      body: parsedObjectToSave,
    }) 
    .then(() => window.location.href = '/users')
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <div className="z-10 w-1/3 items-center justify-between font-mono text-sm flex flex-col border-2 rounded-lg p-12">
        <div className="grid w-full items-center gap-3 mb-8">
          <div>
            <Label htmlFor="name">Nome</Label>
            <Input type="text" placeholder="Nome do usuário" name="name" id="name" value={formData.name} onChange={(e) => handleFormChange('name', e.target.value)} />
          </div>
          <div>
            <Label htmlFor="email">E-mail</Label>
            <Input type="email" placeholder="E-mail" name="email" id="email" value={formData.email} onChange={(e) => handleFormChange('email', e.target.value)} />
          </div>
          <div>
            <Label htmlFor="password">Senha</Label>
            <Input type="password" placeholder="Senha" name="password" id="password" value={formData.password} onChange={(e) => handleFormChange('password', e.target.value)} />
          </div>
        </div>
        <Button className="w-full mb-4" onClick={handleSubmit}>Salvar</Button>
      </div>
    </main>
  )
}