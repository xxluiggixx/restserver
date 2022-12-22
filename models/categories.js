const {Schema, model} = require('mongoose');

const categorieSchema = Schema({
    name:{
        type: String,
        required: [true, 'Name is required'],
        unique: true
    },
    state: {
        type: Boolean,
        default: true,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
})
//Modify method toJSON
categorieSchema.methods.toJSON = function() {
  const { state, __v,  ...categorie} = this.toObject();
  return categorie;
}

module.exports = model('Categorie', categorieSchema);
