const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const authRoutes = require('./auth/routes');
const app = express();
const DB = require('./config/db');
// init DB
DB();

const router = express.Router();

const bodyParserJSON = bodyParser.json();
const bodyParserURLEncoded = bodyParser.urlencoded({ extended: true });

app.use(bodyParserJSON);
app.use(bodyParserURLEncoded);

app.use(cors());

app.use('/api', router);

authRoutes(router);
router.get('/', (req, res) => {
  res.send('Hello from home');
});

//Middleware para proteger de las peticiones no deseadas.

app.use(router);
// Inicia el servidor
app.listen(5000, () => {
    console.log('Servidor iniciado en el puerto 5000');
});