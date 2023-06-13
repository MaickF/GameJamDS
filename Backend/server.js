const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const authRoutes = require('./auth/routes');
const app = express();
const DB = require('./config/db');
// init DB
DB();

app.use(cors());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

const router = express.Router();

const bodyParserJSON = bodyParser.json();
const bodyParserURLEncoded = bodyParser.urlencoded({ extended: true });

app.use(bodyParserJSON);
app.use(bodyParserURLEncoded);

app.use('/api', router);

authRoutes(router);

app.use('/', express.static('C:/Users/opc/Documents/GitHub/GameJamDS/Frontend/dist/gamejam-project'));

app.use(router);
// Inicia el servidor
app.listen(5000, () => {
    console.log('Servidor iniciado en el puerto 5000');
});