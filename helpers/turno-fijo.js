
const TurnoFijo = require('../models/turno_fijo_model');


const agregarTurnoFijo = async ( dia, hora, cliente, cancha ) => {
    
        const turnosExiste = await TurnoFijo.findOne( { $and: [ { cancha }, 
            { hora }, { dia:  dia }] });
 
        if( turnosExiste && turnosExiste.cliente !== cliente) {
            return -1;
        }

        if( turnosExiste ) {
            return 0;
        }
        
        const turno = new TurnoFijo();
        turno.cliente = cliente;
        turno.dia = dia;
        turno.cancha = cancha;
        turno.hora = hora;

        const turnoDB = await turno.save();

};