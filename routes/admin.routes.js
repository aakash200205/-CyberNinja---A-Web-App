const express = require('express');

const router = express.Router();

const adminController = require('../controller/admin.controller');

router.get('/admin/products', adminController.getProducts);

router.get('/admin/products/new',adminController.getNewProducts);





module.exports=router;