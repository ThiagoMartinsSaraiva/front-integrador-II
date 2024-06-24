'use client'

import { useGlobal } from "@/app/context/globalContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";

export default function EditItem({ params }) {
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    amount: '',
  })

  const { data } = useGlobal()

  const itemData = data?.data?.items.find(item => item.name === params.name)

  useEffect(() => {
    setFormData({
      name: itemData?.name || '',
      type: itemData?.type || '',
      amount: itemData?.amount || '',
    })
  }, [itemData])

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

    const itemToSave = globalData.data.items.map(item => {
      if (item.name === params.name) {
        return {
          ...item,
          ...formData,
          amount: Number.parseInt(item.amount)
        }
      }
      return item
    })

    globalData.data.items = itemToSave

    const objectToSave = {
      ...globalData,
    }

    const parsedObjectToSave = JSON.stringify(objectToSave)

    fetch(`${window.location.protocol}//${window.location.host}/api/global`, {
      method: 'POST',
      body: parsedObjectToSave,
    }) 
    .then(() => window.location.href = '/items')
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <div className="z-10 w-1/3 items-center justify-between font-mono text-sm flex flex-col border-2 rounded-lg p-12">
        <div className="grid w-full items-center gap-3 mb-8">
          <div>
            <Label htmlFor="name">Nome</Label>
            <Input type="text" placeholder="Nome do item" name="name" id="name" value={formData.name} onChange={(e) => handleFormChange('name', e.target.value)} />
          </div>
          <div>
            <Label htmlFor="type">Tipo</Label>
            <Input type="text" placeholder="Tipo do item" name="type" id="type" value={formData.type} onChange={(e) => handleFormChange('type', e.target.value)} />
          </div>
          <div>
            <Label htmlFor="amount">Quantidade</Label>
            <Input type="amount" placeholder="Quantidade" name="amount" id="amount" value={formData.amount} onChange={(e) => handleFormChange('amount', e.target.value)} />
          </div>
        </div>
        <Button className="w-full mb-4" onClick={handleSubmit}>Salvar</Button>
      </div>
    </main>
  )
}