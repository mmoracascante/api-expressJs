const express = require('express')
const ProductsService = require('../services/productsService')
const validatorHandler = require('../middlewares/validatorHandler')
const { createProductSchema, updateProductSchema, getProductSchema, } = require('../schema/productSchema')

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

router.get('/:productId',
// con esto validamos al informacion que nos mandan desde el cliente
// le pasamos como primer dato el schema y de donde va sacar la información a validar
validatorHandler(getProductSchema, 'params'), async (req, res, next) => {
  const { productId } = req.params
  try {
    const findProductId = await productsServices.findOne(productId)
    res.json({
      message: 'Product retrieved',
      data: findProductId
    })
  } catch(e) {
    // next nos ayuda a ejecutar los middlewares de tipo error
    // aqui lo hacemos de forma explícita
    next(e)
  }
})

router.post('/',
validatorHandler(createProductSchema, 'body'),
async (req, res) => {
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

router.patch('/:id',
validatorHandler(getProductSchema, 'params'),
validatorHandler(updateProductSchema, 'body'),
async (req, res, next) => {
  const {id} = req.params
  const body = req.body

  try {
    const updateProduct = await productsServices.update(id, body)
    res.status(200).json({
      message: 'Product updated',
      data: updateProduct
    })
  } catch(e) {
    next(e)
  }
})

router.delete('/:id',
validatorHandler(getProductSchema, 'params'),
(req, res) => {
  const {id} = req.params
  const deleteProduct = productsServices.delete(id)
  res.json(deleteProduct)

})

module.exports = router
