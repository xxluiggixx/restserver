const { response } = require("express");


const uploadFile = (req, res = response) => {

  res.json({
    msg: 'hola mundo'
  })
}

module.exports = {
    uploadFile
}
