const Users = require('./controller');
module.exports = (router) => {
  router.post('/register', Users.createUser);
  router.get('/prueba', Users.prueba);
  router.post('/login', Users.loginUser);
}