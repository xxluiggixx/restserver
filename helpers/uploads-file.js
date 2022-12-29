const path = require('path');
const { v4: uuidv4 } = require('uuid');

const uploadFile = ( files, extensionAllow = ['jpg', 'pdf'], directory= ''  ) => {

  return new Promise((resolve, reject) => {

    const { file } = files;

    const shortName = file.name.split('.');

    const extensionFile = shortName[shortName.length-1];

    //Validate extension
    if(!extensionAllow.includes(extensionFile) ){
      return reject(`Invalid extension file, must be one of: ${extensionAllow}`);
    }

    const nameTempFile = uuidv4() + '.'+ extensionFile;

    const uploadPath = path.join( __dirname, '../uploads/', directory, nameTempFile);

    file.mv(uploadPath, function(err) {
      if (err) {
        return reject(err);
      }

      resolve(nameTempFile);
    });
  })

}


module.exports = {
  uploadFile
}
