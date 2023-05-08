const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Usuario = require('./Usuario');
const SECRET_KEY = 'secretkey123456';

const { User, Event, Game, Category, Place, Feedback, Rol, Rate } = require('./dao');

exports.prueba = (req, res) => {
  res.send('Hello from home');
}

exports.createUser = (req, res, next) => {
    console.log("registro");
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
                const token = jwt.sign(payload, SECRET_KEY, {
                  expiresIn: '7d'
                });
                res.status(200).send('Solicitud procesada correctamente');
                })
          }
      })
      .catch((err) => {
          console.log(err);
          res.redirect('/');
          res.status(500).send('Oocurrió un error al procesar la solicitud');
      });
      res.status(500).send('Ocurrió un error al procesar la solicitud');
  }

  exports.loginUser = (req, res, next) => {
    console.log("login");
    const correo = req.body.correo;
    const contrasenha = req.body.contrasenha;
    console.log(correo);
    console.log(contrasenha);
    User.findOne({ correo: correo })
      .exec()
      .then((usuario) => {
          if(usuario){
            console.log(usuario);
              if(usuario.contrasenha === contrasenha){
                const actual = new Usuario(correo, contrasenha);
                const payload = {
                  check:true
                };
                const token = jwt.sign(payload, SECRET_KEY, {
                  expiresIn: '7d'
                });
                const expiresIn = 24 * 60 * 60;
                console.log(token)
                const dataUser = {
                  name: usuario.correo,
                  email: usuario.correo,
                  accessToken: token,
                  expiresIn: expiresIn
                }
                res.send({ dataUser });
              }else{
                res.status(500).send('Oocurrió un error al procesar la solicitud');
              }
          }else{
            res.status(500).send('Ocurrió un error al procesar la solicitud');
          }
      })
      .catch((err) => {
        
        console.log("patito");
          console.log(err);
          res.status(500).send('Ocurrió un error al procesar la solicitud');
      });
  }