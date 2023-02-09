

class Message {
    constructor( uid, name, message){
        this.uid    = uid;
        this.name   = name;
        this.message = message;
    }
}

class ChatMessage {
    constructor(){
        this.message = [];
        this.user = {};
    }

    get last10() {
        this.message = this.message.splice(0,10);
        return this.message;
    }

    get userArr(){
        return Object.values( this.user );// [ {}, {}, {}]
    }

    sendMessage( uid, name, message) {
        this.message.unshift(
            new Message( uid, name, message)
        );
    }

    connectUser( user ) {
        this.user[user.id] = user
    }

    disconnectUser( id ){
        delete this.user[id];
    }
}

module.exports = ChatMessage;