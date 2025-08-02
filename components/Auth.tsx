'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase';

export default function Auth() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSigningUp, setIsSigningUp] = useState(false);
  const [message, setMessage] = useState('');
  const supabase = createClient();

  const handleAuthAction = async () => {
    setMessage('');
    if (isSigningUp) {
      // Sign up
      const { error } = await supabase.auth.signUp({ email, password });
      if (error) setMessage(error.message);
      else setMessage('Check your email for a confirmation link!');
    } else {
      // Sign in
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) setMessage(error.message);
      // Redirect is handled by the callback route
    }
  };

  const handleGuestSignIn = async () => {
    setMessage('');
    const { error } = await supabase.auth.signInWithPassword({
      email: 'guest@biztrack.com',
      password: 'guestpassword',
    });
    if (error) setMessage("Could not sign in as guest. Please contact support.");
  };

  return (
    <div className="w-full max-w-sm p-8 space-y-6 bg-card rounded-xl shadow-lg border">
      <h1 className="text-3xl font-bold text-center text-white">
        {isSigningUp ? 'Create Account' : 'Welcome Back'}
      </h1>
      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium text-muted-foreground" htmlFor="email">Email</label>
          <input
            className="w-full px-3 py-2 mt-1 bg-input rounded-md focus:ring focus:ring-primary"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
          />
        </div>
        <div>
          <label className="text-sm font-medium text-muted-foreground" htmlFor="password">Password</label>
          <input
            className="w-full px-3 py-2 mt-1 bg-input rounded-md focus:ring focus:ring-primary"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
          />
        </div>
      </div>
      {message && <p className="text-sm text-center text-red-400">{message}</p>}
      <button onClick={handleAuthAction} className="w-full py-3 font-semibold text-white bg-primary rounded-md hover:bg-primary/90 transition-all">
        {isSigningUp ? 'Sign Up' : 'Sign In'}
      </button>
      <div className="text-center">
        <button onClick={() => setIsSigningUp(!isSigningUp)} className="text-sm text-muted-foreground hover:text-white">
          {isSigningUp ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
        </button>
      </div>
      <div className="relative"><div className="absolute inset-0 flex items-center"><span className="w-full border-t"></span></div><div className="relative flex justify-center text-xs uppercase"><span className="px-2 bg-card text-muted-foreground">Or</span></div></div>
      <button onClick={handleGuestSignIn} className="w-full py-3 font-semibold text-white bg-secondary rounded-md hover:bg-secondary/90 transition-all">
        Sign In as Guest (Demo)
      </button>
    </div>
  );
}
