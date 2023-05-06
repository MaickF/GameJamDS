//Dependencias
const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const path = require('path');
const Usuario = require('./Usuario');
const jwt = require('jsonwebtoken');
const keys = require('./key');	
//Conexión con la base de datos
const url = 'mongodb://127.0.0.1:27017/GameJamBD'
mongoose.set('strictQuery', true);
mongoose.connect(url, {
})
// Especifica el nombre de la base de datos y la colección que deseas visualizar
const dbName = GAMEJAM;
const collectionName = JuegoModelo;
.then(()=> console.log('Se ha conectado correctamente a la base de datos.'))
.catch((e)=> console.log('Se ha producido el siguiente error: '+e))
/*
// Conectarse a la base de datos de MongoDB
MongoClient.connect(url, { useUnifiedTopology: true }, (err, client) => {
  if (err) {
    console.error('Error al conectarse a la base de datos:', err);
    return;
  }

  console.log('Conectado exitosamente a la base de datos');

  const db = client.db(dbName);
  const collection = db.collection(collectionName);

  // Consulta los documentos en la colección y los muestra
  collection.find({}).toArray((err, documents) => {
    if (err) {
      console.error('Error al consultar la base de datos:', err);
      return;
    }

    console.log('Documentos encontrados:');
    console.log(documents);

    // Cierra la conexión a la base de datos
    client.close();
  });
});

