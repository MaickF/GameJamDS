const mongoose = require('mongoose');

//Conexión con la base de datos
const url = 'mongodb://127.0.0.1:27017/GameJam'

module.exports = () => {
  mongoose.connect(url, { useNewUrlParser: true })
  .then(() => console.log(`Mongo connected on ${url}`))
  .catch(err => console.log(`Connection has error ${err}`))
}