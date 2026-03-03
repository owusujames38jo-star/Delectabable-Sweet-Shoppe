export function createMockPayProvider() {
  return {
    id: 'mockpay',
    label: 'MockPay (demo)',
    async confirmPayment({ amountCents, billing }) {
      await new Promise((r) => setTimeout(r, 800))
      const receiptId = `DD-${Math.random().toString(16).slice(2, 10).toUpperCase()}`
      return {
        ok: true,
        receiptId,
        amountCents,
        billing,
        createdAt: new Date().toISOString(),
        status: 'paid',
      }
    },
  }
}

export function createStripeReadyProvider() {
  // Front-end wiring placeholder:
  // A real Stripe integration requires a server endpoint to create a PaymentIntent.
  // This provider demonstrates the adapter contract and can be swapped when backend is added.
  return {
    id: 'stripe',
    label: 'Stripe (requires server)',
    async confirmPayment() {
      return {
        ok: false,
        error:
          'Stripe requires a server to create a PaymentIntent. Connect the backend to enable card payments.',
      }
    },
  }
}

