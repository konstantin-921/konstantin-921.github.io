const express = require('express');
const app = module.exports = express();
const sequelize = require('../sequelize');

app.post('/newpost', function(req, res) {
  savePost(req, res);
})

function savePost(req, res) {
  sequelize.query("CREATE TABLE IF NOT EXISTS posts (id bigserial PRIMARY KEY, content text, date text, title text, user_id integer);")
  .then(() => {
    sequelize.query(`INSERT INTO posts (content, date, title, user_id) VALUES ('${req.body.postArea}', '${req.body.postDate}', '${req.body.postTitle}', '${req.body.id}')`)
    .then((posts) => {
      res.json("Success!");
    })
  })
  .catch((error) => {
    console.log(error);
  })
}