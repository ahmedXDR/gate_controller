import { NextRequest, NextResponse } from 'next/server';
import { config } from '@/config';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const path = searchParams.get('path') || '';
  
  try {
    const response = await fetch(`${config.backendUrl}${config.apiBasePath}${path}`, {
      headers: {
        'Authorization': request.headers.get('Authorization') || '',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch from backend');
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to proxy request' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const path = searchParams.get('path') || '';
  
  try {
    const response = await fetch(`${config.backendUrl}${config.apiBasePath}${path}`, {
      method: 'POST',
      headers: {
        'Authorization': request.headers.get('Authorization') || '',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch from backend');
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to proxy request' }, { status: 500 });
  }
} 