// Import essential libraries 
const express = require('express'); 
const app = express(); 
const path = require('path'); 
const router = express.Router(); 
// Setup essential routes 
let stepBack= path.join(__dirname,'../');
router.get('/registro', function(req, res) { 
    res.sendFile(path.join(stepBack + '/Frontend/registro.html')); 
    //__dirname : It will resolve to your project folder. 
}); 
router.get('/login', function(req, res) { 
    res.sendFile(path.join(stepBack + '/Frontend/index.html')); 
}); 
router.get('/home', function(req, res) { 
    res.sendFile(path.join(stepBack + '/Frontend/home.html')); 
}); 
//add the router 
app.use('/', router); 
app.listen(process.env.port || 3000); 
console.log('Running at Port 3000'); 
