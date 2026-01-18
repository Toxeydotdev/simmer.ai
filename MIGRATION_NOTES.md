# Migration Notes: Angular to React/React Native Monorepo

This document outlines the migration from an Angular standalone application to a monorepo structure with React (web) and React Native (mobile) using Expo.

## Major Changes

### Architecture

**Before:**
- Single Angular application
- PrimeNG component library
- Angular CLI build system
- Netlify deployment

**After:**
- NX monorepo with multiple applications
- React web app with Tailwind CSS
- React Native mobile app with Expo
- Shared packages for code reuse
- Vite build system for web
- Expo build system for mobile
- Netlify deployment (web) + Expo deployment (mobile)

### Directory Structure

**Before:**
```
src/
├── app/
│   ├── features/
│   │   ├── dashboard/
│   │   └── socials/
│   └── services/
public/
netlify/functions/
```

**After:**
```
apps/
├── web/          # React web app
└── mobile/       # React Native app
packages/
└── shared/       # Shared code
    ├── ui/       # Shared components
    ├── utils/    # Shared utilities
    └── types/    # Shared types
netlify/functions/
```

## Component Migration

### Dashboard Component

**Angular (Before):**
- Used PrimeNG components (p-card, p-button, p-inputGroup)
- Angular signals for state management
- RxJS for async operations
- ngx-markdown for markdown rendering

**React (After):**
- Native HTML elements with Tailwind CSS
- React useState hooks for state management
- Native fetch API for async operations
- DOMPurify for sanitization

### Socials Component

**Angular:**
- PrimeNG button component
- Array iteration with @for

**React:**
- Custom button with Tailwind CSS
- Array map for rendering

## Key Technology Changes

| Feature | Before (Angular) | After (React) |
|---------|-----------------|---------------|
| UI Library | PrimeNG | Tailwind CSS |
| State Management | Signals | React Hooks |
| Routing | Angular Router | React Router |
| HTTP Client | HttpClient | Fetch API |
| Forms | FormsModule | Native forms |
| Styling | SCSS | Tailwind CSS |
| Build Tool | Angular CLI | Vite |
| Testing | Karma/Jasmine | Vitest/Jest |

## API/Backend

The Netlify serverless function remains unchanged and compatible with both the old and new frontend:
- Endpoint: `/.netlify/functions/get-recipe`
- Method: POST
- Body: `{ data: string }`
- Response: `{ recipe: string, urlInput: string }`

## Scripts

**Before:**
```json
{
  "start": "ng serve",
  "build": "ng build",
  "test": "ng test"
}
```

**After:**
```json
{
  "dev:web": "nx serve web",
  "dev:mobile": "nx serve mobile",
  "build": "nx run-many -t build",
  "build:web": "nx build web",
  "test": "nx run-many -t test"
}
```

## Dependencies

### Removed
- @angular/* packages (all Angular dependencies)
- primeng, primeicons, primeflex
- ngx-markdown
- karma, jasmine
- Angular CLI

### Added
- nx (monorepo tooling)
- react, react-dom
- react-native, expo (mobile)
- vite (build tool)
- tailwindcss (styling)
- @nx/react, @nx/expo (NX plugins)

### Kept
- dompurify (HTML sanitization)
- openai (API client)
- @supabase/supabase-js (if using Supabase)
- @mozilla/readability (content extraction)
- jsdom (DOM manipulation in Node.js)
- @netlify/functions (serverless functions)

## Deployment Changes

### Web Application
- **Build Output:** Changed from `dist/without-the-story/browser` to `dist/apps/web`
- **Build Command:** Changed from `ng build` to `npm run build:web`
- **Netlify Config:** Updated in `netlify.toml`

### Mobile Application (New)
- Uses Expo Application Services (EAS)
- Configuration in `apps/mobile/app.json` and `eas.json`
- Deployment via `eas build` and `eas submit`

## Benefits of Migration

1. **Code Reuse:** Shared packages allow code sharing between web and mobile
2. **Modern Stack:** React and Vite provide better developer experience
3. **Mobile Support:** Native mobile app with Expo
4. **Better Performance:** Vite's fast build times and optimized bundles
5. **Scalability:** NX provides excellent monorepo tooling
6. **Type Safety:** Shared types ensure consistency across platforms
7. **Unified Styling:** Tailwind CSS provides consistent design system

## Breaking Changes

1. **Component API:** All components use React patterns instead of Angular
2. **State Management:** Hooks replace Angular signals
3. **Routing:** React Router instead of Angular Router
4. **Dependency Injection:** Props and context instead of DI
5. **Lifecycle:** useEffect instead of lifecycle hooks

## Migration Checklist for Future Features

When adding new features, consider:

- [ ] Can this be shared between web and mobile?
- [ ] Should this be a shared component in `packages/shared/ui`?
- [ ] Does this need shared utilities in `packages/shared/utils`?
- [ ] Are there shared types needed in `packages/shared/types`?
- [ ] Does the mobile app need a different UI for this feature?
- [ ] Is the API compatible with both platforms?

## Testing the Migration

### Web Application
1. Run `npm run dev:web`
2. Navigate to http://localhost:4200
3. Test recipe fetching functionality
4. Verify responsive design
5. Check external links (Support Me button)

### Mobile Application
1. Run `npm run dev:mobile`
2. Scan QR code with Expo Go
3. Test recipe fetching functionality
4. Verify mobile-optimized UI
5. Test on both iOS and Android

### Build
1. Run `npm run build:web`
2. Verify build output in `dist/apps/web`
3. Test production build locally

## Known Issues and Limitations

1. **Markdown Rendering:** Currently using basic HTML rendering instead of full markdown support
2. **Offline Support:** Not implemented in initial migration
3. **Mobile API Endpoint:** Currently hardcoded to production URL
4. **Shared Components:** Limited shared components; more can be extracted
5. **Testing:** Test suites need to be written for new React components

## Next Steps

Recommended improvements:
1. Add proper markdown rendering library for both web and mobile
2. Extract more shared components (Input, Card, Loading, etc.)
3. Add unit tests for components
4. Add E2E tests with Playwright
5. Implement proper error boundaries
6. Add analytics tracking
7. Implement offline support for mobile
8. Add state management library (if needed)
9. Set up CI/CD for mobile builds
10. Add internationalization support

## Resources

- [Migration Commit](link-to-commit)
- [PR Discussion](link-to-pr)
- [Setup Guide](./SETUP.md)
- [Original Repository](original-link)
