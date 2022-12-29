const { Router } = require('express');
const { body, check } =  require('express-validator');
const { loadFile } = require('../controllers/uploads');
const {validateCamp} = require('../middlewares/validate-camp');


const router = Router();


router.post('/', loadFile);


module.exports = router;
