const id = require('faker/lib/locales/id_ID');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy

const User = require('../models/User');

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
}, async (email,password,done)=>
{
    //verifico email del usuario
    const user = await User.findOne({email})
    console.log(user);
    if(!user){
        console.log('empresa y/o usuario no encontrado');
        return done(null,false,{menssage: 'empresa y/o usuario no encontrado'})
    }else{
        // verifico password
        const match = await user.matchPassword(password);
        if(match){
            console.log('Exito');
            return done(null,user)
        } else{
            console.log('contraseña erronea');
            return done(null,false, {message: 'contraseña erronea'})
        }
    }

}))

passport.serializeUser((user,done) => {
    done(null,user.id)
});

passport.deserializeUser((id, done)=>{
    User.findById(id, (err, user) =>{
        done(err,user);
    })
})