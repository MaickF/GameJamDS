const mongoose = require('mongoose')

//Base de datos hosteada
//const URI = "mongodb+srv://Motica:Motica@cluster.otyckp9.mongodb.net/?retryWrites=true&w=majority";
//const URI = "mongodb+srv://fabian:prueba@atlascluster.xsgfr7i.mongodb.net/test"

//Pueden usar una local para probar conexiones
const URI = "'mongodb://127.0.0.1:27017/GameJamDB'"

mongoose.connect(URI, {useNewUrlParser: true, useUnifiedTopology:true}).then(db => console.log('DB is connected')).catch(err=>console.log("Error", err))

console.log(`STATE: `, mongoose.connection.readyState);

module.exports = mongoose;
