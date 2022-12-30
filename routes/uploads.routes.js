const { Router } = require('express');
const { check } =  require('express-validator');
const { loadFile, updateImage, showImage } = require('../controllers/uploads');
const {validateCamp, validateAttachmentFile} = require('../middlewares');
const { collectionAllow } = require('../helpers');


const router = Router();


router.post('/',[validateAttachmentFile], loadFile);

router.put('/:collection/:id', [
            validateAttachmentFile,
            check('id','Id must be Id mongo').isMongoId(),
            //check('collection').custom( c => collectionAllow( c, ['user', 'product'] )),
            check('collection','Collection not allow').isIn(['user', 'product'] ),
            validateCamp,
            ], updateImage);

router.get('/:collection/:id', [
            check('id','Id must be Id mongo').isMongoId(),
            //check('collection').custom( c => collectionAllow( c, ['user', 'product'] )),
            check('collection','Collection not allow').isIn(['user', 'product'] ),
            validateCamp,
            ], showImage);


module.exports = router;
