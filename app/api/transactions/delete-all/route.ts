import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function DELETE() {
  const supabase = createRouteHandlerClient({ cookies });
  const { data: { session } } = await supabase.auth.getSession();

  if (!session) {
    return new NextResponse(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
  }

  const { error } = await supabase
    .from('transactions')
    .delete()
    .eq('user_id', session.user.id);

  if (error) {
    return new NextResponse(JSON.stringify({ error: error.message }), { status: 500 });
  }

  return NextResponse.json({ message: 'All transactions deleted successfully.' });
}
