import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import TransactionForm from '@/components/TransactionForm';
import TransactionList from '@/components/TransactionList';

export type Transaction = {
  id: number;
  text: string;
  amount: number;
  client: string | null;
  project: string | null;
  date: string;
};

async function getTransactions(supabase: any, userId: string): Promise<Transaction[]> {
    const { data } = await supabase
        .from('transactions')
        .select('*')
        .eq('user_id', userId)
        .order('date', { ascending: false });
    return data || [];
}

export default async function TransactionsPage() {
  const supabase = createServerComponentClient({ cookies });
  const { data: { session } } = await supabase.auth.getSession();

  if (!session) {
    redirect('/login');
  }

  const transactions = await getTransactions(supabase, session.user.id);

  return (
    <div className="p-4 md:p-8">
      <h1 className="text-3xl font-bold mb-8">Transactions</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <TransactionForm />
        </div>
        <div className="lg:col-span-2">
          <TransactionList initialTransactions={transactions} />
        </div>
      </div>
    </div>
  );
}
