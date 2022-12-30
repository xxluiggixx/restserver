


const validateCamp  = require('../middlewares/validate-camp');
const validateJWT   = require('../middlewares/validate-jwt');
const validateRoles = require('../middlewares/validate-role');
const validateCategorie = require('../middlewares/validate-categorie');
const validateAttachmentFile = require('./validate-file');


module.exports = {
  ...validateCamp,
  ...validateJWT,
  ...validateRoles,
  ...validateCategorie,
  ...validateAttachmentFile
}
