"use client"

import React, { useEffect, useState } from "react"
import { Plus, Trash2 } from "lucide-react"

interface CustomField {
  id: string
  fieldName: string
  fieldType: string
  appliesTo: string
}

export default function SettingsPage() {
  const [enabledModules, setEnabledModules] = useState({
    invoices: true,
    expenses: true,
    inventory: true
  })
  const [customFields, setCustomFields] = useState<CustomField[]>([])
  const [newField, setNewField] = useState({
    fieldName: '',
    fieldType: 'TEXT',
    appliesTo: 'INVOICE'
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchSettings()
    fetchCustomFields()
  }, [])

  const fetchSettings = async () => {
    try {
      const response = await fetch('/api/user/modules')
      const data = await response.json()
      if (data.enabledModules) {
        setEnabledModules(data.enabledModules)
      }
    } catch (error) {
      console.error('Error fetching settings:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchCustomFields = async () => {
    try {
      const response = await fetch('/api/custom-fields')
      const data = await response.json()
      setCustomFields(data)
    } catch (error) {
      console.error('Error fetching custom fields:', error)
    }
  }

  const updateModules = async (newModules: typeof enabledModules) => {
    try {
      const response = await fetch('/api/user/modules', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ enabledModules: newModules })
      })

      if (response.ok) {
        setEnabledModules(newModules)
      }
    } catch (error) {
      console.error('Error updating modules:', error)
    }
  }

  const handleModuleToggle = (module: keyof typeof enabledModules) => {
    const newModules = {
      ...enabledModules,
      [module]: !enabledModules[module]
    }
    updateModules(newModules)
  }

  const handleAddCustomField = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      const response = await fetch('/api/custom-fields', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newField)
      })

      if (response.ok) {
        setNewField({
          fieldName: '',
          fieldType: 'TEXT',
          appliesTo: 'INVOICE'
        })
        fetchCustomFields()
      }
    } catch (error) {
      console.error('Error adding custom field:', error)
    }
  }

  const handleDeleteCustomField = async (fieldId: string) => {
    try {
      const response = await fetch(`/api/custom-fields/${fieldId}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        fetchCustomFields()
      }
    } catch (error) {
      console.error('Error deleting custom field:', error)
    }
  }

  if (loading) {
    return <div className="flex items-center justify-center h-64">Loading...</div>
  }

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold text-gray-900">Settings</h1>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold mb-4">Module Settings</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">Invoices</h3>
              <p className="text-sm text-gray-600">Manage your invoices and billing</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={enabledModules.invoices}
                onChange={() => handleModuleToggle('invoices')}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">Expenses</h3>
              <p className="text-sm text-gray-600">Track your business expenses</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={enabledModules.expenses}
                onChange={() => handleModuleToggle('expenses')}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">Inventory</h3>
              <p className="text-sm text-gray-600">Manage your inventory items</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={enabledModules.inventory}
                onChange={() => handleModuleToggle('inventory')}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold mb-4">Custom Fields</h2>
        
        <form onSubmit={handleAddCustomField} className="mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Field Name
              </label>
              <input
                type="text"
                value={newField.fieldName}
                onChange={(e) => setNewField({ ...newField, fieldName: e.target.value })}
                className="w-full border border-gray-300 rounded-md px-3 py-2"
                placeholder="e.g., Project Code"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Field Type
              </label>
              <select
                value={newField.fieldType}
                onChange={(e) => setNewField({ ...newField, fieldType: e.target.value })}
                className="w-full border border-gray-300 rounded-md px-3 py-2"
              >
                <option value="TEXT">Text</option>
                <option value="NUMBER">Number</option>
                <option value="DATE">Date</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Applies To
              </label>
              <select
                value={newField.appliesTo}
                onChange={(e) => setNewField({ ...newField, appliesTo: e.target.value })}
                className="w-full border border-gray-300 rounded-md px-3 py-2"
              >
                <option value="INVOICE">Invoice</option>
                <option value="EXPENSE">Expense</option>
                <option value="INVENTORY">Inventory</option>
              </select>
            </div>
            
            <div className="flex items-end">
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center justify-center"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Field
              </button>
            </div>
          </div>
        </form>

        <div className="space-y-2">
          {customFields.length === 0 ? (
            <p className="text-gray-500 text-center py-4">No custom fields created yet</p>
          ) : (
            customFields.map((field) => (
              <div key={field.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                <div>
                  <span className="font-medium">{field.fieldName}</span>
                  <span className="text-sm text-gray-600 ml-2">
                    ({field.fieldType.toLowerCase()}) - {field.appliesTo.toLowerCase()}
                  </span>
                </div>
                <button
                  onClick={() => handleDeleteCustomField(field.id)}
                  className="text-red-600 hover:text-red-800"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
