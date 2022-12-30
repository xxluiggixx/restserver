const path = require('path');
const fs = require('fs');
const { response } = require("express");
const { uploadFile } = require("../helpers/uploads-file");
const { User, Product } = require('../models');

const loadFile = async (req, res = response) => {

  try {
    
    const nameFile = await uploadFile( req.files, ['txt','md'], 'textos');
    res.json({
      nameFile
    })
  } catch (msg) {
    res.status(400).json({msg});
  }

}

const updateImage = async (req, res = response) => {

  const { id, collection } = req.params;

  let model;

  switch (collection) {
    case 'user':

    model = await User.findById(id);
    if(!model){
      return res.status(400).json({
        msg: `User id: ${id}, not found`
      })
    }

      break;
    case 'product':
      model = await Product.findById(id);
      if(!model){
        return res.status(400).json({
          msg: `Product id: ${id}, not found`
        })
      }
      break;
  
    default:
      return res.status(500).json({
        msg: 'Need validate this one'
      })
  }
  try {
    //Delete image
    if( model.img) {
      //Delete image from server
      const pathImage = path.join(__dirname,'../uploads',collection,model.img);
      if( fs.existsSync( pathImage) ){
        fs.unlinkSync( pathImage );
      }
    }

    const nameImage = await uploadFile( req.files, undefined, collection);
    model.img = nameImage;
  
    await model.save();
  
    res.json(model);
    
  } catch (msg) {
    res.status(400).json({msg});
  }

}

const showImage = async (req, res = response)=> {

  const { id, collection } = req.params;

  let model;

  switch (collection) {
    case 'user':

    model = await User.findById(id);
    if(!model){
      return res.status(400).json({
        msg: `User id: ${id}, not found`
      })
    }

      break;
    case 'product':
      model = await Product.findById(id);
      if(!model){
        return res.status(400).json({
          msg: `Product id: ${id}, not found`
        })
      }
      break;
  
    default:
      return res.status(500).json({
        msg: 'Need validate this one'
      })
  }

  
  if( model.img) {
    //Search image from server
    const pathImage = path.join(__dirname,'../uploads',collection,model.img);
    if( fs.existsSync( pathImage) ){
      return res.sendFile(pathImage)
    }
  }

  const pathImageNotFound = path.join(__dirname,'../assets/no-image.jpg');
  res.sendFile( pathImageNotFound );

}

module.exports = {
    loadFile,
    updateImage,
    showImage
}
