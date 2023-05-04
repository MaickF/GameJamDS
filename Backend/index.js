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
.then(()=> console.log('Se ha conectado correctamente a la base de datos.'))
.catch((e)=> console.log('Se ha producido el siguiente error: '+e))

/*
En caso de existir, se accede al esquema y módelo (documento y atributos) establecidos, dentro de la 
base de datos conectada, de no ser asi, se crea unos capaz cumplir con lo solicitado.
*/
const userSchema = mongoose.Schema({
    correo: String,
    contrasenha: String
}, {versionKey: false})

const eventSchema = mongoose.Schema({
  nombre: String,
  tema: String,
  fecha: String
}, {versionKey: false})

const gameSchema = mongoose.Schema({
  titulo: String,
  categoria: String,
  engine: String
}, {versionKey: false})

const categorySchema = mongoose.Schema({
  nombre: String,
  descripcion: String
}, {versionKey: false})

const placeSchema = mongoose.Schema({
  ubicacion: String,
  pais: String,
  ciudad: String
}, {versionKey: false})

const feedbackSchema = mongoose.Schema({
  titulo: String,
  evento: String
}, {versionKey: false})

const rolSchema = mongoose.Schema({
  nombre: String,
  evento: String
}, {versionKey: false})

const rateSchema = mongoose.Schema({
  cal: String,
  calDesempate: String
}, {versionKey: false})

const User = mongoose.model('Usuario', userSchema)
const Event = mongoose.model('Event', eventSchema)
const Game = mongoose.model('Game', gameSchema)
const Category = mongoose.model('Category', categorySchema)
const Place = mongoose.model('Place', placeSchema)
const Feedback = mongoose.model('Feedback', feedbackSchema)
const Rol = mongoose.model('Rol', rolSchema)
const Rate = mongoose.model('Rate', rateSchema)

//Configuración de Express
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(express.json());
app.set('key', keys.key);

//Página de inicio de sesión
let stepBack= path.join(__dirname,'../'); //Debido a que las interfaces estan en otro directorio, hay que retroceder
app.get('/', (req, res) => {
  res.sendFile(stepBack + '/frontend/index.html');
});

//Página de registro
app.get('/register', (req, res) => {
    res.sendFile(stepBack + '/frontend/register.html');
});

app.get('/info', async (req, res) => {
  try {
    const totalUsuarios = await User.countDocuments();
    Event.findOne({ fecha: "2023" }).exec()
    .then((evento) => {
      
          const nombre = evento.nombre;
          const tema = evento.tema;
          const fecha = evento.fecha;
          const divCantidadUsuarios = `<div id="cantidadUsuarios"><h1>numero de usuarios:${totalUsuarios}<h1>
          <h2>evento: ${nombre}<h2>
          <h2>tema: ${tema}<h2>
          <h2>Anho: ${fecha}<h2></div>`;
          res.send(divCantidadUsuarios);
          console.log(divCantidadUsuarios);
        
    })
    .catch((err) => {
        console.log(err);
        res.redirect('/');
    });
  } catch (error) {
    console.log('Error al buscar usuarios:', error);
    res.send('Error al buscar usuarios');
  }
});

app.post('/register', (req, res) => {
  const correo = req.body.correo;
  const contrasenha = req.body.contrasenha;
  User.findOne({ correo: correo })
    .exec()
    .then((usuario) => {
        if(usuario){
          console.log('El usuario ya existe');
          res.redirect('/register');
        }else{
          const user = new User({ correo, contrasenha });
          user.save()
              .then(() => {
              const payload = {
                check:true
              };
              const token = jwt.sign(payload, app.get('key'), {
                expiresIn: '7d'
              });
              res.sendFile(stepBack + '/frontend/home.html');
              })
        }
    })
    .catch((err) => {
        console.log(err);
        res.redirect('/');
    });
});

// Manejador del formulario de inicio de sesión
app.post('/login', (req, res) => {
  const correo = req.body.correo;
  const contrasenha = req.body.contrasenha;
  console.log(correo);
  console.log(contrasenha);
  User.findOne({ correo: correo })
    .exec()
    .then((usuario) => {
        if(usuario){
            if(usuario.contrasenha === contrasenha){
              const actual = new Usuario(correo, contrasenha);
              const payload = {
                check:true
              };
              const token = jwt.sign(payload, app.get('key'), {
                expiresIn: '7d'
              });
              console.log(token)
              res.sendFile(stepBack + '/frontend/evento.html');
            }else{
              res.redirect('/');
            }
        }else{
          res.redirect('/');
        }
    })
    .catch((err) => {
        console.log(err);
        res.redirect('/');
    });
});


//Middleware para proteger de las peticiones no deseadas.
const verificacion = express.Router();

verificacion.use((req, res, next)=>{
    let token = req.headers['x-access-token'] || req.headers['authorization'];
    //console.log(token);
    if(!token){
        res.status(401).send({
            error: 'Es necesario introducir un token de autenticación.'
        });
        return
    };
    if(token.startsWith('Bearer ')){
        token = token.slice(7, token.length);
        console.log(token);
    };
    if(token){
        jwt.verify(token, app.get('key'), (error, decoded)=>{
            if(error){
                return res.json({
                    message: 'El token no es válido.'
                });
            }else{
                req.decoded = decoded;
                next();
            }
        })
    };
});

// Inicia el servidor
app.listen(5000, () => {
  console.log('Servidor iniciado en el puerto 5000');
});