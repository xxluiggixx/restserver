const { Router } = require('express');
const { body, check } =  require('express-validator');
const { uploadFile } = require('../controllers/uploads');
const {validateCamp} = require('../middlewares/validate-camp');


const router = Router();


router.post('/', uploadFile);


module.exports = router;
