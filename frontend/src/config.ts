export const config = {
    backendUrl: process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8000',
    apiBasePath: '/api/v1',
} as const;

export const apiUrl = (path: string) => `${config.backendUrl}${config.apiBasePath}${path}`; 