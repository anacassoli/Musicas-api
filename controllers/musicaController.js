// controllers/musicaController.js
const Musica = require('../models/musica');

exports.getAllMusicas = (req, res) => {
    Musica.getAllMusicas((err, musica) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(musica);
        }
    });
};

exports.getMusicaById = (req, res) => {
    Musica.getMusicaById(req.params.id, (err, musica) => {
        if (err) {
            res.status(500).send(err);
        } else if (musica) {
            res.json(musica);
        } else {
            res.status(404).send({ message: 'Musica não encontrada' });
        }
    });
};

exports.createMusica = (req, res) => {
    Musica.createMusica(req.body, (err, result) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(201).json(result);
        }
    });
};

exports.updateMusica = (req, res) => {
    Musica.updateMusica(req.params.id, req.body, (err, result) => {
        if (err) {
            res.status(500).send(err);
        } else if (result.changes) {
            res.status(200).json(result);
        } else {
            res.status(404).send({ message: 'Musica não encontrada' });
        }
    });
};

exports.deleteMusica = (req, res) => {
    Musica.deleteMusica(req.params.id, (err, result) => {
        if (err) {
            res.status(500).send(err);
        } else if (result.changes) {
            res.status(200).json({ message: 'Musica deletada com sucesso' });
        } else {
            res.status(404).send({ message: 'Musica não encontrada' });
        }
    });
};