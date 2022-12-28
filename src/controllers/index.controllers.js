const { body } = require("express-validator");
const nodemailer = require('nodemailer');

const indexCtrl = {};

indexCtrl.renderIndex = (req,res) =>{ 
    res.render('paginaweb')
}

indexCtrl.emailSend = (req, res) => {

    const { nombre, email, mensaje } = req.body;

    if(nombre == '' && email == ''){
        res.render('emailSend',{ titulo:'Carga bien los datos que lo tiro'})    
    }else{
    console.log(`Tus datos han sido recibidos, ${nombre} - ${email} - ${mensaje}`);

    async function envioMail(){

        let transporter = nodemailer.createTransport({
            host:`smtp.gmail.com`,
            port: 465,
            secure: true,
            auth:{
                user:"******",
                pass: "******",
            }
        });
        
        console.log('el let transponder esta ok');

        // mesnaje a cliente 

        let message = await transporter.sendMail({
            from: "*******************",
            to: `${email}`, 
            subject: "Gracias por contactar a Deitres",
            html: `${email} Muchas gracias por su mensaje. En breve una persona de Deitres lo contactarÃ¡.`
          });

          //Mensaje a ventas 
          
          let messageVentas = await transporter.sendMail({
            from: "*******",
            to: `**********`, 
            subject:  `Mail de ${nombre}`,
            html: `El cliente con mail ${email} y nombre ${nombre} consulta: <br> ${mensaje}`
          });
         
          res.render('emailSend',{ titulo:`${nombre} Recibimos su consulta y enviamos un mail al correo ${email}`});
     }
     envioMail().catch(console.error);
    }
    
}

module.exports = indexCtrl; // exporto controlador 