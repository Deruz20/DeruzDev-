"use client"

import React from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import Sidebar from "@/components/Sidebar"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [enabledModules, setEnabledModules] = useState({
    invoices: true,
    expenses: true,
    inventory: true
  })

  useEffect(() => {
    if (status === "loading") return
    
    if (!session) {
      router.push('/')
      return
    }

    fetch('/api/user/modules')
      .then(res => res.json())
      .then(data => {
        if (data.enabledModules) {
          setEnabledModules(data.enabledModules)
        }
      })
      .catch(console.error)
  }, [session, status, router])

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    )
  }

  if (!session) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar enabledModules={enabledModules} />
      <main className="flex-1 p-6 pb-16">
        {children}
      </main>
    </div>
  )
}
