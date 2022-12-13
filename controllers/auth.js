const { response } = require('express');
const bcryptjs = require('bcryptjs');

const User = require('../models/user');
const { generateJWT } = require('../helpers/generate-jwt');

const login = async (req, res = response) => {

    const { email, password } = req.body;

    try {

        //TODO: If email exist
        const user = await User.findOne({email})
        if (!user) {
            return res.status(400).json({
                msg: 'User doesn´t exist! - Email'
            })
        }
        //TODO: user is activate
        const { state, id } = user;
        if (!state) {
            return res.status(400).json({
                msg: 'User doesn´t exist! - State: false'
            })
        }

        //TODO: verify password
        const validPassword = bcryptjs.compareSync(password, user.password )
        if (!validPassword) {
            return res.status(400).json({
                msg: 'Invalid password'
            })
        }
        //TODO: Generate JWT
        const token = await generateJWT( id )
        res.json({
            user,
            token
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: 'Something wrong, please contact administrator'
        })
    }

}


module.exports = {
    login
}
