const { response, request } = require('express');

const userGet = (req, res = response)=>{
    const { nombre, apiKey } = req.query;
    res.json({
        ok: true,
        message: 'get API - controlador',
        nombre,
    })  ;
   }

const userPost = (req = request, res)=>{
    const body = req.body;
    res.json({
        ok: true,
        message: 'post API - controlador',
        body
    })  ;
   }

const userPut = (req, res)=>{
    const { id } = req.params;
    res.json({
        ok: true,
        message: 'put API - controlador',
        id
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