const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Usuario = require('./Usuario');
const SECRET_KEY = 'secretkey123456';
const mongoose = require('mongoose');

const { User, Event, Game, Category, Place, Feedback, Rol, Rate } = require('./dao');

exports.prueba = (req, res) => {
  res.send('Hello from home');
}

exports.getUserList = (req, res) => {
  console.log("fdo");
  User.find({})
    .then(users => {
      res.json(users);
      console.log(users)
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    });
};

exports.getEventList = (req, res) => {
  Event.find({})
    .then(events => {
      res.json(events);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    });
};

exports.createUser = (req, res, next) => {
  console.log("registro");
  const correo = req.body.correo;
  const contrasenha = req.body.contrasenha;
  console.log(correo);
  console.log(contrasenha);
  User.findOne({ correo: correo })
    .exec()
    .then((usuario) => {
      console.log(usuario);
      if (usuario) {
        console.log('El usuario ya existe');
        res.redirect('/register');
      } else {
        console.log("ffffffffffffffff");
        const user = new User({ correo, contrasenha });
        user.save()
          .then(() => {
            const payload = {
              check: true
            };
            const token = jwt.sign(payload, SECRET_KEY, {
              expiresIn: '7d'
            });
            const expiresIn = 24 * 60 * 60;
            const dataUser = {
              name: correo,
              email:correo,
              accessToken: token,
              expiresIn: expiresIn
            }
            res.send({dataUser});
          })
      }
    })
    .catch((err) => {
      console.log(err);
      res.redirect('/');
      res.status(500).send('Oocurrió un error al procesar la solicitud');
    });
}

exports.loginUser = (req, res, next) => {
  const correo = req.body.correo;
  const contrasenha = req.body.contrasenha;
  console.log(correo);
  console.log(contrasenha);
  User.findOne({ correo: correo })
    .exec()
    .then((usuario) => {
      if (usuario) {
        console.log(usuario);
        if (usuario.contrasenha === contrasenha) {
          const actual = new Usuario(correo, contrasenha);
          const payload = {
            check: true
          };
          const token = jwt.sign(payload, SECRET_KEY, {
            expiresIn: '7d'
          });
          const expiresIn = 24 * 60 * 60;
          console.log(token)
          const dataUser = {
            name: correo,
            email: correo,
            accessToken: token,
            expiresIn: expiresIn
          }
          res.send({ dataUser });
        } else {
          res.status(500).send('Oocurrió un error al procesar la solicitud1');
        }
      } else {
        res.status(500).send('Ocurrió un error al procesar la solicitud2');
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send('Ocurrió un error al procesar la solicitud3');
    });
};

exports.filterByCategory = (req, res, next) => {
  const category = req.body.category;
  console.log("Buscando juegos con categoría: " + category);
  Game.find({ categoria: category })
    .exec()
    .then((Game) => {
      if (Game.length > 0) {
        console.log('Juegos encontrados!');
        //console.log(Game); // Imprimir el JSON encontrado en la consola del servidor
        res.json(Game); // Enviar el JSON encontrado como respuesta al cliente
      } else {
        console.log("Juegos NO encontrados...");
        res.json([]); // Enviar un array vacío como respuesta al cliente si no se encontraron juegos
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: 'Error en el servidor' }); // Enviar un error como respuesta al cliente si ocurre un error en el servidor
    });
};

exports.searchGame = (req, res, next) => {
  const nombre = req.body.nombre;
  console.log(nombre);
  Game.find({ nombre: { $regex: new RegExp(nombre, 'i') } })
    .exec()
    .then((juegos) => {
      if (juegos.length > 0) {
        console.log('Juegos encontrados!');
        res.send(juegos);
      } else {
        console.log("No se ha encontrado ningún juego");
        res.send("No se ha encontrado ningún juego");
      }
    })
    .catch((err) => {
      console.log(err);
      res.send("Error interno del servidor");
    });
};