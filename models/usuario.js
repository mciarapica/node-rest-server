const {Schema, model} = require('mongoose');

const SchemaUsuario = Schema(
    {
       nombre: {
            type: String,
            required: [true, 'El nombre es obligatorio'] 
        },
        
        correo: {
            type: String,
            required: [true, 'El correo es obligatorio'] ,
            unique: true
        },

        contraseña: {
            type: String,
            required: [true, 'La contraseña es obligatorio']
        },

        img: {
            type: String
        },

        rol: {
            type: String,
            required: true,
            default: 'USER_ROLE'
        }, 

        eliminado: {
            type: Boolean,
            default: false
        },

        google: {
            type: Boolean,
            default: false
        }
    }
);


SchemaUsuario.methods.toJSON = function() {
    const { __v, contraseña, _id, ...usuario  } = this.toObject();
    usuario.uid = _id;
    return usuario;
}

module.exports = model('Usuario', SchemaUsuario);