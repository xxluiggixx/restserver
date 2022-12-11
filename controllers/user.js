const { response, request } = require('express');
const bcryptjs = require('bcryptjs');

const User = require('../models/user');

const userGet = (req, res = response)=>{
    const { nombre, apiKey } = req.query;
    res.json({
        ok: true,
        message: 'get API - controlador',
        nombre,
    })  ;
   }

const userPost = async (req = request, res)=>{


    const { name, email, password, role } = req.body;
    const user = new User( { name, email, password, role } );

    //verify if email exist!
    
    
    //Encrypt password
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync(password, salt);

    await user.save();

    res.json({
        ok: true,
        message: 'post API - controlador',
        user
    })  ;
   }

const userPut = async (req, res)=>{
    const { id } = req.params;
    const { _id, password, google, email, ...resto } = req.body;

    //TODO validar contra la bd
    if( password ) {
        //Encrypt password
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password, salt);
    }

    const user = await User.findByIdAndUpdate( id,resto );

    res.json({
        ok: true,
        message: 'put API - controlador',
        user
    })  ;
   }

const userDelete =  (req, res)=>{
    res.json({
        ok: true,
        message: 'delete API'
    })  ;
   }

const userPatch =  (req, res)=>{
    res.json({
        ok: true,
        message: 'patch API'
    })  ;
   }


module.exports = {
    userGet,
    userPost,
    userPut, 
    userDelete,
    userPatch
}