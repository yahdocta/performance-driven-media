# Performance Driven Media

A high-converting video production agency website built with Next.js, Sanity CMS, and Tailwind CSS.

## Features
- **Modern, responsive design** with custom components and animations
- **Dynamic content** powered by Sanity CMS (homepage, blog, services, work, about, contact, etc.)
- **Reusable components**: Navbar, Footer, Logo Carousel, Contact Form
- **Mobile-optimized** layouts and carousels
- **SEO-friendly** and fast-loading
- **Easy content management** for non-developers via Sanity Studio

## Tech Stack
- [Next.js 13+ (App Router)](https://nextjs.org/)
- [Sanity CMS](https://www.sanity.io/)
- [Tailwind CSS](https://tailwindcss.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [Firebase Hosting](https://firebase.com/) 

## Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   ```

2. **Run the development server:**
   ```bash
   npm run dev
   # or
   yarn dev
   ```
   Open [http://localhost:3000](http://localhost:3000) to view the site.

3. **Sanity Studio:**
   - Content is managed via Sanity. See `/pdmsite/sanity/` for schema and studio setup.
   - To run Sanity Studio locally:
     ```bash
     cd pdmsite/sanity
     npm install
     npm run dev
     ```

## Deployment
- Deploy easily to [Firebase](https://firebase.com/) or your preferred platform.
- Set up environment variables for Sanity project ID, dataset, and API version as needed.

## Project Structure
- `src/app/` — Main Next.js app (pages, components, styles)
- `pdmsite/sanity/` — Sanity Studio and schema
- `public/` — Static assets

## License
MIT
