# Next.js 14 Features

## Optimizing Fonts and Images

- Utilize the `next/font` module in Next.js for automatic font optimization.
- The `next/image` component offers features like layout shift prevention, image resizing, and lazy loading.

## Creating Layouts and Pages

- Colocation allows you to organize files (like components, styles, tests) within folders in the app directory.
- Folders in Next.js define routes, but only the content from `page.js` or `route.js` is addressable publicly.

## Static and Dynamic Rendering

- Use `export const dynamic = "force-dynamic"` or `unstable_noStore` from Next.js for experimental dynamic rendering.
- Dynamic rendering's speed is dependent on your slowest data fetch. This can be improved through streaming.

## Streaming

- Streaming prevents slow data requests from blocking your entire page.
- It integrates well with React's component model, treating each component as a separate chunk.
- Implement streaming in two ways: through the `loading.tsx` file at the page level, or using `<Suspense>` for specific components.
- `loading.tsx` is a specialized file in Next.js built on top of Suspense for streaming.
- Streaming can be used for individual components or sections of a page.

## Partial Prerendering

- An experimental feature that combines static and dynamic rendering.
- It renders a static loading shell for a route while keeping parts of it dynamic.
- It's a hybrid model, comparing favorably with other rendering methods like Edge SSR and ISR.
- Partial Prerendering uses Suspense to differentiate between static and dynamic route parts.
- It requires no code changes for implementation if Suspense is already in use.

## Mutating Data

- React Server Actions enable asynchronous server-side code execution.
- Server Actions enhance progressive web apps by ensuring functionality even if JavaScript is disabled on the client.
- When using Server Actions, parameters must be bound to ensure proper value encoding.

## Handling Errors

- Centralize error handling with an `error.tsx` file.
- Use the `notFound` function for specific error scenarios, like missing resources.
- `notFound` takes precedence over `error.tsx`, allowing for more targeted error handling.
- Implement `global-error.js` and `safeParse()` for more graceful error and validation handling.
- Employ Zod for structured data validation.

## Authentication

- Manage authentication configurations with `auth.config.ts`.
- Use Next.js Middleware and the authorized callback to verify page access requests.
- Middleware enhances security and performance by verifying authentication before rendering protected routes.

