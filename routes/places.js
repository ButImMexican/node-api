const express = require('express');

let router = express.Router();

const PlacesController = require('../controllers/PlacesController');
const authenticateOwner = require('../middlewares/authenticateOwner');

router.route('/')
    .get(PlacesController.index)
    .post(PlacesController.multerMiddleware(),
    PlacesController.create,
    PlacesController.saveImage);

router.route('/:id')
    .get(PlacesController.find,PlacesController.show)
    .put(PlacesController.find,authenticateOwner,PlacesController.update)
    .delete(PlacesController.find,authenticateOwner,PlacesController.destroy);  
  
module.exports = router;