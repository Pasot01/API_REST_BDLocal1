const { Utilisateur } = require("../model/user");
const client = require('../bd/connect');


const ajouterUtilisateur = async (req, res) => {
    try {
        let utilisateur = new Utilisateur(
            req.body.nom,
            req.body.adresse,
            req.body.telephone
        );

        let result = await client
            .bd()
            .collection('utilisateurs')
            .insertOne(utilisateur);

        res.status(200).json(result);

    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
};

module.exports = { ajouterUtilisateur };