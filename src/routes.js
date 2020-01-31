const { Router } = require('express');
const { errHandle } = require('./app/helpers/ErrHelpers.js');
const CurriculoController = require('./app/controllers/CurriculoController.js')

const routes = Router()

routes.get('/api/curriculo', CurriculoController.get);

routes.use((err, req, res, next) => {
    if(!err.statusCode) err.statusCode = 500
    errorHandle(err)
})

routes.get('/*',(req, res) => res.status(404).send('Rota não Existe: 404'));

module.exports = routes;
