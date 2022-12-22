

const isAdminRole = (req, res, next) => {


  if(!req.user) {
    return res.status(500).json({
      msg: 'ERROR: First verify JWT'
    })
}
    const { role, name }= req.user;

    if(role !== "ADMIN_ROLE") {
        return res.status(401).json({
            msg:  `${ name } isn´t administrator`
        })
    }
    next()
}


const haveRole = ( ...roles ) => {
    return (req, res, next) =>{

        if(!req.user) {
            return res.status(500).json({
              msg: 'ERROR: First verify JWT'
            })
        }

        const { role }= req.user;
        console.log(role)

        if( !roles.includes( role )) {
            return res.status(401).json({
                msg:  `Permission denided - User must be one of this roles: ${roles}`
            })
        }
        next();
    }
}

module.exports = {
    isAdminRole,
    haveRole
}
