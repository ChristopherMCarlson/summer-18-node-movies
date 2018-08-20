let express = require('express');
let bp = require('body-parser');
let server = express();
let movies = require('./movies')
let port = 8080

server.use(bp.json())
server.use(bp.urlencoded({
  extended: true
}))



//create an endpoint for getting a list of movies
server.get('/movies', (req, res, next) => {
  return res.send(movies)
})

//create an endpoint for finding a movie by its index

server.get('/movies/index/:index', (req, res, next) => {
  let index = movies[req.params.index]
  if (index) {
    return res.send(index)
  }
  return res.status(400).send({
    error: 'no movie'
  })
})

//create an endpoint for finding a movie by its title
server.get('/movies/title/:title', (req, res, next) => {
  let movie = movies.find(m => m.name == req.params.title)
  if (movie) {
    return res.send(movie)
  }
  return res.status(400).send({
    error: 'no movie'
  })
})

//create an endpoint for finding all movies by their years
server.get('/movies/byyear/:year', (req, res, next) => {
  let matches = movies.filter(m => m.year == req.params.year)
  if (matches.length < 1) {
    return res.status(400).send({
      error: 'no movie'
    })
  } if (matches) {
    return res.send(matches)
  }
})

//create an endpoint for finding all by rating

server.get('/movies/byrating/:rating', (req, res, next) => {
  let matches = movies.filter(m => m.rating.toUpperCase() == req.params.rating.toUpperCase())
  if (matches.length < 1) {
    return res.status(400).send({
      error: 'no movie'
    })
  } if (matches) {
    return res.send(matches)
  }
})

//create an endpoint for finding all by tags

server.get('/movies/bytag/:tags', (req, res, next) => {
  let matches = movies.filter(m => m.tags.find(t => { return t == req.params.tags }))
  if (matches.length < 1) {
    return res.status(400).send({
      error: 'no movie'
    })
  } if (matches) {
    return res.send(matches)
  }
})





server.listen(port, () => {
  console.log("Movies can be found at port: ", port)
})