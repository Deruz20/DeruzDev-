import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import SignOutButton from '@/components/SignOutButton';
import TransactionChart from '@/components/TransactionChart'; // Import the new chart component

// Define a type for our transaction for type safety
export type Transaction = {
  id: number;
  created_at: string;
  text: string;
  amount: number;
  client: string | null;
  project: string | null;
  date: string;
  user_id: string;
};

export default async function DashboardPage() {
  const supabase = createServerComponentClient({ cookies });

  const { data: { session } } = await supabase.auth.getSession();

  if (!session) {
    redirect('/login');
  }

  // Fetch transactions securely on the server
  const { data: transactions } = await supabase
    .from('transactions')
    .select('*')
    .eq('user_id', session.user.id);

  const safeTransactions = transactions || [];

  const totalBalance = safeTransactions.reduce((acc, t) => acc + t.amount, 0);
  const totalIncome = safeTransactions.filter(t => t.amount > 0).reduce((acc, t) => acc + t.amount, 0);
  const totalExpense = safeTransactions.filter(t => t.amount < 0).reduce((acc, t) => acc + t.amount, 0);
  
  return (
    <div className="p-4 md:p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back, {session.user.email}</p>
        </div>
        <SignOutButton />
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <div className="p-6 bg-card rounded-lg border">
          <h3 className="text-sm font-medium text-muted-foreground">Total Balance</h3>
          <p className="text-3xl font-bold">UGX {totalBalance.toLocaleString()}</p>
        </div>
        <div className="p-6 bg-card rounded-lg border">
          <h3 className="text-sm font-medium text-muted-foreground">Net Profit</h3>
          <p className="text-3xl font-bold">UGX {(totalIncome + totalExpense).toLocaleString()}</p>
        </div>
        <div className="p-6 bg-card rounded-lg border">
          <h3 className="text-sm font-medium text-muted-foreground">Total Income</h3>
          <p className="text-3xl font-bold text-green-500">+UGX {totalIncome.toLocaleString()}</p>
        </div>
        <div className="p-6 bg-card rounded-lg border">
          <h3 className="text-sm font-medium text-muted-foreground">Total Expense</h3>
          <p className="text-3xl font-bold text-red-500">-UGX {Math.abs(totalExpense).toLocaleString()}</p>
        </div>
      </div>
      
      <div className="p-6 bg-card rounded-lg border">
        <h3 className="text-xl font-bold mb-4">Financial Overview</h3>
        {/* Use the new chart component and pass the data to it */}
        <TransactionChart transactions={safeTransactions} />
      </div>
    </div>
  );
}
