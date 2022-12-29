
const { response } = require("express");
const { uploadFile } = require("../helpers/uploads-file");


const loadFile = async (req, res = response) => {

  if (!req.files || Object.keys(req.files).length === 0) {
    res.status(400).json({msg:'No files were uploaded.'});
    return;
  }
  if (!req.files.file) {
    res.status(400).json({msg:'No files were uploaded.'});
    return;
  }

  const nameFile = await uploadFile(req.files,);

  res.json({
    nameFile
  })
}

module.exports = {
    loadFile
}
