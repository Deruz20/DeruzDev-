import { render, screen } from '@testing-library/react'
import DataTable from '@/components/DataTable'

const mockData = [
  { id: '1', name: 'Test Item', amount: 100 },
  { id: '2', name: 'Another Item', amount: 200 },
]

const mockColumns = [
  { key: 'name' as keyof typeof mockData[0], header: 'Name' },
  { key: 'amount' as keyof typeof mockData[0], header: 'Amount' },
]

describe('DataTable', () => {
  it('renders table with data', () => {
    render(<DataTable data={mockData} columns={mockColumns} />)
    
    expect(screen.getByText('Test Item')).toBeInTheDocument()
    expect(screen.getByText('Another Item')).toBeInTheDocument()
  })

  it('shows no data message when empty', () => {
    render(<DataTable data={[]} columns={mockColumns} />)
    
    expect(screen.getByText('No data available')).toBeInTheDocument()
  })
})
