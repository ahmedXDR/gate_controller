'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        try {
            // Store credentials in localStorage for future requests
            const credentials = btoa(`${username}:${password}`);

            // Test the credentials using the login endpoint
            const response = await fetch(`/api/proxy?path=/auth/login`, {
                method: 'POST',
                headers: {
                    'Authorization': `Basic ${credentials}`
                }
            });

            if (!response.ok) {
                throw new Error('Login failed');
            }

            // Store credentials only after successful login
            localStorage.setItem('auth_credentials', credentials);

            // Redirect to home page on successful login
            router.push('/');
        } catch (err) {
            setError('Invalid username or password');
            console.error('Login error:', err);
            localStorage.removeItem('auth_credentials');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-96">
                <h1 className="text-3xl font-bold mb-8 text-center text-gray-900">Login</h1>
                {error && (
                    <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md text-base font-medium">
                        {error}
                    </div>
                )}
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="username" className="block text-base font-semibold text-gray-900 mb-2">
                            Username
                        </label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="mt-1 block w-full rounded-md border-2 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-lg px-4 py-3 placeholder-gray-500 text-gray-900 font-medium"
                            placeholder="Enter your username"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-base font-semibold text-gray-900 mb-2">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="mt-1 block w-full rounded-md border-2 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-lg px-4 py-3 placeholder-gray-500 text-gray-900 font-medium"
                            placeholder="Enter your password"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-indigo-600 text-white py-3 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 text-lg font-medium"
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
} 