const express = require('express');
const helmet = require('helmet');
const knex = require('knex');
const dbConfig = require('./knexfile');
const { zooId404 } = require('./helpers/error');
const server = express();

server.use(express.json());
server.use(helmet());

const db = knex({ ...dbConfig.development });

// endpoints here

server.get('/api/zoos', (req, res) => {
    db('zoos')
        .then(zoos => {
            res.status(200).json({ zoos });
        })
        .catch(err => {
            res.status(500).json(err);
        });
});

server.post('/api/zoos', (req, res) => {
    db('zoos')
        .insert(req.body)
        .then(result => {
            res.status(201).json({ result });
        })
        .catch(err => {
            res.status(500).json(err);
        });
});

server.get('/api/zoos/:id', (req, res) => {
    const { id } = req.params;
    db('zoos')
        .where('id', 'like', id)
        .then(result => {
            if (result.length === 0) {
                zooId404(res);
            } else {
                res.status(200).json(result);
            }
        })
        .catch(err => {
            res.status(500).json(err);
        });
});

server.delete('/api/zoos/:id', (req, res) => {
    const { id } = req.params;
    db('zoos')
        .where('id', 'like', id)
        .del()
        .then(result => {
            if (result === 1) {
                res.status(200).json({
                    success: `Successfully deleted zoo ${id}`,
                });
            } else {
                zooId404(res);
            }
        })
        .catch(err => {
            res.status(500).json(err);
        });
});

server.put('/api/zoos/:id', (req, res) => {
    const { id } = req.params;
    if (!req.body.name) {
        zooId404(res);
    }
    db('zoos')
        .where('id', 'like', id)
        .then(result => {});
});

const port = 3300;
server.listen(port, function() {
    console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
