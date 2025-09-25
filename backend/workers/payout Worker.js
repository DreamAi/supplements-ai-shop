const Queue = require('bullmq').Queue;
const paymentService = require('../services/paymentService');
const Redis = require('ioredis');
const connection = new Redis(process.env.REDIS_URL);

const payoutQueue = new Queue('payouts', { connection });

async function scheduleWeeklyPayout(){
  // This enqueue would be triggered by a scheduler (cron / k8s cronjob)
  await payoutQueue.add('weekly-payout', {}, { repeat: { cron: '0 2 * * 1' } }); // every Monday 02:00
}

// Worker at runtime processes aggregated transfers to avoid tiny payouts
module.exports = { scheduleWeeklyPayout };
