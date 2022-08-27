const TicketControl = require('../models/tocket-control');

const ticketControl = new TicketControl();


const socketController = (socket) => {

    socket.emit('ultimo-ticket', ticketControl.ultimo )
    socket.emit('clientes-pendientes', ticketControl.tickets.length);
    socket.broadcast.emit('estado-actual', ticketControl.ultimos4);
    socket.on('siguiente-ticket', ( payload, callback ) => {
     
        const siguiente = ticketControl.siguiente();
        socket.broadcast.emit('clientes-pendientes', ticketControl.tickets.length);
        callback( siguiente );
        
        // TODO: Notificar que hay un nuevo cliente 
    })

    



    socket.on('atender-ticket', ( { escritorio }, callback ) => {
        if(!escritorio){
            return callback({
                ok : false,
                msg: 'El escritorio es obligatorio'
            });
        }
        const ticket = ticketControl.atenderTicket( escritorio );
        if (!ticket){
            callback({
                ok: false,
                msg: 'Ya no hay tickets pendientes'
            });
        }else{
            socket.broadcast.emit('estado-actual', ticketControl.ultimos4);
            socket.broadcast.emit('clientes-pendientes', ticketControl.tickets.length);
            socket.emit('clientes-pendientes', ticketControl.tickets.length);
            callback({
                ok: true,
                ticket
            });
        }
    })

}
module.exports = {
    socketController
}