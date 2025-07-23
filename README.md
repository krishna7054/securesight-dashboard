### SecureSight Dashboard
SecureSight is a CCTV monitoring dashboard built as a technical assessment. It features a navbar, incident player (left side with static image and mini thumbnails), incident list (right side with resolve functionality). The backend uses Prisma with SQLite for data management, seeding cameras and incidents.

## Features
- Navbar: Simple top navigation.
- Incident Player: Displays a static placeholder image/video with mini camera thumbnails.
- Incident List: Shows unresolved incidents with thumbnails, details, and an optimistic "Resolve" button.
- API: Endpoints for fetching incidents and resolving them.
- Data seeded with 4 cameras and 13+ incidents across threat types.

## Getting Started
Clone the repo and follow the deployment instructions below.

### Prerequisites
Node.js v20+ (tested on v22.17.0)
npm or yarn

### Installation
1. Clone the repository:
```bash
git clone https://github.com/krishna7054/securesight-dashboard.git
cd securesight-dashboard
```
2. Install dependencies:
```bash
npm install
```
3. Set up the database:
```bash
npx prisma generate
npx prisma db push
npx prisma db seed
```
- Note: Uses SQLite (prisma/dev.db). For production, switch to Postgres (e.g., via Neon).

4. Run the development server:
```bash
npm run dev
```
- Open http://localhost:3000 to view the app.

### Deployment Instructions
This project is optimized for Vercel deployment, but works with Netlify or Render too. No .env vars are required for SQLite, but add them if switching databases.

1. Push to GitHub: Create a public repo and push your code.

2. Deploy to Vercel:

- Sign up at vercel.com.
- Import your GitHub repo.
- Configure: Select Next.js framework, no build command overrides needed.
- Deploy: Vercel handles the build and provides a live URL (e.g., securesight-dashboard.vercel.app).
- For database: Use a cloud provider like Neon for Postgres (update prisma/schema.prisma datasource URL and add to Vercel env vars).

Test the live site: Ensure API routes work and thumbnails load (static assets in /public).

Live Demo: https://securesight-dashboard.vercel.app.

### Tech Decisions
- Framework: Next.js 15 (App Router) for full-stack development, server-side rendering, and easy API routes. Chosen for its performance and React integration.

- Database & ORM: Prisma with SQLite for simplicity in development (local file-based, no external setup). Prisma handles schema, migrations, and seeding efficiently. Easy to swap to Postgres for production.

- UI & Styling: Tailwind CSS for rapid, utility-first styling to match Figma designs. Added Shadcn/UI for reusable components (e.g., Card, Button) built on Tailwind and Radix UI, allowing customization without heavy dependencies.

- State Management: React hooks (useState, useEffect) for fetching and updating incidents with optimistic UI.

- Optional Features: React Three Fiber for the 3D route, enabling simple model loading and animations as per the extra credit Figma.

- Other: tsx for running TypeScript scripts (e.g., seeding) to handle ESM compatibility issues in Node 22+.

These choices prioritize speed, maintainability, and alignment with modern React/Next.js practices, focusing on TypeScript for type safety.

### If I Had More Time...
- Integrate real-time video streaming (e.g., via WebRTC or HLS) instead of static placeholders.

- Add user authentication and roles (e.g., with NextAuth.js) for secure access.

- Enhance the interactive timeline with full drag-and-snap functionality and integration with video playback.

- Implement advanced 3D animations (e.g., using GSAP or Trois.js) and interactive controls for the product model.

- Add filtering/sorting for incidents (e.g., by type, camera, or date) and pagination for large lists.

- Optimize performance with Next.js Image component for thumbnails and server-side data fetching.

- Set up CI/CD with GitHub Actions for automated testing and deployment.