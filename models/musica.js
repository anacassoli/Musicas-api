const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./infra/database.db', (err) => {
    if (err) {
        console.error('Erro banco:', err.message);
    }
});

db.run(`CREATE TABLE IF NOT EXISTS musicas (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    autor TEXT NOT NULL,
    genero TEXT,
    datalanc TEXT
)`, (err) => {
    if (err) console.error('Erro tabela:', err);
});

function getAllMusicas(callback) {
    db.all("SELECT * FROM musicas", (err, rows) => {
        callback(err, rows);
    });
}

function getMusicaById(id, callback) {
    db.get("SELECT * FROM musicas WHERE id = ?", [id], (err, row) => {
        callback(err, row);
    });
}

function createMusica(musica, callback) {
    const { nome, autor, genero, datalanc } = musica;
    db.run("INSERT INTO musicas (nome, autor, genero, datalanc) VALUES (?, ?, ?, ?)", 
        [nome, autor, genero, datalanc], 
        function(err) {
            callback(err, { id: this.lastID });
        });
}

function updateMusica(id, musica, callback) {
    const { nome, autor, genero, datalanc } = musica;
    db.run("UPDATE musicas SET nome = ?, autor = ?, genero = ?, datalanc = ? WHERE id = ?", 
        [nome, autor, genero, datalanc, id], 
        function(err) {
            callback(err, { changes: this.changes });
        });
}

function deleteMusica(id, callback) {
    db.run("DELETE FROM musicas WHERE id = ?", [id], function(err) {
        callback(err, { changes: this.changes });
    });
}

module.exports = {
    getAllMusicas,
    getMusicaById,
    createMusica,
    updateMusica,
    deleteMusica
};