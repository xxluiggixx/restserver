const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');

class Server {

    constructor() {
        this.app = express();
        this.PORT = process.env.PORT || 8080;
        this.userPath = '/api/user';
        this.authPath = '/api/auth';

        //Connect DB
        this.connectDB();

        //Middlewares
        this.middlewares();

        //Rutas de mi aplicación
        this.routes();
    }

    async connectDB() {
        await dbConnection();
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
        this.app.use(this.authPath, require('../routes/auth.routes'));
    }

    listen(){
        this.app.listen(this.PORT, () =>{
            console.log('Server listening on http://localhost:',this.PORT);
        })
    }
}

module.exports = Server;
