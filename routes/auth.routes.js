const { Router } = require('express');
const { body, check } =  require('express-validator');
const {validateCamp} = require('../middlewares/validate-camp');


const { login, googleSignIn } = require('../controllers/auth');

const router = Router();

router.post('/login',[
        body('email','Email is require').isEmail(),
        body('password','Password is require').not().isEmpty(),
        validateCamp
        ], login);

router.post('/google',[
        body('id_token','id_token is necessary').not().isEmpty(),
        validateCamp
        ], googleSignIn);


module.exports = router;
