const { Router } = require("express");
const Movie = require("./MovieModel");
const router = new Router();

router.get("/movie", (req, res, next) => {
  const limit = req.query.limit || 3;
  const offset = req.query.offset || 0;
  Movie.findAndCountAll({ limit, offset })
    .then(result => res.send({ movies: result.rows, total: result.count }))
    .catch(error => next(error));
});

router.get("/movie/:id", (req, res, next) => {
  const movieId = req.params.id;
  console.log(movieId);
  Movie.findByPk(movieId).then(movie => {
    if (!movie) {
      res.status(404).send("Movie not found!");
    } else {
      res.json(movie);
    }
  });
});

router.post("/movie", (req, res, next) => {
  const movieName = req.body;
  console.log("MOVIE", movieName);
  Movie.create(movieName)
    .then(movie => {
      console.log("Movie created!");
      res.json(movie);
    })
    .catch(error => next(error));
});

router.put("/movie/:id", (req, res, next) =>
  Movie.findByPk(req.params.id)
    .then(movie => movie.update(req.body))
    .then(movie => res.send(movie))
    .catch(next)
);

router.delete("/movie/:id", (req, res, next) =>
  Movie.destroy({ where: { id: req.params.id } })
    .then(number => res.send({ number }))
    .catch(next)
);

module.exports = router;
