const express = require('express');
const cors = require('cors')

class Server {

    constructor() {
        this.app = express();
        this.PORT = process.env.PORT || 8080;
        this.userPath = '/api/user';

        //Middlewares
        this.middlewares();

        //Rutas de mi aplicación
        this.routes();
    }

    middlewares() {
        
        //CORS
        this.app.use( cors() );

        //Lectura y parseo del body
        this.app.use( express.json() );

        //directorio publico
        this.app.use( express.static('public') );
    }

    routes(){

        this.app.use(this.userPath, require('../routes/user.routes'));
    }

    listen(){
        this.app.listen(this.PORT, () =>{
            console.log('Server listening on http://localhost:',this.PORT);
        })
    }
}

module.exports = Server;