export const apiClient = async (endpoint, option = {}) => {
  const clearEndpoint = endpoint.replace(/^\//, '');
  const url = `${process.env.API_URL}${clearEndpoint}`;

  const headers = {
    'Content-Type': 'application/json',
    ...option.headers,
  };

  const response = await fetch(url, {
    method: option.method || 'GET',
    headers,
    body: option.body,
  });

  const data = await response.json();

  if (!response.ok) {
    const error = new Error(data.massage || 'API error');
    error.status = response.status;
    error.data = data;
    throw error;
  }
  return data;
};
