'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    // Simply check if credentials exist
    const credentials = localStorage.getItem('auth_credentials');
    if (!credentials) {
      router.push('/login');
    }
  }, [router]);

  const handleOpenGate = async () => {
    setIsLoading(true);
    setError('');
    const credentials = localStorage.getItem('auth_credentials');

    if (!credentials) {
      router.push('/login');
      return;
    }

    try {
      const response = await fetch(`/api/proxy?path=/gate/open`, {
        method: 'GET',
        headers: {
          'Authorization': `Basic ${credentials}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to open gate');
      }

      const data = await response.json();
      setMessage(data.message);
    } catch (error) {
      setError('Error opening gate');
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Gate Controller</h1>
          <button
            onClick={() => {
              localStorage.removeItem('auth_credentials');
              router.push('/login');
            }}
            className="text-sm font-bold text-gray-600 hover:text-gray-900"
          >
            Logout
          </button>
        </div>
      </header>
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4 text-gray-900">Gate Control</h2>
            <button
              onClick={handleOpenGate}
              disabled={isLoading}
              className={`w-full bg-indigo-600 font-bold text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''
                }`}
            >
              {isLoading ? 'Opening...' : 'Open Gate'}
            </button>
            {error && (
              <p className="mt-4 text-center font-bold text-red-600">{error}</p>
            )}
            {message && !error && (
              <p className="mt-4 text-center font-bold text-green-600">{message}</p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
