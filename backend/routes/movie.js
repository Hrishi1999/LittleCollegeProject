const router = require('express').Router();
let Movie = require('../models/movie.model');

router.route('/').get((req, res) => {
    Movie.find()
    .then(movies => res.json(movies))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const name = req.body.name;
  const gross = req.body.gross;
  const ratings = req.body.ratings;
  const date = Date.parse(req.body.date);

  const newMovie = new Movie({
    name,
    gross,
    ratings,
    date
  });

  newMovie.save()
  .then(() => res.json('Movie added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
  Movie.findById(req.params.id)
    .then(movie => res.json(movie))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
    Movie.findByIdAndDelete(req.params.id)
    .then(() => res.json('Movie deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
    Movie.findById(req.params.id)
    .then(movie => {
      movie.name = req.body.name;
      movie.gross = req.body.gross;
      movie.ratings = req.body.ratings;
      movie.date = Date.parse(req.body.date);

      movie.save()
        .then(() => res.json('Movie updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;