const Stripe = require('stripe');
const stripe = new Stripe(process.env.STRIPE_SECRET);

module.exports = {
  createPaymentIntent: async ({ amount, currency='zar', metadata={} }) => {
    // create a payment intent on connected account or platform
    return await stripe.paymentIntents.create({
      amount,
      currency: currency === 'zar' ? 'zar' : 'usd',
      metadata
    });
  },

  processSuccessfulPayment: async (pi) => {
    // Basic payout split (60% owner, 20% ai fund, 20% reserve)
    // For real: use Stripe Connect transfers or separate connected accounts.
    const amount = pi.amount_received; // in cents
    const ownerAmount = Math.round(amount * 0.60);
    const aiFundAmount = Math.round(amount * 0.20);
    const reserveAmount = amount - ownerAmount - aiFundAmount;

    // Example: create Transfers to connected accounts (requires Stripe Connect)
    // placeholder connected account IDs in env: OWNER_ACC, AI_ACC, RESERVE_ACC
    await Promise.all([
      stripe.transfers.create({amount: ownerAmount, currency: pi.currency, destination: process.env.OWNER_ACC}),
      stripe.transfers.create({amount: aiFundAmount, currency: pi.currency, destination: process.env.AI_ACC}),
      stripe.transfers.create({amount: reserveAmount, currency: pi.currency, destination: process.env.RESERVE_ACC})
    ]);

    // schedule weekly payouts: you can make a cron job / worker (see /workers/payoutWorker.js)
  }
};
