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

let views = 1;
app.post("/message", (req, res, next) => {
  console.log("Text posted: ", req.body);
  console.log(views);
  try {
    if (req.body.message === "" || req.body.text === "") {
      res.status(400).send("Bad Request");
    } else if (views > 5) {
      res
        .status(429)
        .send("Slow down mi viejo amigo, Too much requests! Try it later");
    } else {
      res.send(req.body);
    }
    views++;
  } catch (error) {
    next(error);
  }
});

app.listen(port, () => console.log(`Listening port on ${port}`));
