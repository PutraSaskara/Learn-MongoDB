const express = require('express')
// const prodController = require('../controllers/product')
const shopController = require('../controllers/shop')
const router = express.Router()

router.post('/post-item-cart', shopController.postItemCart)
router.get('/categories', shopController.getCategories)

module.exports = router