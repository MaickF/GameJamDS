const express = require('express');
const router = express.Router();
const Users = require('./controller');

module.exports = (router) => {
  router.post('/register', Users.createUser);
  router.get('/prueba', Users.prueba);
  router.post('/login', Users.loginUser);
  router.get('/users', Users.getUserList);
  router.get('/events', Users.getEventList);
}