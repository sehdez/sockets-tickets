

const searchParams = new URLSearchParams( window.location.search );
if ( !searchParams.has('escritorio') ){
    window.location = 'index.html';
    throw new Error('El escritorio es obligatorio');
}

const escritorio = searchParams.get('escritorio');


const socket = io();



socket.on('connect', () => {
    // console.log('Conectado');
    // btnCrear.disabled = false;

});

socket.on('ultimo-ticket', (ultimoTicket) => {
    // lblNuevoTicket.innerText = "Ticket " + ultimoTicket;
})

socket.on('disconnect', () => {
    // console.log('Desconectado del servidor');
    // btnCrear.disabled = true;

});




// btnCrear.addEventListener( 'click', () => {

//     socket.emit( 'siguiente-ticket', null, ( ticket ) => {
//         // lblNuevoTicket.innerText = ticket;
//     });

// });