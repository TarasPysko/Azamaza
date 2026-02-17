# Azamaza — Marketplace

**Azamaza** — a marketplace of verified services and wholesale offers: travel, shop, and save in one place.

## Tech Stack

- **Next.js 16** (App Router)
- **React 19**
- **TypeScript**
- **Tailwind CSS 4**
- **react-datepicker** — date picker in the search form

## What’s in the Project

- **Home page** — Hero banner, categories, search block
- **Categories** — Marketplaces, Photo, Rent, Hotels, Restaurants, Meet, App Subscription, Taxi, All, etc.
- **All categories page** (`/category/all`) — all categories with links
- **Search** — destination, service type, date; submits to API and displays results
- **API** — `POST /api/search` for search (currently returns mock data)
- **Header** — logo, category links, burger menu (Currency, Language, Messages, Notification, Profile, Affiliate, Popular)

## Project Structure

```
app/
├── api/
│   └── search/
│       └── route.ts      # Search API (POST)
├── category/
│   └── all/
│       └── page.tsx     # All categories page
├── components/
│   ├── Categories/      # Categories block on home
│   ├── Header/          # Site header
│   ├── Hero/            # Hero banner
│   └── SearchBlock/     # Search form + results
├── data/
│   └── categories.ts    # Category lists (HOME_CATEGORIES, ALL_PAGE_CATEGORIES)
├── globals.css
├── layout.tsx
└── page.tsx             # Home page
public/                  # SVG icons, bg.jpg, logo.svg, etc.
```

## Getting Started

### Requirements

- Node.js (LTS recommended)
- npm / yarn / pnpm / bun

### Install

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build and run production

```bash
npm run build
npm start
```

### Lint

```bash
npm run lint
```

## Search API

**Endpoint:** `POST /api/search`

**Request body (JSON):**

```json
{
  "destination": "string",
  "serviceType": "string",
  "date": "YYYY-MM-DD"
}
```

**Success response (200):**

```json
{
  "success": true,
  "results": [
    {
      "id": "string",
      "title": "string",
      "description": "string",
      "location": "string",
      "price": "string",
      "rating": number
    }
  ],
  "query": { "destination": "...", "serviceType": "...", "date": "..." }
}
```

The API currently returns a fixed set of mock results. All three fields are required; missing fields return 400.

## Fonts

- **Inter** and **Onest** (Google Fonts), with Latin and Cyrillic support.

## Deploy

You can deploy on [Vercel](https://vercel.com) or any host that supports Next.js. See [Next.js Deployment](https://nextjs.org/docs/app/building-your-application/deploying).

---

*Azamaza — all in one place.*
