const mongoose = require('mongoose');

class DataBase {
    
    constructor() {
        this.conectar
    } 

    async conectar () {
         
        try {
            await mongoose.connect(process.env.MONGODB_CNN);
            console.log('Conectado a la DB');
        } 
        catch (error) {
            console.log(error);
            //throw('No se pudo conectar con la DB');
        }
    }
}

module.exports = DataBase

