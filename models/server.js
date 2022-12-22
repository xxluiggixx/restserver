const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');

class Server {

    constructor() {
        this.app = express();
        this.PORT = process.env.PORT || 8080;

        this.paths = {
            userPath: '/api/user',
            authPath: '/api/auth',
            categoriesPath: '/api/categories',
            productPath: '/api/products'
        }

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

        this.app.use(this.paths.userPath, require('../routes/user.routes'));
        this.app.use(this.paths.authPath, require('../routes/auth.routes'));
        this.app.use(this.paths.categoriesPath, require('../routes/categories.routes'));
        this.app.use(this.paths.productPath, require('../routes/product.routes'));
    }

    listen(){
        this.app.listen(this.PORT, () =>{
            console.log('Server listening on http://localhost:',this.PORT);
        })
    }
}

module.exports = Server;
