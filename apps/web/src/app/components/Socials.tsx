import { Button } from '@/components/ui/button';
import { ThumbsUp } from 'lucide-react';

export default function Socials() {
  const openTab = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <Button
      onClick={() => openTab('https://buymeacoffee.com/toxey')}
      className="rounded-full"
      size="lg"
    >
      <ThumbsUp className="h-4 w-4" />
      Support Me
    </Button>
  );
}
