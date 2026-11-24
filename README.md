# Taklhees-Frontend

Next.js 15+ (React 19) web platform for **Takhlees Business**, serving both UAE Corporate Operations (`/ae`) and India Career Academy (`/in`).

## Tech Stack
- **Framework**: Next.js 15 (App Router, Server Components by default)
- **UI Library**: React 19, Strict TypeScript
- **Styling**: Tailwind CSS with custom brand tokens (Green, Red, Charcoal)
- **State Management**:
  - Client state: Zustand (`src/stores/`)
  - Server state: TanStack React Query (`@tanstack/react-query`)
- **Forms & Validation**: React Hook Form with Zod schemas
- **Motion & UI Primitives**: Motion (Framer Motion), Lucide React, class-variance-authority, Sonner, next-themes, Embla Carousel

## Getting Started
```bash
npm install
npm run dev
```

Visit [http://localhost:3000/ae](http://localhost:3000/ae) for UAE or [http://localhost:3000/in](http://localhost:3000/in) for India.

## Audit & Changelog
Full engineering audit trail documented in [CHANGELOG.md](./CHANGELOG.md).
