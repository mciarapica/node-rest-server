const {Schema, model} = require('mongoose');

const SchemaRol = Schema(
    {
       nombre: {
            type: String,
            required: [true, 'El nombre es obligatorio'] 
        }
    }
);

module.exports = model('Role', SchemaRol);