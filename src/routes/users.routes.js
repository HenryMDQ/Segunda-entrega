const { Router } = require('express');
const router = Router();  // uso Ruteo 

const{
    renderLista,
    renderNuevoUsuario,
    postNuevoUsuario,
    postEmiminarUsuario,
    postEditarUsuario,
    EditarUsuario,
    login,
    logout,
    Inicio,
    dashboard

} = require('../controllers/users.controllers');  // importo del controlador lo que requiero 

const { isAuthenticated, isAdmin } = require('../helpers/auth') // requiero verificación de autenticación y si es administrador (para proteger los sectores más sensibles)

router.get('/lista', isAuthenticated , isAdmin , renderLista) // Lista de usuarios
router.get('/nuevoUsuario', isAuthenticated ,isAdmin ,renderNuevoUsuario) // agregar nuevo usuario formulario
router.post('/nuevoUsuario', isAuthenticated ,isAdmin ,postNuevoUsuario) // agregar nuevo usuario posteo de datos
router.delete('/eliminarUsuario/:id', isAuthenticated ,isAdmin ,postEmiminarUsuario) // eliminar usuario
router.post('/formularioEditarUsuario/:id', isAuthenticated ,isAdmin ,postEditarUsuario) // renderizar formulario para editar usuario
router.put('/editarUsuario/:id', isAuthenticated ,isAdmin ,EditarUsuario)// editar usuario

router.post('/login', login) // posteo para logueo
router.get('/logout', logout) // desloguearse

router.get('/inicio',isAuthenticated, Inicio)
router.get('/dashboard',isAuthenticated, dashboard)

module.exports =  router; // exporto