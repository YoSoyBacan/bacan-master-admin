import axios from 'axios';


export async function post<T>(path: string, body: any, headers?: { [key: string]: string }) {
  const baseUrl = process.env.ADMIN_URL;
  const token = process.env.ADMIN_API_KEY;
  const fullUrl = `${baseUrl}/api/${path}`;
  const response = await axios.post(fullUrl, body, {
    headers: {
      Authorization: `Bearer ${token}`,
      ...headers,
    },
  });
  return {
    data: response.data as T,
    status: response.status,
    success: response.status >= 200 && response.status < 400,
  };
}

interface PathBody {
  body: Array<{
    op: string;
    field: string;
    value: string | number | Date
  }>
};

export async function put<T>(path: string, body: PathBody, headers?: { [key: string]: string }) {
  const baseUrl = process.env.ADMIN_URL;
  const token = process.env.ADMIN_API_KEY;
  const fullUrl = `${baseUrl}/api/${path}`;

  const response = await axios.put(fullUrl, body.body, {
    headers: {
      Authorization: `Bearer ${token}`,
      ...headers,
    },
  });
  return {
    data: response.data as T,
    status: response.status,
    success: response.status >= 200 && response.status < 400,
  }
}