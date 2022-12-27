const { Router } = require('express');
const { check, body } = require('express-validator');

const {
    getProducts,
    createProduct,
    deleteProduct,
    updateProduct,
    getOneProduct } = require('../controllers/product');

    const { productExistById } = require('../helpers/db-validators');

    const { validateJWT, validateCamp, haveRole, isAdminRole, validateCategorie } = require('../middlewares')


const router = Router();

// Public API
router.get('/', getProducts);

// Public API get One Product
router.get('/:id',[
                  check('id',' Invalid ID').isMongoId(),
                  check('id').custom( productExistById ),
                  validateCamp,
                  ], getOneProduct);

//Private API - JWT
router.post('/',[
                validateJWT,
                body('name','Name is required').not().isEmpty(),
                validateCategorie,
                validateCamp], createProduct);

//Private API - JWT
router.put('/:id',[
                validateJWT,
                check('id').custom( productExistById ),
                validateCategorie,
                validateCamp], updateProduct);

//Private API - JWT
router.delete('/:id',[
                      validateJWT,
                      isAdminRole,
                      check('id',' Invalid ID').isMongoId(),
                      check('id').custom( productExistById ),
                      validateCamp,
                      ], deleteProduct);



module.exports = router;
