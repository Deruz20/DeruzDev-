"use client"

import React, { useEffect, useState } from "react"
import { Plus } from "lucide-react"
import DataTable from "@/components/DataTable"
import AddEditDialog from "@/components/AddEditDialog"
import DeleteDialog from "@/components/DeleteDialog"

interface Expense {
  id: string
  itemName: string
  category: string
  amount: number
  purchaseDate: string
  createdAt: string
}

interface CustomField {
  id: string
  fieldName: string
  fieldType: string
  appliesTo: string
}

export default function ExpensesPage() {
  const [expenses, setExpenses] = useState<Expense[]>([])
  const [customFields, setCustomFields] = useState<CustomField[]>([])
  const [loading, setLoading] = useState(true)
  const [isAddEditOpen, setIsAddEditOpen] = useState(false)
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)
  const [editingExpense, setEditingExpense] = useState<Expense | null>(null)
  const [deletingExpense, setDeletingExpense] = useState<Expense | null>(null)
  const [formData, setFormData] = useState({
    itemName: '',
    category: '',
    amount: '',
    purchaseDate: ''
  })
  const [customFieldValues, setCustomFieldValues] = useState<Record<string, string>>({})

  useEffect(() => {
    fetchExpenses()
    fetchCustomFields()
  }, [])

  const fetchExpenses = async () => {
    try {
      const response = await fetch('/api/expenses')
      const data = await response.json()
      setExpenses(data)
    } catch (error) {
      console.error('Error fetching expenses:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchCustomFields = async () => {
    try {
      const response = await fetch('/api/custom-fields?appliesTo=EXPENSE')
      const data = await response.json()
      setCustomFields(data)
    } catch (error) {
      console.error('Error fetching custom fields:', error)
    }
  }

  const handleAdd = () => {
    setEditingExpense(null)
    setFormData({
      itemName: '',
      category: '',
      amount: '',
      purchaseDate: ''
    })
    setCustomFieldValues({})
    setIsAddEditOpen(true)
  }

  const handleEdit = (expense: Expense) => {
    setEditingExpense(expense)
    setFormData({
      itemName: expense.itemName,
      category: expense.category,
      amount: expense.amount.toString(),
      purchaseDate: expense.purchaseDate.split('T')[0]
    })
    setCustomFieldValues({})
    setIsAddEditOpen(true)
  }

  const handleDelete = (expense: Expense) => {
    setDeletingExpense(expense)
    setIsDeleteOpen(true)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      const expenseData = {
        ...formData,
        amount: parseFloat(formData.amount),
        purchaseDate: new Date(formData.purchaseDate).toISOString()
      }

      const url = editingExpense ? `/api/expenses/${editingExpense.id}` : '/api/expenses'
      const method = editingExpense ? 'PUT' : 'POST'

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(expenseData)
      })

      if (response.ok) {
        fetchExpenses()
        setIsAddEditOpen(false)
      }
    } catch (error) {
      console.error('Error saving expense:', error)
    }
  }

  const confirmDelete = async () => {
    if (!deletingExpense) return

    try {
      const response = await fetch(`/api/expenses/${deletingExpense.id}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        fetchExpenses()
        setIsDeleteOpen(false)
        setDeletingExpense(null)
      }
    } catch (error) {
      console.error('Error deleting expense:', error)
    }
  }

  const columns = [
    { key: 'itemName' as keyof Expense, header: 'Item' },
    { key: 'category' as keyof Expense, header: 'Category' },
    { 
      key: 'amount' as keyof Expense, 
      header: 'Amount',
      render: (value: unknown) => `$${(value as number).toFixed(2)}`
    },
    { 
      key: 'purchaseDate' as keyof Expense, 
      header: 'Purchase Date',
      render: (value: unknown) => new Date(value as string).toLocaleDateString()
    }
  ]

  if (loading) {
    return <div className="flex items-center justify-center h-64">Loading...</div>
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Expenses</h1>
        <button
          onClick={handleAdd}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Expense
        </button>
      </div>

      <div className="bg-white rounded-lg shadow">
        <DataTable
          data={expenses}
          columns={columns}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>

      <AddEditDialog
        isOpen={isAddEditOpen}
        onClose={() => setIsAddEditOpen(false)}
        title={editingExpense ? 'Edit Expense' : 'Add Expense'}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Item Name
            </label>
            <input
              type="text"
              value={formData.itemName}
              onChange={(e) => setFormData({ ...formData, itemName: e.target.value })}
              className="w-full border border-gray-300 rounded-md px-3 py-2"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category
            </label>
            <input
              type="text"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full border border-gray-300 rounded-md px-3 py-2"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Amount
            </label>
            <input
              type="number"
              step="0.01"
              value={formData.amount}
              onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
              className="w-full border border-gray-300 rounded-md px-3 py-2"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Purchase Date
            </label>
            <input
              type="date"
              value={formData.purchaseDate}
              onChange={(e) => setFormData({ ...formData, purchaseDate: e.target.value })}
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
              {editingExpense ? 'Update' : 'Create'}
            </button>
          </div>
        </form>
      </AddEditDialog>

      <DeleteDialog
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={confirmDelete}
        title="Delete Expense"
        message={`Are you sure you want to delete expense ${deletingExpense?.itemName}?`}
      />
    </div>
  )
}
