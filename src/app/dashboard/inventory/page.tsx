"use client"

import React, { useEffect, useState } from "react"
import { Plus } from "lucide-react"
import DataTable from "@/components/DataTable"
import AddEditDialog from "@/components/AddEditDialog"
import DeleteDialog from "@/components/DeleteDialog"

interface InventoryItem {
  id: string
  name: string
  sku: string | null
  quantity: number
  price: number
}

interface CustomField {
  id: string
  fieldName: string
  fieldType: string
  appliesTo: string
}

export default function InventoryPage() {
  const [inventory, setInventory] = useState<InventoryItem[]>([])
  const [customFields, setCustomFields] = useState<CustomField[]>([])
  const [loading, setLoading] = useState(true)
  const [isAddEditOpen, setIsAddEditOpen] = useState(false)
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)
  const [editingItem, setEditingItem] = useState<InventoryItem | null>(null)
  const [deletingItem, setDeletingItem] = useState<InventoryItem | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    sku: '',
    quantity: '',
    price: ''
  })
  const [customFieldValues, setCustomFieldValues] = useState<Record<string, string>>({})

  useEffect(() => {
    fetchInventory()
    fetchCustomFields()
  }, [])

  const fetchInventory = async () => {
    try {
      const response = await fetch('/api/inventory')
      const data = await response.json()
      setInventory(data)
    } catch (error) {
      console.error('Error fetching inventory:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchCustomFields = async () => {
    try {
      const response = await fetch('/api/custom-fields?appliesTo=INVENTORY')
      const data = await response.json()
      setCustomFields(data)
    } catch (error) {
      console.error('Error fetching custom fields:', error)
    }
  }

  const handleAdd = () => {
    setEditingItem(null)
    setFormData({
      name: '',
      sku: '',
      quantity: '',
      price: ''
    })
    setCustomFieldValues({})
    setIsAddEditOpen(true)
  }

  const handleEdit = (item: InventoryItem) => {
    setEditingItem(item)
    setFormData({
      name: item.name,
      sku: item.sku || '',
      quantity: item.quantity.toString(),
      price: item.price.toString()
    })
    setCustomFieldValues({})
    setIsAddEditOpen(true)
  }

  const handleDelete = (item: InventoryItem) => {
    setDeletingItem(item)
    setIsDeleteOpen(true)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      const itemData = {
        ...formData,
        quantity: parseInt(formData.quantity),
        price: parseFloat(formData.price),
        sku: formData.sku || null
      }

      const url = editingItem ? `/api/inventory/${editingItem.id}` : '/api/inventory'
      const method = editingItem ? 'PUT' : 'POST'

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(itemData)
      })

      if (response.ok) {
        fetchInventory()
        setIsAddEditOpen(false)
      }
    } catch (error) {
      console.error('Error saving inventory item:', error)
    }
  }

  const confirmDelete = async () => {
    if (!deletingItem) return

    try {
      const response = await fetch(`/api/inventory/${deletingItem.id}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        fetchInventory()
        setIsDeleteOpen(false)
        setDeletingItem(null)
      }
    } catch (error) {
      console.error('Error deleting inventory item:', error)
    }
  }

  const columns = [
    { key: 'name' as keyof InventoryItem, header: 'Name' },
    { key: 'sku' as keyof InventoryItem, header: 'SKU' },
    { key: 'quantity' as keyof InventoryItem, header: 'Quantity' },
    { 
      key: 'price' as keyof InventoryItem, 
      header: 'Price',
      render: (value: unknown) => `$${(value as number).toFixed(2)}`
    }
  ]

  if (loading) {
    return <div className="flex items-center justify-center h-64">Loading...</div>
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Inventory</h1>
        <button
          onClick={handleAdd}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Item
        </button>
      </div>

      <div className="bg-white rounded-lg shadow">
        <DataTable
          data={inventory}
          columns={columns}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>

      <AddEditDialog
        isOpen={isAddEditOpen}
        onClose={() => setIsAddEditOpen(false)}
        title={editingItem ? 'Edit Item' : 'Add Item'}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full border border-gray-300 rounded-md px-3 py-2"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              SKU
            </label>
            <input
              type="text"
              value={formData.sku}
              onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
              className="w-full border border-gray-300 rounded-md px-3 py-2"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Quantity
            </label>
            <input
              type="number"
              value={formData.quantity}
              onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
              className="w-full border border-gray-300 rounded-md px-3 py-2"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Price
            </label>
            <input
              type="number"
              step="0.01"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              className="w-full border border-gray-300 rounded-md px-3 py-2"
              required
            />
          </div>

          {customFields.map((field) => (
            <div key={field.id}>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {field.fieldName}
              </label>
              {field.fieldType === 'TEXT' && (
                <input
                  type="text"
                  value={customFieldValues[field.id] || ''}
                  onChange={(e) => setCustomFieldValues({
                    ...customFieldValues,
                    [field.id]: e.target.value
                  })}
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                />
              )}
              {field.fieldType === 'NUMBER' && (
                <input
                  type="number"
                  value={customFieldValues[field.id] || ''}
                  onChange={(e) => setCustomFieldValues({
                    ...customFieldValues,
                    [field.id]: e.target.value
                  })}
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                />
              )}
              {field.fieldType === 'DATE' && (
                <input
                  type="date"
                  value={customFieldValues[field.id] || ''}
                  onChange={(e) => setCustomFieldValues({
                    ...customFieldValues,
                    [field.id]: e.target.value
                  })}
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                />
              )}
            </div>
          ))}
          
          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={() => setIsAddEditOpen(false)}
              className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              {editingItem ? 'Update' : 'Create'}
            </button>
          </div>
        </form>
      </AddEditDialog>

      <DeleteDialog
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={confirmDelete}
        title="Delete Item"
        message={`Are you sure you want to delete ${deletingItem?.name}?`}
      />
    </div>
  )
}
