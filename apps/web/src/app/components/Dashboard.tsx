import { useState } from 'react';
import DOMPurify from 'dompurify';
import { fetchRecipe } from '@simmer/shared/utils';

export default function Dashboard() {
  const [inputUrl, setInputUrl] = useState('');
  const [content, setContent] = useState('');
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getArticle = async () => {
    if (!inputUrl.trim()) return;

    setProcessing(true);
    setError(null);

    const result = await fetchRecipe(inputUrl);
    
    if (result.error) {
      setError(result.error);
    } else if (result.recipe) {
      setContent(result.recipe);
    }
    
    setProcessing(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      getArticle();
    }
  };

  const renderMarkdown = (markdown: string) => {
    // Simple markdown to HTML conversion (can be enhanced with a library)
    const sanitized = DOMPurify.sanitize(markdown);
    return { __html: sanitized.replace(/\n/g, '<br/>') };
  };

  return (
    <div className="flex flex-col items-center justify-start min-h-screen py-8 px-4">
      <div className="w-full max-w-4xl space-y-6">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
          Simmer.AI
        </h1>
        <p className="text-center text-gray-600 mb-8">
          Get recipes and instructions without reading through noise
        </p>

        <div className="flex gap-2 w-full max-w-2xl mx-auto">
          <input
            type="text"
            value={inputUrl}
            onChange={(e) => setInputUrl(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Recipe URL or Dish Name"
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={processing}
          />
          <button
            onClick={getArticle}
            disabled={processing || !inputUrl.trim()}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
          >
            {processing ? 'Loading...' : 'Get Recipe'}
          </button>
        </div>

        {error && (
          <div className="w-full max-w-2xl mx-auto p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        {processing && (
          <div className="w-full max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md border-2 border-gray-200">
            <div className="animate-pulse space-y-4">
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              <div className="space-y-3 mt-4">
                {[1, 2, 3].map((i) => (
                  <div key={i}>
                    <div className="h-3 bg-gray-200 rounded w-1/4 mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded w-11/12 ml-4"></div>
                    <div className="h-3 bg-gray-200 rounded w-11/12 ml-4"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {!processing && content && (
          <div className="w-full max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md border-2 border-gray-200">
            <div
              className="prose prose-slate max-w-none text-left"
              dangerouslySetInnerHTML={renderMarkdown(content)}
            />
          </div>
        )}
      </div>
    </div>
  );
}
