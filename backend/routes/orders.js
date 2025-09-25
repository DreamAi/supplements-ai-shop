const express = require('express');
const router = express.Router();
const paymentService = require('../services/paymentService');

// Place an order (simplified)
router.post('/', async (req,res)=>{
  const { customer, items, shipping } = req.body;
  // validate, compute totals, tax, shipping etc
  const orderTotal = items.reduce((s,i)=>s + i.price * i.qty, 0);
  // create payment intent via paymentService
  const paymentIntent = await paymentService.createPaymentIntent({ amount: Math.round(orderTotal*100), currency: 'zar', metadata:{customer: customer.email}});
  // store order in DB (left as exercise; return client_secret)
  res.json({ clientSecret: paymentIntent.client_secret });
});

// webhook endpoint for completed payments (example for Stripe-like)
router.post('/webhook', express.raw({type:'application/json'}), async (req,res)=>{
  const event = req.body; // in real stripe verify signature
  // process event: if payment succeeded -> fulfill -> schedule payout split
  try{
    const e = JSON.parse(event.toString());
    if(e.type === 'payment_intent.succeeded'){ 
      const pi = e.data.object;
      // register sale, call payout worker
      await paymentService.processSuccessfulPayment(pi);
    }
  }catch(err){ console.error(err); }
  res.sendStatus(200);
});

module.exports = router;
