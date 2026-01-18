export const API_ENDPOINT = '/.netlify/functions/get-recipe';

export const fetchRecipe = async (data: string): Promise<{ recipe?: string; error?: string }> => {
  try {
    const response = await fetch(API_ENDPOINT, {
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
