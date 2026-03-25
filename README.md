<p align="center">
  <img src="public/images/logoipsum-338.svg" alt="ChatAI Logo" width="80" height="80" />
</p>

<h1 align="center">ChatAI</h1>

<p align="center">
  <strong>A modern AI agent management platform built with Next.js 15</strong>
</p>

<p align="center">
  <a href="#features">Features</a> •
  <a href="#tech-stack">Tech Stack</a> •
  <a href="#getting-started">Getting Started</a> •
  <a href="#project-structure">Project Structure</a> •
  <a href="#environment-variables">Environment Variables</a> •
  <a href="#database">Database</a> •
  <a href="#api-reference">API Reference</a> •
  <a href="#deployment">Deployment</a>
</p>

---

## Overview

ChatAI is a full-stack application that allows users to create, manage, and interact with custom AI agents. Built with the latest web technologies, it provides a seamless experience for configuring AI assistants with personalized instructions and behaviors.

## Features

- **Authentication System** - Secure user authentication powered by Better Auth with session management
- **AI Agent Management** - Create, view, and manage custom AI agents with personalized instructions
- **Modern Dashboard** - Beautiful, responsive dashboard with sidebar navigation and command palette
- **Real-time Updates** - Instant UI updates with React Query and optimistic mutations
- **Type-Safe API** - End-to-end type safety with tRPC and Zod validation
- **Responsive Design** - Mobile-first design with adaptive layouts and components
- **Dark Theme** - Elegant dark theme with purple accent colors and glassmorphism effects

## Tech Stack

