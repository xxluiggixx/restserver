const { request, response } = require('express');
const Categorie = require('../models/categories');

const getCategories = async (req, res= response) => {

   const { limit = 5 } = req.query;

   try {

    const [ total, categories] = await Promise.all([
        Categorie.countDocuments({state: true}),
        Categorie.find()
        .limit(Number(limit))
        .populate('user')
    ])
    
    res.json({ total, 
                categories });

   } catch (error) {

    console.log(error)
    res.status(500).json({
        msg: 'Error with DB'
    })
   }

}

const getOneCategories = async (req, res= response) => {

    res.json({
        mgs:'get Onecategories'
    })
}

const updateCategories = async (req, res= response) => {

    res.json({
        mgs:'get Updatecategories'
    })
}

const deleteCategories = async (req, res= response) => {

    res.json({
        mgs:'get DeleteCategories'
    })
}

const createCategories = async (req, res= response) => {

    try {
        const name = req.body.name.toUpperCase();
    
        const categorieDB = await Categorie.findOne({name});
    
        if( categorieDB) {
            return res.status(400).json({
                msg: `${name} categorie already exist!`
            })
        }
    
        //Generate data to save
        const data = {
            name,
            user: req.user._id
        }
    
        const categorie = new Categorie( data );
        await categorie.save();
    
        res.status(201).json( categorie );
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Error at create categorie'
        })    
    }
}


module.exports = {
    getCategories,
    createCategories,
    deleteCategories,
    updateCategories,
    getOneCategories
}