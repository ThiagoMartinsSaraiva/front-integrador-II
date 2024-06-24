'use client'

import { useGlobal } from "@/app/context/globalContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

export default function NewRequests() {
  const [formData, setFormData] = useState({
    user: {
      name: '',
    },
    item: {
      name: '',
    },
    devolutionDate: '--/--/--',
    requestDate: new Date().toLocaleDateString(),
    status: 'Pendente'
  })

  const { data } = useGlobal()

  function handleUserFormChange(value: string) {
    setFormData(currentFormValue => {
      return ({
        ...currentFormValue,
        user: {
          name: value,
        }
      })
    })
  }

  function handleItemFormChange(value: string) {
    setFormData(currentFormValue => {
      return ({
        ...currentFormValue,
        item: {
          name: value,
        }
      })
    })
  }

  function handleSubmit() {
    const globalData = {...data}

    const requestsToSave = [...globalData.data.requests, {
      ...formData,
      id: globalData.data.requests.length + 1,
    }]

    const requester = globalData.data.users.find(user => user.name === formData.user.name)

    if (requester) {
      requester.requestsCount = requester.requestsCount + 1
      requester.activeRequests = requester.activeRequests + 1
    }

    const usersToSave = globalData.data.users.map(user => {
      if (user.name === requester?.name) {
        return requester
      }

      return user;
    })

    const lentItem = globalData.data.items.find(item => item.name === formData.item.name)

    if (lentItem) {
      lentItem.availiable = lentItem.availiable - 1
      lentItem.lent = lentItem.lent + 1
    }

    const itemsToSave = globalData.data.items.map(item => {
      if (item.name === lentItem?.name) {
        return lentItem
      }

      return item
    })

    globalData.data.requests = requestsToSave as any
    globalData.data.users = usersToSave
    globalData.data.items = itemsToSave

    const objectToSave = {
      ...globalData,
    }

    const parsedObjectToSave = JSON.stringify(objectToSave)

    fetch(`${window.location.protocol}//${window.location.host}/api/global`, {
      method: 'POST',
      body: parsedObjectToSave,
    }) 
    .then(() => window.location.href = '/requests')
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <div className="z-10 w-1/3 items-center justify-between font-mono text-sm flex flex-col border-2 rounded-lg p-12">
        <div className="grid w-full items-center gap-3 mb-8">
        <div>
            <Label htmlFor="user">Solicitante</Label>
            <Input type="text" placeholder="Nome do solicitante" name="user" id="user" onChange={(e) => handleUserFormChange(e.target.value)} />
          </div>
          <div>
            <Label htmlFor="item">Item</Label>
            <Input type="text" placeholder="Tipo do item" name="item" id="item" onChange={(e) => handleItemFormChange(e.target.value)} />
          </div>
        </div>
        <Button className="w-full mb-4" onClick={handleSubmit}>Criar</Button>
      </div>
    </main>
  )
}