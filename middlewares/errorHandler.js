function logErrors (err, req, res, next) {
  console.error(err)
  next(err)
}

// Detectar un error pero va crear un formato para devolverselo al cliente
function errorHandler (err, req, res, next) {
  res.status(500).json({
    message: err.message,
    stack: err.stack,
  })
}

function boomErrorHandler (err, req, res, next) {
  if(err.isBoom) {
    // tiene toda la informacion del error aqui
    const { output } = err
    res.status(output.statusCode).json(output.payload)
  }
  next(err)
}


module.exports = {
  logErrors,
  errorHandler,
  boomErrorHandler
}
