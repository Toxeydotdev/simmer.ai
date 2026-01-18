export default function Socials() {
  const socials = [
    {
      name: 'Support Me',
      icon: '👍',
      url: 'https://buymeacoffee.com/toxey',
    },
  ];

  const openTab = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="flex gap-3 my-4 justify-center">
      {socials.map((social, index) => (
        <button
          key={index}
          onClick={() => openTab(social.url)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors shadow-md"
        >
          <span>{social.icon}</span>
          <span>{social.name}</span>
        </button>
      ))}
    </div>
  );
}
