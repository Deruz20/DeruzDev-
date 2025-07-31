'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SignUpPage() {
  const [name, setName] = useState('');
    const [email, setEmail] = useState('');
      const [password, setPassword] = useState('');
        const [error, setError] = useState('');
          const router = useRouter();

            const handleSubmit = async (e: React.FormEvent) => {
                e.preventDefault();
                    setError('');

                        if (!name || !email || !password) {
                              setError('All fields are necessary.');
                                    return;
                                        }

                                            try {
                                                  const res = await fetch('/api/auth/register', {
                                                          method: 'POST',
                                                                  headers: {
                                                                            'Content-Type': 'application/json',
                                                                                    },
                                                                                            body: JSON.stringify({ name, email, password }),
                                                                                                  });

                                                                                                        if (res.ok) {
                                                                                                                router.push('/api/auth/signin'); // Redirect to signin page on success
                                                                                                                      } else {
                                                                                                                              const data = await res.json();
                                                                                                                                      setError(data.message || 'User registration failed.');
                                                                                                                                            }
                                                                                                                                                } catch (error) {
                                                                                                                                                      setError('Something went wrong.');
                                                                                                                                                          }
                                                                                                                                                            };

                                                                                                                                                              return (
                                                                                                                                                                  <div style={{ maxWidth: '400px', margin: 'auto', paddingTop: '50px' }}>
                                                                                                                                                                        <h1>Sign Up</h1>
                                                                                                                                                                              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                                                                                                                                                                      <input onChange={(e) => setName(e.target.value)} type="text" placeholder="Name" />
                                                                                                                                                                                              <input onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Email" />
                                                                                                                                                                                                      <input onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" />
                                                                                                                                                                                                              <button type="submit" style={{ padding: '10px', cursor: 'pointer' }}>
                                                                                                                                                                                                                        Sign Up
                                                                                                                                                                                                                                </button>

                                                                                                                                                                                                                                        {error && <div style={{ color: 'red', marginTop: '10px' }}>{error}</div>}
                                                                                                                                                                                                                                              </form>
                                                                                                                                                                                                                                                    <a href="/api/auth/signin" style={{ display: 'block', marginTop: '10px' }}>
                                                                                                                                                                                                                                                            Already have an account? Sign In
                                                                                                                                                                                                                                                                  </a>
                                                                                                                                                                                                                                                                      </div>
                                                                                                                                                                                                                                                                        );
                                                                                                                                                                                                                                                                        }
                                                                                                                                                                                                                                                                        