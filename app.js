const express = require('express');
const app = express();

app.get('/', (req, res) => {
    console.log('Salut serveur');
});

app.listen(3000);
console.log("Attente des requêtes au port 3000");
