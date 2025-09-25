const express = require('express');
const router = express.Router();
const aiService = require('../services/aiService');

router.post('/', async (req,res)=>{
  const { message } = req.body;
  try{
    const reply = await aiService.chatWithCustomer(message);
    res.json({ reply });
  }catch(e){
    console.error(e);
    res.status(500).json({ error:'AI error' });
  }
});

module.exports = router;
