'use client'

import { useGlobal } from '@/app/context/globalContext';
import mainIcon from '@/public/main-icon.svg';
import Image from "next/image";
import Link from "next/link";
import { usePathname } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import { FaUser } from "react-icons/fa";

export function Navbar() {
  const [shouldRender, setShouldRender] = useState(false)
  const pathname = usePathname()

  const pathsUnrendered = useMemo(() => ['/', '/password-recovery'], [])

  const { setData } = useGlobal()

  useEffect(() => {
    fetch(`${window.location.protocol}//${window.location.host}/api/global`, {
      method: 'GET',
      next: {
        tags: ['get-global']
      }
    })
    .then(res => res.json())
    .then(res => setData(res))
  }, [setData])

  useEffect(() => {
    setShouldRender(!pathsUnrendered.includes(pathname))
  }, [pathname, pathsUnrendered])

  return (
    <>
      { shouldRender && (
        <div className="w-full flex gap-6 bg-gray-300 items-center h-20">
          <div className='w-full'>
            <Image src={mainIcon} alt="main app icon" />
          </div>
          <div className="flex gap-4 items-center">
            <Link href="/requests" className='font-bold'>Solicitações</Link>
            <Link href="/users" className='font-bold'>Usuários</Link>
            <Link href="/dashboard" className='font-bold'>Dashboard</Link>
            <Link href="/items" className='font-bold'>Estoque</Link>
          </div>
          <div className="flex gap-3 px-4">
            <p className="text-xl"><FaUser  /></p>
          </div>
        </div>
      ) }
    </>
  )
}