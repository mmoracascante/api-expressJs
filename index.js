const express = require('express')
const routerApi = require('./routes')
const { logErrors, errorHandler, boomErrorHandler } = require('./middlewares/errorHandler')
const app = express()
const PORT = 3000

// esto nos permite leer el body de las endpoints
app.use(express.json())

// importamos el router y luego le pasamos la aplicación
routerApi(app)

// Los middlewares de tipo error se deben hacer déspues de definir el routing
// El orden en que lo colocamos es el orden en que se ejecuta
app.use(logErrors)
app.use(boomErrorHandler)
app.use(errorHandler)


app.listen(PORT, () => {
    console.log(`App listening at http://localhost:${PORT}`)
})
