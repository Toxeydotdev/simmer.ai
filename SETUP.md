# Simmer.AI Monorepo Setup Guide

This guide will help you get started with the Simmer.AI monorepo, which uses NX, React, React Native (Expo), and Netlify Functions.

## Repository Structure

```
simmer.ai/
├── apps/
│   ├── web/              # React web application (Vite + Tailwind CSS)
│   └── mobile/           # React Native mobile app (Expo)
├── packages/
│   └── shared/
│       ├── ui/          # Shared UI components
│       ├── utils/       # Shared utilities
│       └── types/       # Shared TypeScript types
├── netlify/
│   └── functions/       # Serverless API functions
└── nx.json             # NX configuration
```

## Prerequisites

- Node.js 18+ and npm
- Git
- For mobile development:
  - iOS: Xcode (Mac only)
  - Android: Android Studio
  - Expo Go app on your mobile device (for testing)

## Quick Start

### 1. Clone and Install

```bash
git clone https://github.com/Toxeydotdev/simmer.ai.git
cd simmer.ai
npm install
```

### 2. Environment Setup

Create a `.env` file in the root directory:

```bash
cp .env.example .env
```

Add your OpenAI API key:
```
OPENAI_API_KEY=your_openai_api_key_here
```

### 3. Run the Applications

#### Web Application
```bash
npm run dev:web
```
Open http://localhost:4200

#### Mobile Application
```bash
npm run dev:mobile
```
Then scan the QR code with Expo Go app on your mobile device.

## Development Workflows

### Building Applications

```bash
# Build all applications
npm run build

# Build web only
npm run build:web

# Build specific app with NX
npx nx build web
npx nx build mobile
```

### Running Tests

```bash
# Run all tests
npm test

# Run tests for specific app
npx nx test web
npx nx test mobile
```

### Project Graph

View the dependency graph of your monorepo:

```bash
npm run graph
```

This opens an interactive visualization showing how projects depend on each other.

## Working with Shared Packages

### Shared UI Components

Located in `packages/shared/ui/src/`. Example usage:

```tsx
import { Button } from '@simmer/shared/ui';

function MyComponent() {
  return <Button onClick={() => alert('Clicked!')}>Click Me</Button>;
}
```

### Shared Utilities

Located in `packages/shared/utils/src/`. Example usage:

```tsx
import { fetchRecipe } from '@simmer/shared/utils';

const result = await fetchRecipe('https://example.com/recipe');
```

### Shared Types

Located in `packages/shared/types/src/`. Example usage:

```tsx
import { RecipeResponse } from '@simmer/shared/types';

const response: RecipeResponse = await fetch('/api/recipe');
```

## Adding New Features

### Adding a New Component to Web

```bash
cd apps/web/src/app/components
# Create your component file
touch NewComponent.tsx
```

### Adding a New Screen to Mobile

```bash
cd apps/mobile/src/app
# Create your screen file
touch NewScreen.tsx
```

### Adding a New Shared Component

```bash
cd packages/shared/ui/src
# Create your shared component
touch NewSharedComponent.tsx
```

Don't forget to export it in `packages/shared/ui/src/index.ts`

## Deployment

### Web (Netlify)

The web application is automatically deployed via Netlify when you push to the main branch.

Manual deployment:
```bash
npm run build:web
netlify deploy --prod
```

### Mobile (Expo)

For production builds:

```bash
cd apps/mobile

# iOS build
npx eas build --platform ios

# Android build
npx eas build --platform android

# Submit to stores
npx eas submit --platform ios
npx eas submit --platform android
```

## Troubleshooting

### Port already in use

If port 4200 is in use:
```bash
npx nx serve web --port 4300
```

### Mobile app won't connect to API

Make sure your mobile device is on the same network as your development machine, or update the API endpoint in the mobile app to use your computer's IP address.

### NX Cache Issues

If you encounter strange build issues, clear the NX cache:
```bash
npx nx reset
```

### Dependencies Issues

If you have dependency conflicts:
```bash
rm -rf node_modules package-lock.json
npm install --legacy-peer-deps
```

## Useful NX Commands

```bash
# See all available projects
npx nx show projects

# See project details
npx nx show project web

# Run command for multiple projects
npx nx run-many -t build -p web mobile

# Clear cache
npx nx reset

# View affected projects
npx nx affected:graph
```

## VS Code Extensions

Recommended extensions:
- NX Console
- ESLint
- Prettier
- React Native Tools
- Tailwind CSS IntelliSense

## Resources

- [NX Documentation](https://nx.dev)
- [React Documentation](https://react.dev)
- [Expo Documentation](https://docs.expo.dev)
- [Tailwind CSS Documentation](https://tailwindcss.com)
- [Netlify Functions](https://docs.netlify.com/functions/overview/)

## Contributing

1. Create a feature branch
2. Make your changes
3. Test your changes (web and mobile if applicable)
4. Submit a pull request

## License

See LICENSE file for details.
