This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
cp .env.local.sample .env.local
pnpm install
pnpm dev
```

Important! Customize the following env according to your settings
```bash
NEXT_PUBLIC_API_URL=http://localhost:4200 <= YOUR BACKEND LOCAL URL
NEXT_PUBLIC_BASE_URL=http://localhost:3000
JWT_SECRET=WinterIsComingGOT2019 <= MUST BE THE SAME WITH BACKEND JWT KEY
```
