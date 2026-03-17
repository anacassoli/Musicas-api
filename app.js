const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

const musicaRoutes = require('./routes/musicaRoutes');
app.use('/musica', musicaRoutes);

app.listen(port, () => {
    console.log(`Servidor: http://localhost:${port}`);
});