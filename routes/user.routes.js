const { Router } = require('express');
const { body, check } =  require('express-validator');

/* const { validateCamp } = require('../middlewares/validate-camp');
const { validateJWT } = require('../middlewares/validate-jwt');
const { isAdminRole, haveRole } = require('../middlewares/validate-role'); */
const { validateJWT, validateCamp, haveRole } = require('../middlewares')

const { userGet,
        userPost,
        userPut,
        userDelete,
        userPatch } = require('../controllers/user');
const { isRoleValidate, emailExist, userExistById } = require('../helpers/db-validators');


const router = Router();

router.get('/', userGet);

router.post('/',
        body('name', 'Name is empty').not().isEmpty(),
        body('password', 'Password must be more than 6 letter').isLength({min: 6}),
        body('email', 'Invalid email').isEmail(),
        body('email').custom( emailExist ),
        body('role').custom( isRoleValidate ),
        validateCamp,
        userPost);

router.put('/:id',[
        check('id',' Invalid ID').isMongoId(),
        check('id').custom( userExistById ),
        body('role').custom( isRoleValidate ),
        validateCamp
        ], userPut);

router.delete('/:id',[
        validateJWT,
        haveRole(['ADMIN_ROLE','SALE_ROLE']),
        check('id',' Invalid ID').isMongoId(),
        check('id').custom( userExistById ),
        validateCamp
        ] ,userDelete);

router.patch('/', userPatch);



module.exports = router;
