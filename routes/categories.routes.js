const { Router } = require('express');
const { check, body } = require('express-validator');

const { validateJWT, validateCamp, haveRole } = require('../middlewares')


const router = Router();


// Get all categories - public
router.get('/', validateCamp);

// Get one categorie - public
router.get('/:id', validateCamp);

// Create categorie - private with valid token
router.post('/:id', validateCamp);

// Update categorie - private with valid token
router.put('/:id', validateCamp);

// Delete categorie - private with Admin role
router.delete('/:id', validateCamp);




module.exports = router;
