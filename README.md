# Simmer.AI

Tool that uses AI to get recipes and instructions without reading through noise.

[![Netlify Status](https://api.netlify.com/api/v1/badges/68a308c0-209b-4e24-8c5b-2ae0b216925a/deploy-status)](https://app.netlify.com/sites/withoutthestory/deploys)

## Monorepo Structure

This is an NX monorepo containing:

- **apps/web** - React web application (Vite + React + Tailwind CSS)
- **apps/mobile** - React Native mobile application (Expo)
- **netlify/functions** - Serverless functions for API endpoints

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- For mobile development: Expo CLI

### Installation

```bash
npm install
```

## Development

### Web Application

```bash
npm run dev:web
```

Or using NX directly:
```bash
npx nx serve web
```

### Mobile Application

```bash
npm run dev:mobile
```

Or using NX directly:
```bash
npx nx serve mobile
```

Then follow the Expo instructions to run on your device or emulator.

## Building

### Build all applications

```bash
npm run build
```

### Build web only

```bash
npm run build:web
```

## Environment Variables

Create a `.env` file in the root directory (see `.env.example`):

```
OPENAI_API_KEY=your_api_key_here
```

## Deployment

### Web (Netlify)

The web app is automatically deployed to Netlify on push to main branch.

Build command: `npm run build:web`
Publish directory: `dist/apps/web`

### Mobile (Expo)

For mobile deployment, use Expo's build service:

```bash
cd apps/mobile
npx eas build --platform ios
npx eas build --platform android
```

## Project Graph

View the interactive project dependency graph:

```bash
npm run graph
```

## Technology Stack

- **Build System**: NX
- **Web**: React 18, Vite, Tailwind CSS
- **Mobile**: React Native, Expo
- **Backend**: Netlify Functions, OpenAI API
- **Deployment**: Netlify (web), Expo (mobile)

