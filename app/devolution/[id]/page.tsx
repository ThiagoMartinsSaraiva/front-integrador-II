'use client'

import { useGlobal } from "@/app/context/globalContext";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";

interface IDevolution {
  params: any
}

export default function Devolution({ params }: IDevolution) {
  const { data } = useGlobal()

  const [formData, setFormData] = useState({
    user: {
      name: '',
    },
    item: {
      name: '',
    },
    devolutionDate: '--/--/--',
    broken: false,
  })

  const requestData = data?.data?.requests.find(request => request.id == params.id)

  useEffect(() => {
    setFormData({
      user: {
        name: requestData?.user?.name || ''
      },
      item: {
        name: requestData?.item?.name || ''
      },
      devolutionDate: requestData?.devolutionDate || new Date().toLocaleDateString(),
      broken: requestData?.broken || false,
    })
  }, [requestData])

  function handleFormChange(key: string, value: string | boolean) {
    setFormData(currentFormValue => {
      return ({
        ...currentFormValue,
        [key]: value
      })
    })
  }

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

    const requestToSave = globalData.data.requests.map(request => {
      if (request.id == params.id) {
        return {
          ...request,
          devolutionDate: formData.devolutionDate
        }
      }
      return request
    })

    const requester = globalData.data.users.find(user => user.name === formData.user.name)

    if (requester) {
      requester.activeRequests = requester.activeRequests - 1
    }

    const usersToSave = globalData.data.users.map(user => {
      if (user.name === requester?.name) {
        return requester
      }

      return user;
    })

    const lentItem = globalData.data.items.find(item => item.name === formData.item.name)

    if (lentItem) {
      lentItem.availiable = formData.broken ? lentItem.availiable : lentItem.availiable + 1
      lentItem.lent = lentItem.lent - 1
      lentItem.broken = formData.broken ? lentItem.broken + 1 : lentItem.broken
    }

    const itemsToSave = globalData.data.items.map(item => {
      if (item.name === lentItem?.name) {
        return lentItem
      }

      return item
    })

    globalData.data.requests = requestToSave
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
            <Input type="text" placeholder="Nome do item" name="user" id="user" value={formData.user.name} onChange={(e) => handleUserFormChange(e.target.value)} />
          </div>
          <div>
            <Label htmlFor="item">Item</Label>
            <Input type="text" placeholder="Nome do item" name="item" id="item" value={formData.item.name} onChange={(e) => handleItemFormChange(e.target.value)} />
          </div>
          <div>
            <Label htmlFor="devolutionDate">Data de Devolução</Label>
            <Input type="text" placeholder="dd/mm/yyyy" name="devolutionDate" id="devolutionDate" value={formData.devolutionDate} onChange={(e) => handleFormChange('devolutionDate', e.target.value)} />
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="broken" checked={formData.broken} onCheckedChange={(c) => handleFormChange('broken', c)} />
            <Label htmlFor="broken">Item danificado?</Label>
          </div>
        </div>
        <div className="flex w-full gap-6">
          <Button className="w-full mb-4" onClick={() => handleSubmit()}>Devolver</Button>
        </div>
      </div>
    </main>
  )
}