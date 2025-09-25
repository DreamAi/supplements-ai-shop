const express = require('express');
const router = express.Router();

// lightweight product store (replace with DB)
const PRODUCTS = [
  { id: 'sea-moss', name:'Sea Moss', price:199, stock:500, image:'/images/seamoss.jpg', short:'Wild Atlantic sea moss' },
  { id: 'moringa', name:'Moringa', price:129, stock:400, image:'/images/moringa.jpg', short:'Organic leaf powder' },
  { id: 'calmag', name:'CalMag', price:179, stock:350, image:'/images/calmag.jpg', short:'Calcium + Magnesium complex' }
  // add others...
];

router.get('/', (req,res)=> res.json(PRODUCTS));
router.get('/:id', (req,res)=> {
  const p = PRODUCTS.find(x=>x.id===req.params.id);
  if(!p) return res.status(404).json({error:'Not found'});
  res.json(p);
});

module.exports = router;
