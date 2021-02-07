const express = require('express');
let router = express.Router();

const favoritesController = require('../controllers/FavoritesController');
const findUser = require('../middlewares/findUser');
const authenticateOwner = require('../middlewares/authenticateOwner');

const jwtMiddleware = require('express-jwt');
const secrets = require('../config/secret');

router.route('/')
    .get(jwtMiddleware({secret: secrets.jwtSecret, algorithms: ["HS256"]}),findUser, favoritesController.index)
    .post(favoritesController.create);

router.route('/:id')
    .delete(favoritesController.find,authenticateOwner,favoritesController.destroy)

module.exports = router;
