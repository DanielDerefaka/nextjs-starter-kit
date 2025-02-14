# Next.js Authentication Starter

This is a [Next.js](https://nextjs.org/) project bootstrapped with authentication features using Clerk and Prisma.

## Features

- 🔐 Authentication with Clerk
- 📝 Form handling with React Hook Form
- 🧠 State management with Redux and React Query
- 🗄️ Database integration with Prisma
- 🎨 UI components with shadcn/ui
- ✅ Form validation with Zod

## Getting Started

First, install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Authentication Flow

The authentication system includes:

1. Sign Up with email verification
2. Sign In with email/password
3. Protected routes
4. User session management
5. Database integration with Prisma

### Key Files

- Authentication Hooks: `src/hooks/authentication/index.tsx`
- Prisma Schema: `prisma/schema.prisma`
- Auth Actions: `src/actions/auth.ts`
- Sign Up Form: `src/components/form/sign-up/index.tsx`
- Sign In Form: `src/components/form/sign-in/index.tsx`

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
DATABASE_URL="your_postgres_connection_string"
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="your_clerk_publishable_key"
CLERK_SECRET_KEY="your_clerk_secret_key"
```

## Database Setup

1. Run migrations:

```bash
npx prisma migrate dev --name init
```

2. Generate Prisma client:

```bash
npx prisma generate
```

## Learn More

To learn more about the technologies used in this project:

- [Next.js Documentation](https://nextjs.org/docs)
- [Clerk Documentation](https://clerk.com/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [React Hook Form Documentation](https://react-hook-form.com/)
- [Zod Documentation](https://zod.dev/)

## Deployment

The easiest way to deploy your Next.js app is to use [Vercel](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
