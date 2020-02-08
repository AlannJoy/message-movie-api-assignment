const Sequelize = require("sequelize");
const db = require("../sequelize-rest");

const Movie = db.define("movie", {
  title: Sequelize.STRING,
  yearOfRelease: Sequelize.INTEGER,
  synopsis: Sequelize.STRING
});

module.exports = Movie;
