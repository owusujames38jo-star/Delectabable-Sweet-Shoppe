# Divine Delectable Sweet and Treats LLC — Frontend

Modern multi-page bakery storefront for **Divine Delectable Sweet and Treats LLC** (brand color `#EE5A98` + white), including:

- Shop/menu with product details
- Cart + checkout
- Travel baker emphasis (Michigan-based, available USA/worldwide)
- Carousels (hero, gallery, testimonials)
- Custom order + contact inquiry forms
- Demo “advanced” pricing logic (tax estimate, fulfillment fees, promo codes, deposit option for travel)

## Run locally

Install:

```bash
npm install
```

Start dev server:

```bash
npm run dev
```

Build production bundle:

```bash
npm run build
```

Preview production build:

```bash
npm run preview
```

## Payments note (important)

This project includes a **complete checkout UI + receipt flow** using a demo provider (**MockPay**).

For real credit/debit card charging, you’ll typically connect **Stripe** which requires a small backend endpoint (to create a PaymentIntent). The code already includes a Stripe-ready provider adapter you can swap in once a server is added.
