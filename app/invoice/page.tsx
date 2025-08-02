import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import InvoiceGenerator from '@/components/InvoiceGenerator';

export default async function InvoicePage() {
  const supabase = createServerComponentClient({ cookies });
  const { data: { session } } = await supabase.auth.getSession();

  if (!session) {
    redirect('/login');
  }

  return (
    <div className="p-4 md:p-8">
      <h1 className="text-3xl font-bold mb-8">Invoice Generator</h1>
      <InvoiceGenerator />
    </div>
  );
}