### Frontend
| Technology | Purpose |
|------------|---------|
| [Next.js 15](https://nextjs.org/) | React framework with App Router |
| [React 19](https://react.dev/) | UI library |
| [Tailwind CSS 4](https://tailwindcss.com/) | Utility-first CSS framework |
| [Radix UI](https://www.radix-ui.com/) | Headless UI components |
| [Lucide React](https://lucide.dev/) | Icon library |
| [React Hook Form](https://react-hook-form.com/) | Form management |
| [TanStack Table](https://tanstack.com/table) | Data table library |
| [Embla Carousel](https://www.embla-carousel.com/) | Carousel component |
| [Recharts](https://recharts.org/) | Charting library |

### Backend
| Technology | Purpose |
|------------|---------|
| [tRPC](https://trpc.io/) | End-to-end typesafe APIs |
| [Drizzle ORM](https://orm.drizzle.team/) | TypeScript ORM |
| [Better Auth](https://better-auth.com/) | Authentication library |
| [Zod](https://zod.dev/) | Schema validation |
| [Neon](https://neon.tech/) | Serverless PostgreSQL |

### Development
| Technology | Purpose |
|------------|---------|
| [TypeScript](https://www.typescriptlang.org/) | Type safety |
| [ESLint](https://eslint.org/) | Code linting |
| [Drizzle Kit](https://orm.drizzle.team/kit-docs/overview) | Database migrations |

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) 18.17 or later
- [pnpm](https://pnpm.io/), [npm](https://www.npmjs.com/), or [yarn](https://yarnpkg.com/)
- [PostgreSQL](https://www.postgresql.org/) database (or [Neon](https://neon.tech/) account)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/chatai.git
   cd chatai
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   pnpm install
   # or
   yarn install
   ```

3. **Set up environment variables**

   Create a `.env.local` file in the root directory:

   ```env
   # Database
   DATABASE_URL="postgresql://username:password@host:port/database?sslmode=require"

   # Better Auth
   BETTER_AUTH_SECRET="your-secret-key-min-32-chars"
   BETTER_AUTH_URL="http://localhost:3000"
   ```

4. **Push database schema**

   ```bash
   npm run db:push
   ```

5. **Start the development server**

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
chatai/
├── public/                     # Static assets
│   └── images/                 # Image assets
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── (auth)/             # Authentication routes
│   │   │   ├── sign-in/        # Sign in page
│   │   │   └── sign-up/        # Sign up page
│   │   ├── (dashboard)/        # Dashboard routes
│   │   │   ├── agents/         # Agents management page
│   │   │   └── page.tsx        # Dashboard home
│   │   ├── api/                # API routes
│   │   │   ├── auth/           # Auth API endpoints
│   │   │   └── trpc/           # tRPC API handler
│   │   ├── globals.css         # Global styles
│   │   └── layout.tsx          # Root layout
│   ├── components/             # Shared components
│   │   ├── ui/                 # UI primitives (shadcn/ui)
│   │   ├── empty-state.tsx     # Empty state component
│   │   ├── error-state.tsx     # Error state component
│   │   ├── loading-state.tsx   # Loading state component
│   │   └── responsive-dialog.tsx
│   ├── db/                     # Database configuration
│   │   ├── index.ts            # Database client
│   │   └── schema.ts           # Drizzle schema definitions
│   ├── hooks/                  # Custom React hooks
│   │   └── use-mobile.ts       # Mobile detection hook
│   ├── lib/                    # Utility libraries
│   │   ├── auth.ts             # Auth configuration
│   │   ├── auth-client.ts      # Auth client
│   │   └── utils.ts            # Utility functions
│   ├── modules/                # Feature modules
│   │   ├── agents/             # Agents feature
│   │   │   ├── server/         # Server-side logic
│   │   │   │   └── procedures.ts
│   │   │   ├── ui/             # UI components
│   │   │   │   ├── components/
│   │   │   │   └── views/
│   │   │   ├── schemas.ts      # Zod schemas
│   │   │   └── types.ts        # TypeScript types
│   │   ├── auth/               # Auth feature
│   │   ├── dashboard/          # Dashboard feature
│   │   └── home/               # Home feature
│   ├── trpc/                   # tRPC configuration
│   │   ├── client.tsx          # tRPC React client
│   │   ├── init.ts             # tRPC initialization
│   │   ├── query-client.ts     # React Query client
│   │   ├── server.tsx          # Server-side tRPC
│   │   └── routers/            # tRPC routers
│   │       └── _app.ts         # App router
│   └── types/                  # Global TypeScript types
├── drizzle.config.ts           # Drizzle configuration
├── next.config.ts              # Next.js configuration
├── tailwind.config.ts          # Tailwind configuration
├── tsconfig.json               # TypeScript configuration
└── package.json                # Dependencies
```

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `DATABASE_URL` | PostgreSQL connection string | Yes |
| `BETTER_AUTH_SECRET` | Secret key for auth (min 32 chars) | Yes |
| `BETTER_AUTH_URL` | Application URL | Yes |

## Database

### Schema Overview

The application uses the following database tables:

#### User Table
Stores user account information.

| Column | Type | Description |
|--------|------|-------------|
| `id` | text | Primary key |
| `name` | text | User's display name |
| `email` | text | Unique email address |
| `emailVerified` | boolean | Email verification status |
| `image` | text | Profile image URL |
| `createdAt` | timestamp | Account creation date |
| `updatedAt` | timestamp | Last update date |

#### Agent Table
Stores AI agent configurations.

| Column | Type | Description |
|--------|------|-------------|
| `id` | text | Primary key (nanoid) |
| `name` | text | Agent name |
| `userId` | text | Owner's user ID |
| `instructions` | text | Agent instructions/prompt |
| `createdAt` | timestamp | Creation date |
| `updatedAt` | timestamp | Last update date |

### Database Commands

```bash
# Push schema to database
npm run db:push

# Open Drizzle Studio (database GUI)
npm run db:studio
```

## API Reference

### tRPC Procedures

#### Agents

| Procedure | Type | Description |
|-----------|------|-------------|
| `agent.getMany` | Query | Get all agents for current user |
| `agent.getOne` | Query | Get a single agent by ID |
| `agent.create` | Mutation | Create a new agent |

### Authentication Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/auth/sign-in` | POST | Sign in with credentials |
| `/api/auth/sign-up` | POST | Create new account |
| `/api/auth/sign-out` | POST | Sign out current user |
| `/api/auth/session` | GET | Get current session |

## Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run db:push` | Push schema to database |
| `npm run db:studio` | Open Drizzle Studio |

## Deployment

### Vercel (Recommended)

The easiest way to deploy ChatAI is on [Vercel](https://vercel.com):

1. Push your code to GitHub
2. Import your repository on Vercel
3. Add environment variables
4. Deploy

### Other Platforms

ChatAI can be deployed on any platform that supports Next.js:

- [Netlify](https://www.netlify.com/)
- [Railway](https://railway.app/)
- [Render](https://render.com/)
- [AWS Amplify](https://aws.amazon.com/amplify/)
- Self-hosted with Docker

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

<p align="center">
  Built with Next.js and tRPC
</p>
