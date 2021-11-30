const express = require('express')
const routerApi = require('./routes')
const app = express()
const PORT = 3000

// esto nos permite leer el body de las endpoints
app.use(express.json())

// importamos el router y luego le pasamos la aplicación
routerApi(app)


app.listen(PORT, () => {
    console.log(`App listening at http://localhost:${PORT}`)
})
