"use client"

import React, { useEffect, useState } from "react"
import { Plus } from "lucide-react"
import DataTable from "@/components/DataTable"
import AddEditDialog from "@/components/AddEditDialog"
import DeleteDialog from "@/components/DeleteDialog"

interface Invoice {
  id: string
  invoiceNumber: string
  clientName: string
  amount: number
  status: string
  dueDate: string
  createdAt: string
}

interface CustomField {
  id: string
  fieldName: string
  fieldType: string
  appliesTo: string
}

export default function InvoicesPage() {
  const [invoices, setInvoices] = useState<Invoice[]>([])
  const [customFields, setCustomFields] = useState<CustomField[]>([])
  const [loading, setLoading] = useState(true)
  const [isAddEditOpen, setIsAddEditOpen] = useState(false)
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)
  const [editingInvoice, setEditingInvoice] = useState<Invoice | null>(null)
  const [deletingInvoice, setDeletingInvoice] = useState<Invoice | null>(null)
  const [formData, setFormData] = useState({
    invoiceNumber: '',
    clientName: '',
    amount: '',
    status: 'Draft',
    dueDate: ''
  })
  const [customFieldValues, setCustomFieldValues] = useState<Record<string, string>>({})

  useEffect(() => {
    fetchInvoices()
    fetchCustomFields()
  }, [])

  const fetchInvoices = async () => {
    try {
      const response = await fetch('/api/invoices')
      const data = await response.json()
      setInvoices(data)
    } catch (error) {
      console.error('Error fetching invoices:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchCustomFields = async () => {
    try {
      const response = await fetch('/api/custom-fields?appliesTo=INVOICE')
      const data = await response.json()
      setCustomFields(data)
    } catch (error) {
      console.error('Error fetching custom fields:', error)
    }
  }

  const handleAdd = () => {
    setEditingInvoice(null)
    setFormData({
      invoiceNumber: '',
      clientName: '',
      amount: '',
      status: 'Draft',
      dueDate: ''
    })
    setCustomFieldValues({})
    setIsAddEditOpen(true)
  }

  const handleEdit = (invoice: Invoice) => {
    setEditingInvoice(invoice)
    setFormData({
      invoiceNumber: invoice.invoiceNumber,
      clientName: invoice.clientName,
      amount: invoice.amount.toString(),
      status: invoice.status,
      dueDate: invoice.dueDate.split('T')[0]
    })
    setCustomFieldValues({})
    setIsAddEditOpen(true)
  }

  const handleDelete = (invoice: Invoice) => {
    setDeletingInvoice(invoice)
    setIsDeleteOpen(true)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      const invoiceData = {
        ...formData,
        amount: parseFloat(formData.amount),
        dueDate: new Date(formData.dueDate).toISOString()
      }

      const url = editingInvoice ? `/api/invoices/${editingInvoice.id}` : '/api/invoices'
      const method = editingInvoice ? 'PUT' : 'POST'

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(invoiceData)
      })

      if (response.ok) {
        fetchInvoices()
        setIsAddEditOpen(false)
      }
    } catch (error) {
      console.error('Error saving invoice:', error)
    }
  }

  const confirmDelete = async () => {
    if (!deletingInvoice) return

    try {
      const response = await fetch(`/api/invoices/${deletingInvoice.id}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        fetchInvoices()
        setIsDeleteOpen(false)
        setDeletingInvoice(null)
      }
    } catch (error) {
      console.error('Error deleting invoice:', error)
    }
  }

  const columns = [
    { key: 'invoiceNumber' as keyof Invoice, header: 'Invoice #' },
    { key: 'clientName' as keyof Invoice, header: 'Client' },
    { 
      key: 'amount' as keyof Invoice, 
      header: 'Amount',
      render: (value: unknown) => `$${(value as number).toFixed(2)}`
    },
    { key: 'status' as keyof Invoice, header: 'Status' },
    { 
      key: 'dueDate' as keyof Invoice, 
      header: 'Due Date',
      render: (value: unknown) => new Date(value as string).toLocaleDateString()
    }
  ]

  if (loading) {
    return <div className="flex items-center justify-center h-64">Loading...</div>
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Invoices</h1>
        <button
          onClick={handleAdd}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Invoice
        </button>
      </div>

      <div className="bg-white rounded-lg shadow">
        <DataTable
          data={invoices}
          columns={columns}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>

      <AddEditDialog
        isOpen={isAddEditOpen}
        onClose={() => setIsAddEditOpen(false)}
        title={editingInvoice ? 'Edit Invoice' : 'Add Invoice'}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Invoice Number
            </label>
            <input
              type="text"
              value={formData.invoiceNumber}
              onChange={(e) => setFormData({ ...formData, invoiceNumber: e.target.value })}
              className="w-full border border-gray-300 rounded-md px-3 py-2"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Client Name
            </label>
            <input
              type="text"
              value={formData.clientName}
              onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
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
              Status
            </label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              className="w-full border border-gray-300 rounded-md px-3 py-2"
            >
              <option value="Draft">Draft</option>
              <option value="Sent">Sent</option>
              <option value="Paid">Paid</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Due Date
            </label>
            <input
              type="date"
              value={formData.dueDate}
              onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
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
              {editingInvoice ? 'Update' : 'Create'}
            </button>
          </div>
        </form>
      </AddEditDialog>

      <DeleteDialog
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={confirmDelete}
        title="Delete Invoice"
        message={`Are you sure you want to delete invoice ${deletingInvoice?.invoiceNumber}?`}
      />
    </div>
  )
}
