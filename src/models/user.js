const {Schema, model}= require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new Schema ({
    empresa:{type: String, requiered: true},  // empresa a la que pertenece 
    nickname:{type: String, requiered: true}, // nombre del usuario o sobrenombre 
    email:{type: String, required: true}, // email del usuario (puede estar en mas de una empresa)
    password:{type: String, required: true}, // contraseña encriptada
    perfil:{type: String, required: true} // perfil del usuario, da permisos a diferentes menú 
},{
    timestamps:true // se agreaga fecha y hora
});

UserSchema.methods.encryptPassword = async password => {  // metodo para encriptar datos
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password,salt);
};

UserSchema.methods.matchPassword = async function (password) { // metodo para verificar la contraseña
    return await bcrypt.compare(password, this.password)
}

module.exports = model('User',UserSchema); // exporto el modelo de base de datos de un usuario