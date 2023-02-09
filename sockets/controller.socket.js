const { Socket } = require("socket.io");
const { comprobarJWT } = require("../helpers");
const { ChatMessage } = require('../models');

const chatMessage = new ChatMessage();

const socketController = async( socket= new Socket(), io  ) => {
    
    const user = await comprobarJWT(socket.handshake.headers['x-token']);
    if( !user ){
        return socket.disconnect();
    }

    //add user connected
    chatMessage.connectUser( user );
    io.emit('usuarios-activos',chatMessage.userArr);
    socket.emit('recibir-mensajes',chatMessage.last10);

    //connect to special sala
    socket.join( user.id );//global, socket.id, user.id

    //user disconnect
    socket.on('disconnect', ( )=> {
        chatMessage.disconnectUser(user.id);
        io.emit('usuarios-activos',chatMessage.userArr);
    });

    socket.on('enviar-mensaje', ({uid,message}) =>{
        
        if( uid ){
            //Private msg
            socket.to(uid).emit('mensaje-privado',{
                from: user.name,
                message
            })

        }else{

            chatMessage.sendMessage(user.id, user.name, message);
            io.emit('recibir-mensajes',chatMessage.last10);
        }
    })
}

module.exports = {
    socketController
}