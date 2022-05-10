
// Referencias html
const lblEscritorio = document.querySelector('h1');
const btnAtender    = document.querySelector('button');
const lblTicket     = document.querySelector('small');
const divAlert      = document.querySelector('.alert');
const lblPendientes = document.querySelector('#lblPendientes');

const searchParams = new URLSearchParams( window.location.search );
if ( !searchParams.has('escritorio') ){
    window.location = 'index.html';
    throw new Error('El escritorio es obligatorio');
}

const escritorio = searchParams.get('escritorio');
lblEscritorio.innerText = escritorio;
divAlert.style.display = 'none';

const socket = io();



socket.on('connect', () => {
    btnAtender.disabled = false;

});

socket.on('ultimo-ticket', (ultimoTicket) => {
    
})

socket.on('disconnect', () => {
    btnAtender.disabled = true;
});

socket.on('clientes-pendientes', tickets => {
    if(tickets === 0){
        lblPendientes.style.display = 'none';    
    }else{
        lblPendientes.style.display= '';
        lblPendientes.innerText = tickets
    }
})




btnAtender.addEventListener( 'click', () => {

    socket.emit('atender-ticket', { escritorio }, ( { ok, ticket, msg } )=>{
        if (!ok){
            lblTicket.innerText = 'Nadie.';
            divAlert.style.display = '';
            divAlert.innerText = msg;
        }else{
            lblTicket.innerText = 'Ticket '+ ticket.numero;
            divAlert.style.display = 'none';

        }
    } )

});