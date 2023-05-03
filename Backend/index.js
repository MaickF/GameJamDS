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

const User = mongoose.model('Usuario', userSchema)

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
              res.sendFile(stepBack + '/frontend/home.html');
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