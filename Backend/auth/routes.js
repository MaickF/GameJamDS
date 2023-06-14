const express = require('express');
const router = express.Router();
const Users = require('./controller');

module.exports = (router) => {
  router.post('/register', Users.createUser);
  router.get('/prueba', Users.prueba);
  router.post('/login', Users.loginUser);
  router.get('/users', Users.getUserList);
  router.get('/events', Users.getEventList);
  router.get('/criterios', Users.getCriterios);
  router.post('/filterByCategory', Users.filterByCategory);
  router.get('/getGames', Users.getAllGames);
  router.post ('/searchGame', Users.searchGame);
  router.post ('/searchExactGame', Users.searchExactGame);
  router.post ('/userValidate', Users.validateUser);
  router.post ('/reportGame', Users.reportGame);
  router.post ('/getUserByID', Users.getUserByID);
  router.post ('/getUserByEmail', Users.getUserByEmail);
  router.post ('/updateUserRole', Users.updateUserRole);
  router.post ('/registroEvaluacion', Users.registroEvaluacion);
  router.post ('/reportProblem', Users.reportProblem);
}