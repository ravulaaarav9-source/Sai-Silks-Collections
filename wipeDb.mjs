import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://bptmbghtfvrsxskvtdlb.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJwdG1iZ2h0ZnZyc3hza3Z0ZGxiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQxMDE1NTksImV4cCI6MjA5OTY3NzU1OX0.XFNJg6DsgAEsHnlMFAN3X2Oy4fwU3JYVe_18mLVv0IM';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function wipe() {
  const { data, error } = await supabase.from('products').delete().neq('id', '00000000-0000-0000-0000-000000000000');
  if (error) {
    console.error('Error wiping db:', error);
  } else {
    console.log('Successfully wiped database!');
  }
}

wipe();
