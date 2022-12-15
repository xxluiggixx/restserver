


const validateCamp = require('../middlewares/validate-camp');
const validateJWT = require('../middlewares/validate-jwt');
const validateRoles = require('../middlewares/validate-role');


module.exports = {
  ...validateCamp,
  ...validateJWT,
  ...validateRoles,
}
