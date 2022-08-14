const { Utilisateur } = require("../model/user");
const client = require('../bd/connect');
const { ObjectID } = require("bson");


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

const getUtilisateurs = async (req, res) => {
    try {
        let cursor = client
            .bd()
            .collection('utilisateurs')
            .find();
        let theResult = await cursor.toArray();
        if (theResult.length > 0) {
            res.status(200).json(theResult);
        } else {
            res.status(204).json({ msg: 'Aucun utilisateur trouvé' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}

const getUtilisateur = async (req, res) => {
    try {
        let id = new ObjectID(req.params.id);
        let cursor = client
            .bd()
            .collection("utilisateurs")
            .find({ _id: id });
        let result = await cursor.toArray();
        if (result.length > 0) {
            res.status(200).json(result[0]);
        } else {
            res.status(204).json({ msg: "Cet utilisateur n'existe pas" });
        }
    } catch (error) {
        console.log(error);
        res.status(501).json(error);
    }
};

const updateUtilisateur = async (req, res) => {
    try {
        let id = new ObjectID(req.params.id);
        let nom = req.body.nom;
        let adresse = req.body.adresse;
        let telephone = req.body.telephone;
        let result = await client
            .bd()
            .collection("utilisateurs")
            .updateOne({ _id: id }, { $set: { nom, adresse, telephone } });

        if (result.modifiedCount === 1) {
            res.status(200).json({ msg: "Modification réussie" });
        } else {
            res.status(404).json({ msg: "Cet utilisateur n'existe pas" });
        }
    } catch (error) {
        console.log(error);
        res.status(501).json(error);
    }
};

const deleteUtilisateur = async (req, res) => {
    try {
        let id = new ObjectID(req.params.id);
        let result = await client
            .bd()
            .collection("utilisateurs")
            .deleteOne({ _id: id });
        if (result.deletedCount === 1) {
            res.status(200).json({ msg: "Suppression réussie" });
        } else {
            res.status(404).json({ msg: "Cet utilisateur n'existe pas" });
        }
    } catch (error) {
        console.log(error);

        res.status(501).json(error);
    }
};

module.exports = {
    ajouterUtilisateur,
    getUtilisateurs,
    getUtilisateur,
    updateUtilisateur,
    deleteUtilisateur,
};