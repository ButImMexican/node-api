const express = require('express');
let router = express.Router();

const applicationsController = require('../controllers/ApplicationsController');
const authenticateAdmin = require('../middlewares/authenticateAdmin');
const findUser = require('../middlewares/findUser');

const jwtMiddleware = require('express-jwt');
const secrets = require('../config/secret');

router.all('*', jwtMiddleware({secret: secrets.jwtSecret, algorithms: ["HS256"]}), findUser, authenticateAdmin);

router.route('/')
    .get(applicationsController.index)
    .post(applicationsController.create);

router.route('/:id')
    .delete(applicationsController.find,applicationsController.destroy)

module.exports = router;
