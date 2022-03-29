const express = require('express');
const cors = require('cors');
const DataBase = require('../database/config.js');


class Server {
    
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.usuariosPath = '/api/usuarios';
        this.database();
        this.milddelwares();
        this.routes();
    }

    async database() {
        
        //instancio la conexion con la db
        const db = new DataBase();
        await db.conectar();
    }
    
    
    milddelwares() {
        //Para publicar archivos
        this.app.use(express.static('public'));
        
        //Para controlar el origen de las llamadas
        this.app.use(cors());

        //Para leer y parsear el body del request
        this.app.use(express.json());
    }

    routes() {
        this.app.use( this.usuariosPath, require('../routes/usuarios'));
    }

    listen() {
        this.app.listen(this.port);
    }
}

module.exports = Server;






  
  