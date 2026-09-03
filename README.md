This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

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

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deployment

This starter targets **Cloudflare Pages** as its default deployment provider (see `src/lib/cloudflare/manifest.ts`). Deployment, DNS, analytics, and publishing all require explicit approval — see `.claude/rules/deployment.md`.

Before any real deployment, run the SiteLab Deployment/Publishing Engine (`src/lib/deployment`) to produce a readiness report, a dry-run deployment plan, and a rollback plan. It requires a passing Reviewer/QA decision for production and reuses the permissions already confirmed in the Client Intake Engine. See [docs/Deployment-Publishing-Engine.md](docs/Deployment-Publishing-Engine.md) and the live preview at `/deployment-demo`.

Vercel and other providers are supported as declared extension points only; they are not implemented in this repository.
