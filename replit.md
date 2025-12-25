# Luxe Estates - Premium Real Estate Website

## Overview

Luxe Estates is a premium, luxury-focused real estate builder website built with React and Express. The application showcases residential and commercial property developments with features like project galleries, customer testimonials, career listings, news/media sections, and an AI-powered chat assistant. The design emphasizes a high-end aesthetic with gold/bronze accents and modern UI components.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack React Query for server state and caching
- **Styling**: Tailwind CSS with custom luxury color palette (gold/bronze primary colors)
- **UI Components**: shadcn/ui component library with Radix UI primitives
- **Animations**: Framer Motion for premium page transitions and scroll animations
- **Form Handling**: React Hook Form with Zod validation

### Backend Architecture
- **Runtime**: Node.js with Express
- **Language**: TypeScript with ES modules
- **API Design**: RESTful endpoints defined in shared routes contract (`shared/routes.ts`)
- **Build System**: Custom build script using esbuild for server bundling and Vite for client

### Data Storage
- **Database**: PostgreSQL with Drizzle ORM
- **Schema Location**: `shared/schema.ts` contains all table definitions
- **Migrations**: Drizzle Kit for database migrations (`drizzle.config.ts`)
- **Tables**: Projects, Testimonials, Jobs, News, Leads, Conversations, Messages

### Key Design Patterns
- **Shared Types**: Schema and route definitions shared between client and server via `@shared/*` path alias
- **Type-Safe API**: Zod schemas validate API requests/responses on both ends
- **Storage Abstraction**: `IStorage` interface in `server/storage.ts` allows swapping implementations
- **Component Organization**: Feature components in `client/src/components/`, pages in `client/src/pages/`

### AI Integration
- **Chat Widget**: AI-powered assistant using OpenAI API for property inquiries
- **Image Generation**: Optional image generation capability via `gpt-image-1` model
- **Batch Processing**: Utility for rate-limited bulk LLM operations

## External Dependencies

### Database
- **PostgreSQL**: Primary database accessed via `DATABASE_URL` environment variable
- **Drizzle ORM**: Type-safe database queries with automatic schema inference

### AI Services
- **OpenAI API**: Powers the chat assistant (`OPENAI_API_KEY` or Replit AI integration)
- **Replit AI Integrations**: Alternative base URL for AI services via `AI_INTEGRATIONS_OPENAI_BASE_URL`

### Third-Party Libraries
- **Radix UI**: Accessible component primitives for dialogs, dropdowns, tooltips, etc.
- **Embla Carousel**: Touch-friendly carousels for project galleries
- **Framer Motion**: Animation library for smooth transitions
- **date-fns**: Date formatting utilities

### Development Tools
- **Vite**: Development server with HMR for the React frontend
- **esbuild**: Fast bundling for production server builds
- **Replit Plugins**: Dev banner, cartographer, and error overlay for Replit environment