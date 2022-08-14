const express = require('express');
const { connect } = require('./bd/connect');
const routeUtilisateur = require('./route/routeUser');
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/api/v1', routeUtilisateur);

connect('mongodb://127.0.0.1:27017/', (erreur) => {
    if (erreur) {
        console.log('Erreur lors de la connexion avec la base de donnée');
        process.exit(-1);
    } else {
        console.log('Connexion avec la base de donnée établie');
        app.listen(3000);
        console.log("Attente des requêtes au port 3000");
    }
});