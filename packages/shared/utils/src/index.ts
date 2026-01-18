// API Configuration
export const getApiEndpoint = (isDevelopment = false): string => {
  if (isDevelopment) {
    // For development, you can use your local IP address or ngrok URL
    // Example: return 'http://192.168.1.100:8888/.netlify/functions/get-recipe';
    return 'https://withoutthestory.netlify.app/.netlify/functions/get-recipe';
  }
  return 'https://withoutthestory.netlify.app/.netlify/functions/get-recipe';
};

export const API_ENDPOINT = '/.netlify/functions/get-recipe';

export const fetchRecipe = async (
  data: string,
  endpoint: string = API_ENDPOINT
): Promise<{ recipe?: string; error?: string }> => {
  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ data }),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch recipe');
    }

    const result = await response.json();
    return { recipe: result.recipe || 'No content found' };
  } catch (error) {
    return { error: 'An error occurred while fetching the recipe' };
  }
};
