const mongoose = require('mongoose'); //re requiere libreria mongoose

//const URL = process.env.MONGOLOCAL // obtengo la dirección de la base de batos de manea Local
const URL = process.env.MONGOATLAS // obtengo la dirección de la base de batos por medio de MongoAtlas

console.log(`- La base de datos apunta a: ${URL}`);

mongoose.set('strictQuery', true); // seteo mongoose

mongoose.connect(URL,{          // conecto base de datos 
    useNewUrlParser: true, 
    useUnifiedTopology: true,
})

.then(db => console.log('- Base de datos conecto con éxito' )) // si la base conecta ok
.catch(err => console.log(err)); // si falla
