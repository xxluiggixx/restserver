const Role = require('../models/role');
const User = require('../models/user');

const isRoleValidate = async (role = '') => { 
    const existRole = await Role.findOne({role});
    if (!existRole){
            throw new Error(`The role ${role} don´t exist!`);
    }
}

const emailExist = async (email = '') => {
    const existEmail = await User.findOne( { email });
    if (existEmail) {
        throw new Error ('Email already exist!')
        }
}
const userExistById = async (id ) => {
    const existUser = await User.findById(id);
    console.log( existUser)
    if (!existUser) {
        throw new Error ('User Id doesn´t exist!')
        }
}

module.exports = {
    isRoleValidate,
    emailExist,
    userExistById
}

