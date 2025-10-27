/**
 * Utility functions for calling Cloudflare Workers
 */

/**
 * Call a Cloudflare Worker from Server Components or API Routes
 * 
 * @param workerUrl - Your Cloudflare Worker URL (e.g., 'https://your-worker.your-subdomain.workers.dev')
 * @param method - HTTP method (GET, POST, PUT, DELETE, etc.)
 * @param body - Optional request body (will be JSON stringified)
 * @param headers - Optional custom headers
 * @returns Promise with the response data
 */
export async function callCloudflareWorker(
  workerUrl: string,
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' = 'GET',
  body?: any,
  headers?: Record<string, string>
): Promise<any> {
  try {
    const options: RequestInit = {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
    };

    if (body && method !== 'GET') {
      options.body = JSON.stringify(body);
    }

    const response = await fetch(workerUrl, options);

    if (!response.ok) {
      throw new Error(`Worker request failed: ${response.status} ${response.statusText}`);
    }

    // Try to parse as JSON, fallback to text if not JSON
    const contentType = response.headers.get('content-type');
    let data;
    
    if (contentType && contentType.includes('application/json')) {
      data = await response.json();
    } else {
      data = await response.text();
    }
    
    return data;
  } catch (error) {
    console.error('Error calling Cloudflare Worker:', error);
    throw error;
  }
}

/**
 * Use this in Client Components
 */
export async function callWorkerFromClient(workerUrl: string, options?: {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  body?: any;
  headers?: Record<string, string>;
}) {
  const { method = 'GET', body, headers } = options || {};
  
  try {
    const response = await fetch(workerUrl, {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
      ...(body && { body: JSON.stringify(body) }),
    });

    if (!response.ok) {
      throw new Error(`Worker request failed: ${response.status}`);
    }

    // Try to parse as JSON, fallback to text if not JSON
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      return await response.json();
    } else {
      return await response.text();
    }
  } catch (error) {
    console.error('Error calling worker from client:', error);
    throw error;
  }
}
