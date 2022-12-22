const { response } = require("express");
const Product = require('../models/product');

const getProducts = async ( req, res=response ) => {
  try {
    const { limit = 5 } = req.query;
    const query= {state:true}

    const [total, products] =  await Promise.all([
                                          Product.countDocuments(query),
                                          Product.find(query).populate('user categorie', 'name').limit(Number(limit))])


    res.status(201).json({total,products});



  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Error with server"
    })
  }

};

const createProduct = async ( req, res=response ) => {


    try {
      let { name, categorie, state, user, ...body } = req.body;
      name = req.body.name.toUpperCase();

      //Generate data to save
      const data = {
          name,
          user: req.user._id,
          categorie: req.categorie._id,
          ...body
      }

      const productDB = await Product.findOne({ name });

      if( productDB) {
          return res.status(400).json({
              msg: `${name} product already exist!`
          })
      }

      const product = new Product( data );
      await product.save();

      res.status(201).json( product );

    } catch (error) {
      console.log(error)
      res.status(500).json({
          msg: 'Error at create product'
      })
    }
};

const deleteProduct = async ( req, res=response ) => {

  const { id } = req.params;

  const product = await Product.findByIdAndUpdate(id,{ state: false}, {new: true})
  res.status(200).json( product)

};

const updateProduct = async ( req, res=response ) => {

  const { id } = req.params;
  const {state, user, ...body} = req.body;

  if( body.name ){
    body.name = body.name.toUpperCase();
  }

  body.user = req.user._id;
  body.categorie = req.categorie._id;

  const product = await Product.findByIdAndUpdate(id, body, {new:true});

  res.status(200).json( product );

};

const getOneProduct = async ( req, res=response ) => {

  const { id } = req.params;

  const product = await Product.findById(id).populate('user categorie', 'name');

  res.status(200).json( product);

};



module.exports = {
    getProducts,
    createProduct,
    deleteProduct,
    updateProduct,
    getOneProduct
}
