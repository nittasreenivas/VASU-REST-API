const {Product} = require('../models/Product')
const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const {Create_Product,Get_ALL_PRODUCTS,GET_PROD_BY_ID,UPDATE_PRODUCT,DELETE_PRODUCT} = require('../controllers/productsController')

router.post('/products',Create_Product)

router.get('/products',Get_ALL_PRODUCTS)

router.get('/products/:id',GET_PROD_BY_ID)

router.put('/products/:id',UPDATE_PRODUCT)
router.delete('/products/:id',DELETE_PRODUCT)

module.exports = router