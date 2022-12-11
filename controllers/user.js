const { response, request } = require('express');
const bcryptjs = require('bcryptjs');

const User = require('../models/user');

const userGet = async (req, res = response)=>{
    const { limit = 5, since = 0 } = req.query;

    const [ total, users ] = await Promise.all([
        User.countDocuments({ state: true }),
        User.find({ state: true })
        .skip(Number(since))
        .limit(Number(limit))])

    res.json({ total,
                users
            });
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

    res.json(user)  ;
   }

const userDelete = async (req, res)=>{
    const { id } = req.params;
    const user = await User.findByIdAndUpdate(id,{ state: false });
    res.json({
        message: `User ID: ${ id } has been delete`,
        user
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