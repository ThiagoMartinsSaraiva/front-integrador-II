'use client'

import { useGlobal } from "@/app/context/globalContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import { FaCheck, FaTimes } from "react-icons/fa";

export default function ApproveRequest({ params }) {
  const { data } = useGlobal()

  const [formData, setFormData] = useState({
    user: {
      name: '',
    },
    item: {
      name: '',
    },
    devolutionDate: '--/--/--',
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
      devolutionDate: requestData?.devolutionDate || '--/--/--'
    })
  }, [requestData])

  function handleFormChange(key: string, value: string) {
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

  function handleSubmit(status: string) {
    const globalData = {...data}

    const requestToSave = globalData.data.requests.map(request => {
      if (request.id == params.id) {
        return {
          ...request,
          ...formData,
          status,
        }
      }
      return request
    })

    globalData.data.requests = requestToSave

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
            <Label htmlFor="devolutionDate">Previsão Devolução</Label>
            <Input type="text" placeholder="dd/mm/yyyy" name="devolutionDate" id="devolutionDate" value={formData.devolutionDate} onChange={(e) => handleFormChange('devolutionDate', e.target.value)} />
          </div>
        </div>
        <div className="flex w-full gap-6">
          <Button className="w-full mb-4 bg-red-600 hover:bg-red-500" asChild onClick={() => handleSubmit('Reprovado')}><FaTimes /></Button>
          <Button className="w-full mb-4 bg-green-600 hover:bg-green-500" asChild onClick={() => handleSubmit('Aprovado')}><FaCheck /></Button>
        </div>
      </div>
    </main>
  )
}