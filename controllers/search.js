const { response } = require("express");
const { ObjectId } = require("mongoose").Types;
const { User, Categorie, Product } = require('../models');


const colleccionAllow = [
  'user',
  'categorie',
  'product',
  'role'
]

const searchUser = async ( termino='', res= response) => {

  const isMongoID= ObjectId.isValid( termino ); //TRUE

  if( isMongoID ) {
    const user = await User.findById( termino );
    return res.json({
      results: ( user ) ? [ user ]: []
    })
  }

  const regex = new RegExp( termino, 'i');

  const users = await User.find( {
    $or:[{name: regex}, { mail: regex}],
    $and: [{ state: true }]
   });

  return res.json({
    results: users
  })
}

const searchCategorie = async ( termino='', res= response) => {

  const isMongoID= ObjectId.isValid( termino ); //TRUE

  if( isMongoID ) {
    const categorie = await Categorie.findById( termino ).populate('user','name');
    return res.json({
      results: ( categorie ) ? [ categorie ]: []
    })
  }

  const regex = new RegExp( termino, 'i');

  const categories = await Categorie.find( {name: regex, state: true }).populate('user','name');

  return res.json({
    results: categories
  })
}

const searchProduct = async ( termino='', res= response) => {

  const isMongoID= ObjectId.isValid( termino ); //TRUE

  if( isMongoID ) {
    const product = await Product.findById( termino ).populate('categorie','name');
    return res.json({
      results: ( product ) ? [ product ]: []
    })
  }

  const regex = new RegExp( termino, 'i');

  const products = await Product.find( {
    $or:[{name: regex}, { description: regex}],
    $and: [{ state: true }]
   }).populate('categorie','name');

  return res.json({
    results: products
  })
}


const search = async (req, res = response) =>{

  const { collection, termino } = req.params;

  if( !colleccionAllow.includes( collection ) ){
    return res.status(401).json({
      msg: `collection allow are ${colleccionAllow}`
    })
  }

  switch (collection) {

    case 'user':
      searchUser(termino, res);

    break;
    case 'categorie':
      searchCategorie(termino, res);

    break;
    case 'product':
      searchProduct(termino, res);

    break;

    default:
      res.status(500).json({
        msg: 'Role feature doesnt available'
      })

  }

};




module.exports = {
    search
}
