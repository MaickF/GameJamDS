const express = require("express");
 
// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const recordRoutes = express.Router();
 
// This will help us connect to the database
const dbo = require("./database");
 
// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;
 

recordRoutes.get('/usuarios', (req, res) =>{
    dbo.connection.useDb('GameJamDB').collection("Usuario").find({})
    .toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
    });  
});


module.exports = recordRoutes;