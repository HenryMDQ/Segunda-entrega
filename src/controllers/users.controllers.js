const usersCtrl = {};
const { render } = require('node-sass');
const passport = require('passport'); // requiero libreria passport

const User = require('../models/User'); // traigo el modelo de base de datos para usuarios
const helpers = require('../helpers/auth');


// Imprime lista de usuarios con botones para eliminar y editar
usersCtrl.renderLista = async(req,res) =>{
    const Usuarios = await User.find().sort();// consulto todos los usuarios
    const UsuarioLogeado = await User.findById(req.user.id);// consulto mi usuario autenticado 
    const menu = menuUser(UsuarioLogeado);// traigo el perfil de mi usuario
    res.render('Usuarios_usuarios', {menu, Usuarios} )
}

//Formulario para nuevo usuario
usersCtrl.renderNuevoUsuario = (req,res) =>{
    res.render('users/nuevoUsuario')
} 

//Post para agregar nuevo usuario
usersCtrl.postNuevoUsuario = async(req,res) =>{
    const errors = []; //guardo los errores
    const {empresa, nickname ,email , password, confirm_password, perfil}= req.body;
    console.log(`${empresa} - ${nickname} - ${email} - ${password} - ${confirm_password} - ${perfil}`);

    if(password != confirm_password){ 
        errors.push({ text: 'Contraseña y su confirmación son distintas'})  // verifico que la contraseña y su confirmación sean iguales
    }
    if(password.length < 4){
        errors.push({ text: ' la contraseña debe tener mas de 4 caracteres'})
    }  
    if(errors.length > 0){  // si existen errores, los informo y permito que modifiquen
        res.render('users/nuevoUsuario', {errors,empresa,nickname, email, perfil});
    }else{
        const empresaMail = await User.findOne({empresa: empresa, email: email}); // busco si exite ese mail en esa empresa
        if(empresaMail){
            req.flash('error_msg', 'Ya existe ese mail en esa empresa');
            res.redirect('/lista');
        }else{
            const newUser = new User({empresa, nickname ,email , password, perfil});  // nuevo usuario
            newUser.password = await newUser.encryptPassword(password) // encripto contraseña
            await newUser.save(); // abrega a base de datos
            req.flash('success_msg', 'Nuevo regitro agregado');
            res.redirect('/lista');
        }
    }
}

// Posteo para eliminar un usuario por ID
usersCtrl.postEmiminarUsuario = async (req,res) => {
    await User.findByIdAndDelete(req.params.id);  // busco id y elimino 
    console.log('ID eliminado = '+ req.params.id);
    req.flash('success_msg', 'ID eliminado = '+ req.params.id);
    res.redirect('/lista');
}

//Formulario para editar Usuario
usersCtrl.postEditarUsuario = async (req,res) => {
    const {empresa, nickname ,email,perfil,_id} = await User.findById(req.params.id);//busco los datos por id y desestructuro
    res.render('users/editarUsuario', { empresa, nickname ,email,perfil, _id})//paso datos al formulario

}

//Put para editar un usuario 
usersCtrl.EditarUsuario = async(req,res) =>{
    const errors = []; //guardo los errores
    var { empresa, nickname ,email , password, confirm_password, perfil, _id}= req.body; //desestructuro
    const editUser = new User({empresa, nickname ,email , password, perfil});  // nuevo usuario

    if(password != confirm_password){ 
        errors.push({ text: 'Contraseña y su confirmación son distintas'})  // verifico que la contraseña y su confirmación sean iguales
    }
    if(password.length < 4){
        errors.push({ text: ' la contraseña debe tener mas de 4 caracteres'})
    }  
    if(errors.length > 0){  // si existen errores, los informo y permito que modifiquen
        res.render('users/editarUsuario', {errors,empresa,nickname, email, perfil,_id});
    }else{
        password = await editUser.encryptPassword(password) // encripto contraseña
        await User.findByIdAndUpdate(req.params.id,{empresa, nickname,email, password, perfil})
        req.flash('success_msg', 'Usuario actualizado');
        res.redirect('/lista');
    }
}

//login

usersCtrl.login = passport.authenticate('local', {
    failureRedirect: '/',
    successRedirect: '/inicio',
    failureFlash: true
})


//Deslogueo
usersCtrl.logout = (req,res) =>{
    req.logout(function(err){
        if (err)
        {
            return next(err);
        }})
    console.log('Deslogueado');
    res.redirect('/');
}

//menu Inicio
usersCtrl.Inicio = async(req,res) => {
  const UsuarioLogeado = await User.findById(req.user.id);// consulto mi usuario autenticado 
    const menu = menuUser(UsuarioLogeado);// traigo el perfil de mi usuario
    const Usuarios = await User.find().sort();

    res.render('inicio', {menu, Usuarios} )
}

//menu Dashboard
usersCtrl.dashboard = async(req,res) => {
    const UsuarioLogeado = await User.findById(req.user.id);// consulto mi usuario autenticado 
    const menu = menuUser(UsuarioLogeado);// traigo el perfil de mi usuario

    res.render('Dashboard', {menu} )
}

//Funciones 

//Funcion para definir el perfil del usuario (afuturo se dejara en la Basede datos)
function menuUser (UsuarioLogeado) {

    var menu = {};
    if (UsuarioLogeado.perfil == "Administrador") {
        menu = {
            nickname: UsuarioLogeado.nickname,
            Inicio :true,
            Dashboard: true,
            Productos: false,
            Dispositivos: false,
            Usuarios: true
        }
    }else{
        menu = {
            nickname: UsuarioLogeado.nickname,
            Inicio :true,
            Dashboard: true,
            Productos: false,
            Dispositivos: false,
            Usuarios: false
        }
    }
    return menu;
}

module.exports = usersCtrl // exporto