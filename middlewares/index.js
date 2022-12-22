


const validateCamp = require('../middlewares/validate-camp');
const validateJWT = require('../middlewares/validate-jwt');
const validateRoles = require('../middlewares/validate-role');
const validateCategorie = require('../middlewares/validate-categorie')


module.exports = {
  ...validateCamp,
  ...validateJWT,
  ...validateRoles,
  ...validateCategorie
}
