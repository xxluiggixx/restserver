const { Router } = require('express');
const { body, check } =  require('express-validator');
const {validateCamp} = require('../middlewares/validate-camp');


const { login } = require('../controllers/auth');

const router = Router();

router.post('/login',[
        body('email','Email is require').isEmail(),
        body('password','Password is require').not().isEmpty(),
        validateCamp
        ], login);


module.exports = router;
