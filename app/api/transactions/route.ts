import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const supabase = createRouteHandlerClient({ cookies });
  const { data: { session } } = await supabase.auth.getSession();

  if (!session) {
    return new NextResponse(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
  }

  const { text, amount, client, project, date } = await request.json();

  if (!text || !amount || !date) {
    return new NextResponse(JSON.stringify({ error: 'Missing required fields' }), { status: 400 });
  }

  const { data, error } = await supabase
    .from('transactions')
    .insert([{ text, amount, client, project, date, user_id: session.user.id }])
    .select();
  
  if (error) {
    return new NextResponse(JSON.stringify({ error: error.message }), { status: 500 });
  }

  return NextResponse.json(data);
}
