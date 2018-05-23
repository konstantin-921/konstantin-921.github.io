const express = require('express');
const app = module.exports = express();
const sequelize = require('../sequelize');

app.post('/follow', function(req, res) {
  followUser(req, res);
})

function followUser(req, res) {
  sequelize.query("CREATE TABLE IF NOT EXISTS followers (id bigserial, follower integer, following integer, PRIMARY KEY(follower, following), FOREIGN KEY(follower) REFERENCES users(id), FOREIGN KEY(following) REFERENCES posts(id));")
  .then((followers) => {
      sequelize.query(`INSERT INTO followers (follower, following) VALUES ('${req.body.userId}', '${req.body.id}')`)
      .then((followers) => {
        res.json("Success!");
      })
  })
  .catch((error) => {
    console.log('Error');
  })
}