const express = require('express');
let router = express.Router();

const visitsController = require('../controllers/VisitsController');
const authenticateOwner = require('../middlewares/authenticateOwner');

const jwtMiddleware = require('express-jwt');
const secrets = require('../config/secret');

router.route('/')
    .get(jwtMiddleware({secret: secrets.jwtSecret, algorithms: ["HS256"]}), visitsController.index)
    .post(visitsController.create);

router.route('/:visit_id')
    .delete(visitsController.find,authenticateOwner,visitsController.destroy)

module.exports = router;
