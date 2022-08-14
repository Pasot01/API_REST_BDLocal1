const { MongoClient, Db } = require('mongodb');

let client = null;

function connect(url, callback) {
    if (client == null) {
        client = new MongoClient(url);

        client.connect((erreur) => {
            if (erreur) {
                client = null;
                callback(erreur);
            } else {
                callback();
            }
        });
    } else {
        callback();
    }
}

function bd() {
    var db = new Db(client, "dbOK");
    return db;
}

function fermerConnexion() {
    if (client) {
        client.close();
        client = null;
    }
}

module.exports = { connect, bd, fermerConnexion };