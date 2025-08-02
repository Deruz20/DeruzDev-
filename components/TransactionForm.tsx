'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function TransactionForm() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);

    const formData = new FormData(event.currentTarget);
    const newTransaction = {
      text: formData.get('text'),
      amount: Number(formData.get('amount')),
      client: formData.get('client'),
      project: formData.get('project'),
      date: formData.get('date'),
    };

    const response = await fetch('/api/transactions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newTransaction),
    });

    if (response.ok) {
      (event.target as HTMLFormElement).reset();
      // Refresh the page to show the new transaction list
      router.refresh();
    } else {
      alert('Failed to add transaction.');
    }
    
    setIsLoading(false);
  };

  return (
    <div className="p-6 bg-card rounded-lg border">
      <h3 className="text-xl font-bold mb-4">Add New Transaction</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="form-group"><label htmlFor="text">Description</label><input name="text" type="text" className="form-input" required /></div>
        <div className="form-group"><label htmlFor="amount">Amount (UGX)</label><input name="amount" type="number" step="any" className="form-input" required /></div>
        <div className="form-group"><label htmlFor="client">Client</label><input name="client" type="text" className="form-input" /></div>
        <div className="form-group"><label htmlFor="project">Project</label><input name="project" type="text" className="form-input" /></div>
        <div className="form-group"><label htmlFor="date">Date</label><input name="date" type="date" className="form-input" required defaultValue={new Date().toISOString().split('T')[0]} /></div>
        <button type="submit" className="btn w-full" disabled={isLoading}>
          {isLoading ? 'Saving...' : 'Save Transaction'}
        </button>
      </form>
    </div>
  );
}
