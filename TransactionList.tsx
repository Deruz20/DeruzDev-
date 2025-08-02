'use client';

import { Transaction } from '@/app/transactions/page';

interface TransactionListProps {
  initialTransactions: Transaction[];
}

export default function TransactionList({ initialTransactions }: TransactionListProps) {
  const currencyFormatter = new Intl.NumberFormat('en-UG', { style: 'currency', currency: 'UGX', minimumFractionDigits: 0 });

  return (
    <div className="p-6 bg-card rounded-lg border">
      <h3 className="text-xl font-bold mb-4">History</h3>
      {initialTransactions.length === 0 ? (
        <p className="text-muted-foreground">No transactions found.</p>
      ) : (
        <ul className="space-y-3">
          {initialTransactions.map((t) => (
            <li key={t.id} className={`flex justify-between items-center p-4 rounded-lg border-l-4 ${t.amount > 0 ? 'border-green-500' : 'border-red-500'} bg-background`}>
              <div>
                <p className="font-semibold">{t.text}</p>
                <p className="text-sm text-muted-foreground">{t.client || 'N/A'} - {new Date(t.date).toLocaleDateString()}</p>
              </div>
              <p className={`font-bold ${t.amount > 0 ? 'text-green-500' : 'text-red-500'}`}>
                {currencyFormatter.format(t.amount)}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
