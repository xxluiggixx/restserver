const path = require('path');

const { response } = require("express");


const uploadFile = (req, res = response) => {

  if (!req.files || Object.keys(req.files).length === 0) {
    res.status(400).json({msg:'No files were uploaded.'});
    return;
  }
  if (!req.files.file) {
    res.status(400).json({msg:'No files were uploaded.'});
    return;
  }

  console.log('req.files >>>', req.files); // eslint-disable-line

  const { file } = req.files;

  const shortname = file.name.split('.');
  console.log(shortname);
  console.log('last extension', shortname[shortname.length-1]);
  const extensionFile = shortname[shortname.length-1];

  const extensionAllow = ['jpg', 'pdf'];

  if(!extensionAllow.includes(extensionFile) ){
    return res.json({
      msg: 'Invalid extension file, must be one of: '+ extensionAllow
    })
  }

  res.json({extensionFile});

  /* const uploadPath = path.join( __dirname, '../uploads/',file.name);

  file.mv(uploadPath, function(err) {
    if (err) {
      return res.status(500).json({err});
    }

    res.json({ msg:'File uploaded to ' + uploadPath});
  }); */
}

module.exports = {
    uploadFile
}
