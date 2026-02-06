# Book Management System

A Next.js application for managing book records with a dashboard, charts, and full CRUD for books.

🚀 Live demo: https://book-management-fawn.vercel.app/

## What the site includes

- **Home / Books list:** browse all books and view basic details.
- **Login page:** simple authentication entry point (pages/login.tsx).
- **Books CRUD:** create, update and delete books via the `book` pages and `src/components/book/FormBook.tsx`.
- **Dashboard:** visual summaries with a bar chart and pie chart (`src/components/dashboard/BarChartComponent.tsx`, `PieChartComponent.tsx`).
- **Reusable UI:** create/update/delete buttons under `src/components/book/` for consistent actions.
- **API utilities:** central API helpers in `src/utils/api.ts`.

## Project structure (high level)

- `pages/` — Next.js pages (index, login, book, dashboard).
- `src/components/` — UI components and form helpers.
- `src/utils/` — API helpers and constants (e.g., `genreList`).
- `public/`, `styles/`, `theme/` — static assets, global styles, theme config.

## Run locally

Install dependencies and start the dev server:

```bash
npm install
npm run dev
```

Open http://localhost:3000 in your browser.

## Notes & next steps

- The app is scaffolded with Next.js and TypeScript.
- If you want, I can add more documentation for components or add example API endpoints.

--
Updated README to reflect current site pages and components.
