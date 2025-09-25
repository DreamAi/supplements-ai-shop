require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const products = require('./routes/products');
const orders = require('./routes/orders');
const aiChat = require('./routes/ai-chat');

const app = express();
app.use(bodyParser.json());
app.use(require('cors')());

app.use('/api/products', products);
app.use('/api/orders', orders);
app.use('/api/ai-chat', aiChat);

// health
app.get('/api/health', (req,res)=>res.json({ok:true, ts: Date.now()}));

const PORT = process.env.PORT || 4000;
app.listen(PORT, ()=> console.log(`Backend listening on ${PORT}`));
