const express = require('express');

const router = express.Router();

router.get('/products', function(req,res){
    res.render('/customer/product/allProducts');
})


module.exports= router;