"use client"

import React from "react"
import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import { FileText, Receipt, Package, DollarSign } from "lucide-react"

interface DashboardStats {
  totalInvoices: number
  totalExpenses: number
  totalInventoryItems: number
  totalRevenue: number
}

export default function Dashboard() {
  const { data: session } = useSession()
  const [stats, setStats] = useState<DashboardStats>({
    totalInvoices: 0,
    totalExpenses: 0,
    totalInventoryItems: 0,
    totalRevenue: 0
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [invoicesRes, expensesRes, inventoryRes] = await Promise.all([
          fetch('/api/invoices'),
          fetch('/api/expenses'),
          fetch('/api/inventory')
        ])

        const [invoices, expenses, inventory] = await Promise.all([
          invoicesRes.json(),
          expensesRes.json(),
          inventoryRes.json()
        ])

        const totalRevenue = invoices.reduce((sum: number, invoice: { status: string; amount: number }) => 
          invoice.status === 'Paid' ? sum + invoice.amount : sum, 0
        )

        setStats({
          totalInvoices: invoices.length,
          totalExpenses: expenses.length,
          totalInventoryItems: inventory.length,
          totalRevenue
        })
      } catch (error) {
        console.error('Error fetching stats:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg">Loading dashboard...</div>
      </div>
    )
  }

  const statCards = [
    {
      name: 'Total Invoices',
      value: stats.totalInvoices,
      icon: FileText,
      color: 'bg-blue-500'
    },
    {
      name: 'Total Expenses',
      value: stats.totalExpenses,
      icon: Receipt,
      color: 'bg-red-500'
    },
    {
      name: 'Inventory Items',
      value: stats.totalInventoryItems,
      icon: Package,
      color: 'bg-green-500'
    },
    {
      name: 'Total Revenue',
      value: `$${stats.totalRevenue.toFixed(2)}`,
      icon: DollarSign,
      color: 'bg-purple-500'
    }
  ]

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">
          Welcome back, {session?.user?.name || session?.user?.email}!
        </h1>
        <p className="text-gray-600">Here&apos;s an overview of your business</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat) => {
          const Icon = stat.icon
          return (
            <div key={stat.name} className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
