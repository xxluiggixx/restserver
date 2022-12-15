const jwt = require('jsonwebtoken');

const User = require('../models/user');

const validateJWT = async ( req, res, next) => {
    const token = req.header('x-token');

    if ( !token ) {
        return res.status(401).json({
            msg: 'Token not found'
        })
    }

    try {

        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

        //TODO: read user uid
        const user = await User.findById(uid);

        //User doesnt exist
        if (!user) {
            return res.status(401).json({
                msg: 'Invalid token - user doesn´t exist!'
            })
        }


        //Verify if uid state false
        if(!user.state) {
            return res.status(401).json({
                msg: 'Invalid token - user with state false'
            })
        }




        req.user = user
        next()
    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg: 'Invalid token'
        })

    }

}


module.exports = { validateJWT }
