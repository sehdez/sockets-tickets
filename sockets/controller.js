const TicketControl = require('../models/tocket-control');

const ticketControl = new TicketControl();


const socketController = (socket) => {

    socket.emit('ultimo-ticket', ticketControl.ultimo )

    
    
    socket.on('siguiente-ticket', ( payload, callback ) => {
     
        const siguiente = ticketControl.siguiente();
        callback( siguiente );
        
        // TODO: Notificar que hay un nuevo cliente 
        
    })

}



module.exports = {
    socketController
}

