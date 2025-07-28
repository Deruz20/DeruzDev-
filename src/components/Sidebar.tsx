"use client"

import React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { signOut } from "next-auth/react"
import { 
  FileText, 
  Receipt, 
  Package, 
  Settings, 
  LogOut,
  BarChart3
} from "lucide-react"

interface SidebarProps {
  enabledModules: {
    invoices: boolean
    expenses: boolean
    inventory: boolean
  }
}

export default function Sidebar({ enabledModules }: SidebarProps) {
  const pathname = usePathname()

  const navigation = [
    {
      name: 'Dashboard',
      href: '/dashboard',
      icon: BarChart3,
      enabled: true
    },
    {
      name: 'Invoices',
      href: '/dashboard/invoices',
      icon: FileText,
      enabled: enabledModules.invoices
    },
    {
      name: 'Expenses',
      href: '/dashboard/expenses',
      icon: Receipt,
      enabled: enabledModules.expenses
    },
    {
      name: 'Inventory',
      href: '/dashboard/inventory',
      icon: Package,
      enabled: enabledModules.inventory
    },
    {
      name: 'Settings',
      href: '/dashboard/settings',
      icon: Settings,
      enabled: true
    }
  ]

  return (
    <div className="w-64 bg-white shadow-lg">
      <div className="p-6">
        <h1 className="text-xl font-bold text-gray-900">OmniTrack</h1>
      </div>
      
      <nav className="mt-6">
        {navigation.map((item) => {
          if (!item.enabled) return null
          
          const isActive = pathname === item.href
          const Icon = item.icon
          
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center px-6 py-3 text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <Icon className="mr-3 h-5 w-5" />
              {item.name}
            </Link>
          )
        })}
      </nav>
      
      <div className="absolute bottom-20 left-0 right-0 px-6">
        <button
          onClick={() => signOut()}
          className="flex items-center w-full px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-md transition-colors"
        >
          <LogOut className="mr-3 h-5 w-5" />
          Sign Out
        </button>
      </div>
    </div>
  )
}
