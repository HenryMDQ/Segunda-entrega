require('dotenv').config(); // traigo configuracion  .env

const app = require('./server'); // agrego server.js con su configuración 
require('./database'); // agrego database.js y conecto

// Pubico página en el puerto correcto   
app.listen(app.get('PORT'), () => {
    console.log(`- El servidor corre en el puerto ${app.get('PORT')} `);
})