const boom = require('@hapi/boom')
const faker = require('faker')


class ProductsService {
  constructor() {
    this.products = []
    this.generate()
  }

  async generate() {
  const limit = 100

  for (let index = 0; index < limit; index++) {
    this.products.push({
          id: faker.datatype.uuid(),
          name: faker.commerce.productName(),
          price: parseInt(faker.commerce.price(), 10),
          image: faker.image.imageUrl(),
          isBlock: faker.datatype.boolean(),
      })
    }
  }

  async create(body) {
    const createProduct = {
      id: faker.datatype.uuid(),
      ...body
    }
    this.products.push(createProduct)
    return createProduct
  }

  async find() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this.products)
      }, 500)
    })

  }

  async findOne(id) {
    const findProductId = this.products.find(product => product.id === id)
    if (!findProductId) {
      throw boom.notFound('Product not found')
    }
    if (findProductId.isBlock) {
      throw boom.conflict('Product is blocked')
    }
    return findProductId
  }

  async update(id, body) {
    const index = this.products.findIndex(product => product.id === id)
    if (index === -1) {
      throw boom.notFound('Product not found')
    } else {
      const product = this.products[index]
      this.products[index] = {
        ...product,
        ...body
      }
    }
    return this.products[index]

  }

  async delete(id) {
    const findProductId = this.products.findIndex(product => product.id === id)
    if(findProductId === -1) {
      throw boom.notFound('Product not found')
    } else {
      // metodo splice le enviamos la posicion dentro del array
      // y el numero de elementos que queremos eliminar
      this.products.splice(findProductId, 1)
    }
    return {
      message: 'Product deleted',
      id
    }
  }
}

module.exports = ProductsService
