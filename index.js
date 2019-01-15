const express = require('express');
const helmet = require('helmet');
const knex = require('knex');
const dbConfig = require('./knexfile')
const server = express();

server.use(express.json());
server.use(helmet());

const db = knex({...dbConfig.development})

// endpoints here

server.get('/api/zoos', (req, res) => {
  db('zoos').then(zoos => {
    res.status(200).json({zoos});
  }).catch(err => {
    res.status(500).json(err);
  })
})

server.post('/api/zoos', (req, res) => {
  db('zoos')
  .insert(req.body)
  .then(result => {
    res.status(201).json({result})
  }).catch(err => {
    res.status(500).json(err)
  })
})

const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
