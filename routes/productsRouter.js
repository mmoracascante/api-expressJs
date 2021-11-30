const express = require('express')
const faker = require('faker')

const router = express.Router()

router.get('/',(req, res) => {
  const { size } = req.query
  const products = []
  const limit = size || 10

  for (let index = 0; index < limit; index++) {
      products.push({
          name: faker.commerce.productName(),
          price: parseInt(faker.commerce.price(), 10),
          image: faker.image.imageUrl(),
      })
  }
  res.json(products)
})

router.get('/:productId',(req, res) => {
  const { productId } = req.params

  res.json(
      {
          id: productId,
          name: 'Product 1',
          price: 2000
      },
  )
})

router.post('/',(req, res) => {
  const body = req.body

  res.status(201).json({
    message: 'Product created',
    data: body
  })
})

router.patch('/:id',(req, res) => {
  const {id} = req.params
  const body = req.body

  res.json({
    message: 'Product updated',
    data: body,
    id
  })
})

router.delete('/:id',(req, res) => {
  const {id} = req.params

  res.json({
    message: 'Product deleted',
    id
  })
})

module.exports = router
