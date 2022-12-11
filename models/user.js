const {Schema, model} = require('mongoose');


const userSchema = Schema({
    name: {
        type: String,
        required: [true, 'Name is required']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Password is required']
    },
    google: {
        type: Boolean,
        default: false
    },
    role: {
        type: String,
        required: true,
        enum: ['ADMIN_ROLE', 'USER_ROLE']
    },
    img: {
        type: String
    },
    state: {
        type: Boolean,
        default: true
    }
})

//Modify method toJSON
userSchema.methods.toJSON = function() {
    const { password, __v, ...user} = this.toObject();
    return user;
}



module.exports = model('User',userSchema);