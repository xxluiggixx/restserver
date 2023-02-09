const { request, response } = require('express');
const bcryptjs = require('bcryptjs');

const User = require('../models/user');
const { generateJWT } = require('../helpers/generate-jwt');
const { googleVerify } = require('../helpers/google-verify');

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

const googleSignIn = async (req, res = response) => {

    const { id_token } = req.body;

    try {

        const { name, img, email } = await googleVerify( id_token );

        let user = await User.findOne( { email } );

        if(!user) {
            //TODO: create user
            const data = {
                name,
                img,
                email,
                password: ':P',
                role: 'USER_ROLE',
                google:true

            }

            user = new User(data);
            await user.save();
        }

        //If user was erase (!state)
        if( !user.state ) {
            return res.status(401).json({
                msg: 'Talk with administrator, user block'
            })
        }

        //TODO: Generate JWT
        const token = await generateJWT( user.id );


        res.json({
            user,
            token
        })

    } catch (error) {
        console.log(error)
        res.status(400).json({
            ok: false,
            msg: ' Token can´t verify'
        })
    }

}

const renovarToken = async (req, res= response) => {
    const { user } = req;

    //Generate JWT
    const token = await generateJWT( user.id );
    res.json({
        user,
        token
    })
}


module.exports = {
    login,
    googleSignIn,
    renovarToken
}
