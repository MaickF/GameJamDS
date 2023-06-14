const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Usuario = require('./Usuario');
const SECRET_KEY = 'secretkey123456';
const mongoose = require('mongoose');

const { User, Event, Game, Category, Place, Feedback, Rol, Rate, GameReport, Criterio, CriterioXJuego, ProblemReport } = require('./dao');

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

exports.getUserByID = (req, res) => {
  const userID = req.body.id;
  User.findById(userID)
    .then(user => {
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.json(user);
      console.log(user);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    });
};


exports.updateUserRole = (req, res) => {
  const correoElectronico = req.body.correoElectronico;
  const nuevoRol = req.body.nuevoRol;

  console.log("Actualizando rol");
  console.log(correoElectronico);
  console.log(nuevoRol);
  User.updateOne({ correoElectronico: correoElectronico }, { rol: nuevoRol })
    .then(result => {
      if (result.nModified === 0) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.json(result);
      console.log(result);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    });
};


exports.getUserByEmail = (req, res) => {
  const userEmail = req.body.email;
  console.log("Buscando email " + userEmail)
  User.findOne({ correoElectronico: userEmail })
    .exec()
    .then((usuario) => {
      if (usuario) {
        console.log('Usuario encontrado!');
        console.log(usuario); // Imprimir el JSON encontrado en la consola del servidor
        res.json(usuario); // Enviar el JSON encontrado como respuesta al cliente
      } else {
        console.log("usuario NO encontrado...");
        res.json([]); // Enviar un array vacío como respuesta al cliente si no se encontraron juegos
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send('Ocurrió un error al procesar la solicitud');
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

exports.getCriterios = (req, res) => {
  Criterio.find({})
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
  const correoElectronico = req.body.correoElectronico;
  const contrasenha = req.body.contrasenha;
  const nombre = req.body.nombre;
  const apellido1 = req.body.apellido1;
  const apellido2 = req.body.apellido2;
  const telefono = req.body.telefono;
  const universidad = req.body.universidad;
  const especialidad = req.body.especialidad;
  const condicionMedica = req.body.condicionMedica;
  const necesidadDietetica = req.body.necesidadDietetica;
  const codigoDePais = req.body.codigoDePais;
  const pais = req.body.pais;
  const ciudad = req.body.ciudad;
  console.log(correoElectronico);
  console.log(contrasenha);
  let dataUser = {};
  User.findOne({ correoElectronico: correoElectronico })
    .exec()
    .then((usuario) => {
      console.log(usuario);
      if (usuario) {
        console.log('El usuario ya existe');
        res.send({ dataUser });
      } else {
        console.log("ffffffffffffffff");
        const user = new User({
          nombre: nombre,
          contrasenha: contrasenha,
          apellido1: apellido1,
          apellido2: apellido2,
          correoElectronico: correoElectronico,
          telefono: telefono,
          universidad: universidad,
          especialidad: especialidad,
          condicionMedica: condicionMedica,
          necesidadDietetica: necesidadDietetica,
          codigoDePais: codigoDePais,
          pais: pais,
          ciudad: ciudad
        });
        user.save()
          .then(() => {
            const payload = {
              check: true
            };
            const token = jwt.sign(payload, SECRET_KEY, {
              expiresIn: '7d'
            });
            const expiresIn = 24 * 60 * 60;
            dataUser = {
              name: correoElectronico,
              correo: correoElectronico,
              accessToken: token,
              expiresIn: expiresIn
            }
            res.send({ dataUser });
          })
      }
    })
    .catch((err) => {
      console.log(err);
      res.redirect('/');
      res.status(500).send('Ocurrió un error al procesar la solicitud');
    });
}

exports.reportGame = (req, res, next) => {
  console.log("reporte de juego");
  const tipo = req.body.tipo;
  const descripcion = req.body.descripcion;
  const juego = req.body.juego;
  let dataReport = {};
  console.log("ffffffffffffffff");
  const report = new GameReport({ tipo: tipo, descripcion: descripcion, juego: juego });
  report.save()
    .then(() => {
      dataReport = {
        tipo: tipo,
        descripcion: descripcion,
        juego: juego
      }
      res.send({ dataReport });
    })
}

exports.reportProblem = (req, res, next) => {
  console.log("reporte de problema");
  const tipo = req.body.tipo;
  const descripcion = req.body.descripcion;
  const juego = req.body.juego;
  let dataReport = {};
  console.log("ffffffffffffffff");
  const report = new ProblemReport({ tipo: tipo, descripcion: descripcion, juego: juego });
  report.save()
    .then(() => {
      dataReport = {
        tipo: tipo,
        descripcion: descripcion,
        juego: juego
      }
      res.send({ dataReport });
    })
}

exports.registroEvaluacion = (req, res, next) => {
  console.log("registro de calificacion");
  const criterio = req.body.nombre;
  const nota = req.body.nota;
  const juego = req.body.juego;
  const juez = req.body.juez;
  let criterioxjuegoData = {};
  console.log("ffffffffffffffff");
  console.log(criterio);
  console.log(nota);
  const criterioxjuego = new CriterioXJuego({ criterio: criterio, nota: nota, juego: juego, juez:juez });
  criterioxjuego.save()
    .then(() => {
      criterioxjuegoData = {
        criterio: criterio,
        nota: nota,
        juego: juego,
        juez: juez
      }
      res.send({ criterioxjuegoData });
    })
}

exports.validateUser = (req, res, next) => {
  console.log("validacion");
  const correo = req.body.correoElectronico;
  let dataUser = {};
  User.findOne({ correo: correo })
    .exec()
    .then((usuario) => {
      console.log(usuario);
      if (usuario) {
        console.log('El usuario ya existe');
        res.send({ dataUser });
      } else {
        console.log("ffffffffffffffff");
        dataUser = {
          noExiste: "true"
        }
        res.send({ dataUser });
      }
    })
    .catch((err) => {
      console.log(err);
      res.redirect('/');
      res.status(500).send('Ocurrió un error al procesar la solicitud');
    });
}

exports.loginUser = (req, res, next) => {
  const correoElectronico = req.body.correo;
  const contrasenha = req.body.contrasenha;
  console.log(correoElectronico);
  console.log(contrasenha);
  User.findOne({ correoElectronico: correoElectronico })
    .exec()
    .then((usuario) => {
      if (usuario) {
        console.log(usuario);
        if (usuario.contrasenha === contrasenha) {
          const payload = {
            check: true
          };
          const token = jwt.sign(payload, SECRET_KEY, {
            expiresIn: '7d'
          });
          const expiresIn = 24 * 60 * 60;
          console.log(token)
          const dataUser = {
            nombre: usuario.nombre,
            correoElectronico: usuario.correoElectronico,
            rol: usuario.rol,
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

exports.getAllGames = (req, res, next) => {
  console.log("Obteniendo todos los juegos");
  Game.find()
    .exec()
    .then((Game) => {
      if (Game.length > 0) {
        console.log('Juegos encontrados!');
        //console.log(Game); // Imprimir el JSON encontrado en la consola del servidor
        res.json(Game); // Enviar el JSON encontrado como respuesta al cliente
        console.log(res);
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

exports.getJudges = (req, res, next) => {
  console.log("Obteniendo todos los jueces");
  User.find({rol:"juez"})
    .exec()
    .then((Judge) => {
      if (Judge.length > 0) {
        console.log('Jueces encontrados!');
        //console.log(Game); // Imprimir el JSON encontrado en la consola del servidor
        res.json(Judge); // Enviar el JSON encontrado como respuesta al cliente
        console.log(res);
      } else {
        console.log("Jueces NO encontrados...");
        res.json([]); // Enviar un array vacío como respuesta al cliente si no se encontraron juegos
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: 'Error en el servidor' }); // Enviar un error como respuesta al cliente si ocurre un error en el servidor
    });
};

exports.getCriterioByGames = (req, res, next) => {
  console.log("Obteniendo todos los criterios por juego");
  CriterioXJuego.find()
    .exec()
    .then((CriterioXJuego) => {
      if (CriterioXJuego.length > 0) {
        console.log('Criterios por juegos encontrados!');
        //console.log(Game); // Imprimir el JSON encontrado en la consola del servidor
        res.json(CriterioXJuego); // Enviar el JSON encontrado como respuesta al cliente
        console.log(res);
      } else {
        console.log("Criterios por juegos NO encontrados...");
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

exports.searchExactGame = (req, res, next) => {
  const nombre = req.body.nombre;
  Game.find({ nombre: nombre })
    .exec()
    .then((juego) => {
      if (juego.length > 0) {
        console.log('Juego encontrado!: ' + juego);
        res.send(juego);
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
