const { Router } = require('express');
const router = Router();


const{ 
    renderIndex,
    emailSend
    } = require('../controllers/index.controllers') // requiero los controladores de index

router.get('/', renderIndex) // pagina web
router.post('/', emailSend)


module.exports = router;  // exporto router