const express = require('express')
const faker = require('faker')

const router = express.Router()

router.get('/:categoryId/products/:productId', (req, res) => {
  const { categoryId, productId } = req.params
  res.json(
      {
          categoryId,
          productId,
          name: 'Product 1',
          price: 2000
      },
  )
})


module.exports = router
