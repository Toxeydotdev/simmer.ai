import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { fetchRecipe } from '@simmer/shared/utils';
import DOMPurify from 'dompurify';
import { useState } from 'react';
import Socials from './Socials';

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
    <div className="flex flex-col h-full gap-4 w-full">
      <div className="text-center mt-6 text-4xl font-bold flex flex-col gap-2">
        <div className="text-gray-900">Get Recipes</div>
        <div className="underline text-teal-500">Without the Story</div>
      </div>

      <div className="flex flex-col gap-4 justify-center items-center mb-6 mx-3 sm:mx-6">
        <Socials />
        <p className="text-center text-base text-gray-500">
          Enter a recipe URL to get the recipe without the noise or let our AI
          find the recipe for you
        </p>

        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto justify-center items-center">
          <Input
            type="text"
            value={inputUrl}
            onChange={(e) => setInputUrl(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Recipe URL or Dish Name"
            className="w-full sm:w-80 h-12"
            disabled={processing}
          />
          <Button
            onClick={getArticle}
            disabled={processing || !inputUrl.trim()}
            size="lg"
            className="w-full sm:w-auto"
          >
            {processing ? 'Loading...' : 'Get Recipe'}
          </Button>
        </div>

        {error && (
          <Card className="w-full max-w-lg border-red-200 bg-red-50">
            <CardContent className="p-4 text-red-700">{error}</CardContent>
          </Card>
        )}

        {processing && (
          <Card className="w-full max-w-2xl">
            <CardContent className="p-6">
              <div className="animate-pulse space-y-4">
                <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
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
            </CardContent>
          </Card>
        )}

        {!processing && content && (
          <Card className="w-full max-w-2xl">
            <CardContent className="p-6 text-left">
              <div
                className="prose prose-slate max-w-none"
                dangerouslySetInnerHTML={renderMarkdown(content)}
              />
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
