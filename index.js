const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mysql = require("mysql");
const app = express();

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "spa-blog",
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/posts", (req, res) => {
  const sqlSelect = "SELECT * FROM posts";
  db.query(sqlSelect, (err, result) => {
    res.send(result);
  });
});
app.post("/posts", (req, res) => {
  const id = req.body.id;
  const title = req.body.title;
  const datetime = req.body.datetime;
  const body = req.body.body;
  const sqlInsert =
    "INSERT INTO posts (id, title, datetime, body) VALUES (?, ?, ?, ?)";
  db.query(sqlInsert, [id, title, datetime, body], (err, result) => {
    console.log(result);
  });
});

app.delete("/posts/:id", (req, res) => {
  const id = req.params.id;
  const sqlDelete = "DELETE FROM posts WHERE id = ?";
  db.query(sqlDelete, id, (err, result) => {
    if (err) console.log(err);
  });
});

app.put("/posts/:id", (req, res) => {
  const id = req.params.id;
  const title = req.body.title;
  const body = req.body.body;
  const sqlUpdate = "UPDATE posts SET title = title, body = body WHERE id = id";
  db.query(sqlUpdate, [id, title, body], (err, result) => {
    if (err) console.log(err);
  });
});

app.listen(3001, () => {
  console.log("Listening on http://localhost:3001");
});
