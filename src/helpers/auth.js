//midelware encargada de verificar si el usuario se encuentra logueado
const helpers = {};
const User = require('../models/User'); // traigo el modelo de base de datos para usuarios

helpers.isAuthenticated = (req, res, next) => {
    if(req.isAuthenticated()){
        
        return next();
    }
    res.redirect('/'); // redirecciono a la web si no estoy logeueado.
}

helpers.isAdmin = async(req,res,next) =>{
    const UsuarioLogeado = await User.findById(req.user.id);
    console.log(UsuarioLogeado.perfil);
    if (UsuarioLogeado.perfil === "Administrador") {
        console.log('Es Administrador');
        return next();
    }
        console.log('No es Administrador');
        res.redirect('/');
}




module.exports = helpers // exporto 