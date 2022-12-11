const { Router } = require('express');
const { userGet, 
        userPost,
        userPut,
        userDelete,
        userPatch } = require('../controllers/user');
const { body, check } =  require('express-validator');
const { validateCamp } = require('../middlewares/validate-camp');
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
        validateCamp
        ], userPut);

router.delete('/:id', userDelete);

router.patch('/', userPatch);



module.exports = router;