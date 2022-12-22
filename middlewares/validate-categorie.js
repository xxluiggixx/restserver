const Categories = require('../models/categories');




const validateCategorie = async (req, res, next) => {

  try {

    const categorie = req.body.categorie.toUpperCase();

    const data = await Categories.findOne({name:categorie});

    if(!data){
      res.status(400).json({
        msg: "Categorie doesnt exist!"
      })
    }
    req.categorie = data;
    next()
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Error with server"
    })
  }

}


module.exports = {
  validateCategorie}
