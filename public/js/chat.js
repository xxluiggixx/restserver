
let user = null;
let socket = null;

//Referencia HTML
 
const btnSalir   = document.querySelector('#btnSalir');
const ulMensajes = document.querySelector('#ulMensajes');
const ulUsuarios = document.querySelector('#ulUsuarios');
const txtMensaje = document.querySelector('#txtMensaje');
const txtUid     = document.querySelector('#txtUid');

// Validar el token del localStorage
const validarJWT = async () => {
    const token = localStorage.getItem('token') || '';


    if( token.length <= 10 ){
        window.location = 'index.html';
        throw new Error('No hay token en el servidor');
    }
    const resp = await fetch('http://localhost:3000/api/auth/',{
        headers: { 'x-token': token},
    });
    
    const { user: userDB, token:tokenDB } = await resp.json();

    if( !userDB ){
        window.location = 'index.html';
        throw new Error('No hay token en el servidor');
    }

    localStorage.setItem('token', tokenDB);
    user = userDB;
    document.title = user.name;

    await conectarSocket();
}

const conectarSocket = async () => {

    socket = io({
        'extraHeaders': {
            'x-token': localStorage.getItem('token')
        }
    });

    socket.on('connect', ()=>{
        console.log('Sockets online')
    });
    socket.on('disconnect', ()=>{
        console.log('Sockets offline')
    });


    socket.on('recibir-mensajes', drawMessage);

    socket.on('usuarios-activos', drawUser );
    socket.on('mensaje-privado', (payload)=>{
        console.log('privado: ',payload)
    });
}

const drawUser = ( users = []) =>{
    let usersHtml='';
    users.forEach( ({name, uid}) =>{
        usersHtml += `
            <li>
                <p>
                    <h5 class="text-success">${name}</h5>
                    <span class="fs-6 text-muted">${ uid }</span>
                </p>
            </li>
        `;
    });
    ulUsuarios.innerHTML= usersHtml;
}
const drawMessage = ( messages = []) =>{
    let messagesHtml='';
    messages.forEach( ({name, message}) =>{
        messagesHtml += `
            <li>
                <p>
                    <span class="text-primary">${ name }</span>
                    <span >${ message }</span>
                </p>
            </li>
        `;
    });
    ulMensajes.innerHTML= messagesHtml;
}

txtMensaje.addEventListener('keyup', (ev)=>{

    const message = txtMensaje.value;
    const uid = txtUid.value;

    if( ev.keyCode !== 13){
        return;
    }
    if( message.length === 0){ return;}

    
    socket.emit('enviar-mensaje', {message,uid});
    txtMensaje.value = '';
})

const main = async () => {

    await validarJWT();
}

main();

//