const Role = require('../models/role');
const User = require('../models/user');
const Categorie = require('../models/categories')
const Product = require('../models/product');


/*
* User validates
*/
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
    if (!existUser) {
        throw new Error ('User Id doesn´t exist!')
        }
}

/*
* Categories validates
*/

const categorieExistById = async (id) =>{
    const existCategorie = await Categorie.findById(id);
    if (!existCategorie) {
        throw new Error ('Categorie doenst exist!')
    }
}

/*
* Product validates
*/

const productExistById = async (id) =>{
    const existProduct = await Product.findById(id);
    if (!existProduct) {
        throw new Error ('Product doenst exist!')
    }
}

module.exports = {
    isRoleValidate,
    emailExist,
    userExistById,
    categorieExistById,
    productExistById
}

