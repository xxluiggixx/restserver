const { request, response } = require('express');
const Categorie = require('../models/categories');

const getCategories = async (req, res= response) => {

   const { limit = 5 } = req.query;
   const query = {state: true}

   try {

    const [ total, categories] = await Promise.all([
        Categorie.countDocuments(query),
        Categorie.find(query)
        .limit(Number(limit))
        .populate('user','name')
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
    const { id } = req.params;
    const categorie = await Categorie.findById(id)
                                      .populate('user','name');
    res.json(categorie);
}

const updateCategories = async (req, res= response) => {
  try {
    const { id } = req.params;
    const  { state, user, ...data }= req.body;

    data.name = data.name.toUpperCase();
    data.user = req.user._id;


    const categorie = await Categorie.findByIdAndUpdate(id, data, { new: true});
    res.json(categorie);

  } catch (error) {
    console.log(error)  ;
    res.status(500).json({
      msg: 'Error! update categorie'
    })
  }

}

const deleteCategories = async (req, res= response) => {

  try {
    const { id } = req.params;
    //Generate data to save
    const data = {
      state: false,
      user: req.user._id
    };

    const categorie = await Categorie.findByIdAndUpdate(id, data, { new: true});
    res.json(categorie);

  } catch (error) {
    console.log(error)  ;
    res.status(500).json({
      msg: 'Error! delete categorie'
    })
  }
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
