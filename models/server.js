const express = require('express');

class Server {

    constructor() {
        this.app = express();
        this.PORT = process.env.PORT || 8080;

        //Middlewares
        this.middlewares();

        //Rutas de mi aplicación
        this.routes();
    }

    middlewares() {
        //directorio publico
        this.app.use( express.static('public') );
    }

    routes(){

        this.app.get('/api', (req, res)=>{
            res.json({
                ok: true,
                message: 'get API'
            })  ;
           })

        this.app.post('/api', (req, res)=>{
            res.json({
                ok: true,
                message: 'post API'
            })  ;
           })

        this.app.put('/api', (req, res)=>{
            res.json({
                ok: true,
                message: 'put API'
            })  ;
           })

        this.app.delete('/api', (req, res)=>{
            res.json({
                ok: true,
                message: 'delete API'
            })  ;
           })
    }

    listen(){
        this.app.listen(this.PORT, () =>{
            console.log('Server listening on http://localhost:',this.PORT);
        })
    }
}

module.exports = Server;