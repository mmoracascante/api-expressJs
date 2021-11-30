const express = require('express')
const ProductsService = require('../services/productsService')

const productsServices = new ProductsService()

const router = express.Router()

router.get('/', async (req, res) => {
  try {
    const products = await productsServices.find()
    res.json(products)
  } catch (e) {
    throw new Error('Error', e)
  }

})

router.get('/:productId', async (req, res) => {
  const { productId } = req.params
  try {
    const findProductId = await productsServices.findOne(productId)
    res.json({
      message: 'Product retrieved',
      data: findProductId
    })
  } catch(e) {
    throw new Error('Error', e)
  }
})

router.post('/', async (req, res) => {
  const body = req.body
  try {
    const createProduct = await productsServices.create(body)
    res.status(201).json({
      message: 'Product created',
      data: createProduct
    })
  } catch(e) {
    throw new Error('Error', e)
  }
})

router.patch('/:id', async (req, res) => {
  const {id} = req.params
  const body = req.body

  try {
    const updateProduct = await productsServices.update(id, body)
    res.status(200).json({
      message: 'Product updated',
      data: updateProduct
    })
  } catch(e) {
    throw new Error('Error', e)
  }
})

router.delete('/:id',(req, res) => {
  const {id} = req.params
  const deleteProduct = productsServices.delete(id)
  res.json(deleteProduct)

})

module.exports = router
