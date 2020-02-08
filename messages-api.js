const express = require("express");
const app = express();
const port = 3000;
const Movie = require("./movie/routerMovie");

const bodyParser = require("body-parser");
const parserMiddleware = bodyParser.json();

const cors = require("cors");
const corsMiddleware = cors();

app.use(corsMiddleware);
app.use(parserMiddleware);
app.use(Movie);
app.get("/message", (req, res) => res.send("Hola amigo!!!"));
app.post("/message", (req, res, next) => {
  console.log("Text posted: ", req.body);
  res.send(req.body);
});

app.listen(port, () => console.log(`Listening port on ${port}`));
