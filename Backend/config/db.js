const mongoose = require('mongoose');

//Conexión con la base de datos
const url = 'mongodb://127.0.0.1:27017/GameJamBD'

module.exports = () => {
mongoose.set('strictQuery', true);
mongoose.connect(url, {
})
.then(()=> console.log('Se ha conectado correctamente a la base de datos.'))
.catch((e)=> console.log('Se ha producido el siguiente error: '+e))
}