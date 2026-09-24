# Trust Pharma Vite Clone

A React + Vite recreation of the public-facing structure and visual language of `trustethiopharma.com`.

## Run locally

```bash
npm install
npm run dev
```

Production build:

```bash
npm run build
npm run preview
```

## Included routes

- `/`
- `/about-us`
- `/services`
- `/products`
- `/products/tablets`
- `/products/capsule`
- `/products/sachet`
- `/products/oral-liquid`
- `/products/suppository`
- `/products/shampoo-lotion`
- `/products/general-ointment-cream`
- `/contact-us`

## Content and asset notes

- The implementation recreates the layout/navigation pattern and uses paraphrased copy rather than redistributing long-form site text verbatim.
- Original image endpoints are referenced remotely in `src/data/site.js`; image files are **not** redistributed in this zip. Replace them with assets you own or have licensed before production use.
- The Tablets page includes the public product-table facts that were available from the source crawl.
- Capsule, Sachet and Oral Liquid item-level tables were not reliably retrievable while the live site was timing out. Their routes and page templates are complete, with an editable data location in `src/data/products.js`.
- The contact form is front-end only. Wire `submit()` in `src/pages/Contact.jsx` to your API/email provider.

## Deployment

The included `public/_redirects` handles SPA routing on Netlify. On other hosts, configure all app routes to fall back to `index.html`.
