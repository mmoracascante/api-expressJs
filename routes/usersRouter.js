const express = require('express')
const faker = require('faker')

const router = express.Router()

// app.get('/', (req, res) => {
//     const { limit, offset } = req.query

//     {
//         limit && offset ?
//         res.json({
//             limit,
//             offset
//         }) :
//         res.send('No hay parámetros')
//     }
// })

router.get('/',(req, res) => {
  const { size } = req.query
  const users = []
  const limit = size || 10

  for (let index = 0; index < limit; index++) {
      users.push({
          userName: faker.name.findName(),
          email: faker.internet.email(),
      })
  }
  res.json(users)
})

router.get('/:userId',(req, res) => {
  const { userId } = req.params

  res.json({
    id: userId,
    userName: 'Arturo Calle',
    email: 'arturostreet@gmail.com'
  })
})


module.exports = router
