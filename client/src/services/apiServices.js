export const apiClient = async (endpoint, option = {}) => {
  const clearEndpoint = endpoint.replace(/^\//, '');
  const url = `${process.env.API_URL}${clearEndpoint}`;

  console.log(url);

  const headers = {
    'Content-Type': 'application/json',
    ...option.headers,
  };

  const response = await fetch(url, {
    method: option.method || 'GET',
    headers,
    body: option.body,
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`API error: ${response.status} - ${errorBody}`);
  }

  return response.json();
};
