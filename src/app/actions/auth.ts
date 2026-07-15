"use server";

import { cookies } from 'next/headers';

export async function login(formData: FormData) {
  const username = formData.get('username');
  const password = formData.get('password');

  const expectedUsername = process.env.ADMIN_USERNAME || 'admin';
  const expectedPassword = process.env.ADMIN_PASSWORD || 'saisilks123';

  if (username === expectedUsername && password === expectedPassword) {
    const cookieStore = await cookies();
    cookieStore.set('admin_session', 'true', { 
      secure: process.env.NODE_ENV === 'production',
      httpOnly: true,
      path: '/',
      maxAge: 60 * 60 * 24 * 7 // 1 week
    });
    return { success: true };
  }

  return { success: false, error: 'Invalid username or password' };
}

import { redirect } from 'next/navigation';

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete('admin_session');
  redirect('/admin');
}
