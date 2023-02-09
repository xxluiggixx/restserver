const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');


const { dbConnection } = require('../database/config');
const {  socketController } = require('../sockets/controller.socket');

class Server {

    constructor() {
        this.app = express();
        this.PORT = process.env.PORT || 8080;
        this.server = require('http').createServer( this.app );
        this.io = require('socket.io')(this.server);

        this.paths = {
          auth:       '/api/auth',
          categories: '/api/categories',
          product:    '/api/products',
          user:       '/api/user',
          search:     '/api/search',
          uploads:    '/api/uploads'
        }

        //Connect DB
        this.connectDB();

        //Middlewares
        this.middlewares();

        //Rutas de mi aplicación
        this.routes();

        //Sockets
        this.sockets();
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

        //Fileupload
        this.app.use(fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp/',
            createParentPath: true
        }));
    }

    routes(){

        this.app.use(this.paths.user, require('../routes/user.routes'));
        this.app.use(this.paths.auth, require('../routes/auth.routes'));
        this.app.use(this.paths.categories, require('../routes/categories.routes'));
        this.app.use(this.paths.product, require('../routes/product.routes'));
        this.app.use(this.paths.search, require('../routes/search.routes'));
        this.app.use(this.paths.uploads, require('../routes/uploads.routes'));
    }

    sockets(){
        this.io.on('connection', ( socket ) => socketController(socket, this.io) )
    }

    listen(){
        this.server.listen(this.PORT, () =>{
            console.log('Server listening on http://localhost:',this.PORT);
        })
    }
}

module.exports = Server;
