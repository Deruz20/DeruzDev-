import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

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

  return (
    <div className="p-4 md:p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">Welcome, {session.user.email}</p>
      </div>
      <div className="text-white">
        <h2 className="text-xl mb-4">Your Transactions:</h2>
        {transactions && transactions.length > 0 ? (
          <pre className="p-4 bg-card rounded-md border text-sm">
            {JSON.stringify(transactions, null, 2)}
          </pre>
        ) : (
          <p>You have no transactions yet.</p>
        )}
      </div>
    </div>
  );
}
