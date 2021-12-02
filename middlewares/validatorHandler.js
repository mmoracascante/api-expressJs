const boom = require('@hapi/boom')

function validatorHandler (schema, property) {
  return (req, res, next) => {
    // De este modo extraemos la informacion de manera dinamica
    // La información puede venir por req.body, req.params o req.query
    const data = req[property]
    // si es un schema que viene por Joi viene una propiedad llamada .validate()
    const {error} = schema.validate(data, { abortEarly: false })
    if(error) {
      next(boom.badRequest(error))
    }
    next()
  }
}


module.exports = validatorHandler
