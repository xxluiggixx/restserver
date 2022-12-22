const { Router } = require('express');
const { check, body } = require('express-validator');

const {
    getCategories,
    createCategories,
    deleteCategories,
    updateCategories,
    getOneCategories
                    } = require('../controllers/categories');
const { categorieExistById } = require('../helpers/db-validators');

const { validateJWT, validateCamp, haveRole, isAdminRole } = require('../middlewares')



const router = Router();


// Get all categories - paginado - total - populate - public
router.get('/', getCategories);

// Get one categorie - populate - public
router.get('/:id',[
    check('id').custom( categorieExistById ),
    validateCamp], getOneCategories);

// Create categorie - private with valid token
router.post('/', [
    validateJWT,
    body('name','Name is require').not().isEmpty(),
    validateCamp], createCategories);

// Update categorie - private with valid token
router.put('/:id', [
    validateJWT,
    body('name','Name is require').not().isEmpty(),
    check('id').custom( categorieExistById ),
    validateCamp], updateCategories);

// Delete categorie - private with Admin role
router.delete('/:id', [
    validateJWT,
    isAdminRole,
    check('id').custom( categorieExistById ),
    //haveRole(['ADMIN_ROLE']),
    validateCamp], deleteCategories);




module.exports = router;
