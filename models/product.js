const { Schema, model } = require("mongoose");


const ProductSchema = Schema({
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
    },
    price: {
      type: Number,
      default: 0
    },
    categorie: {
      type: Schema.Types.ObjectId,
      ref: 'Categorie',
      required: true
    },
    description: { type: String },
    available: { type: Boolean, default: true },
});

//Modify method toJSON
ProductSchema.methods.toJSON = function() {
  const { state, __v,  ...categorie} = this.toObject();
  return categorie;
}

module.exports = model('Product', ProductSchema);
