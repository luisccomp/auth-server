const { Router } = require('express');

const UserController = require('./controllers/UserController');
const AuthenticationController = require('./controllers/AuthenticationController');


const routes = Router();

routes.post('/users', UserController.create);

routes.get('/auth', AuthenticationController.validate);
routes.post('/auth', AuthenticationController.login);

module.exports = routes;
