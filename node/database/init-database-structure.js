var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
var dbName = "cooldb";

MongoClient.connect(url + dbName, { useUnifiedTopology: true }, (err, db) => {
    if (err) {
        console.log(`Data base creation error, name : ${err.message}`);
        return;
    }
    console.log(`Successfully create database ${dbName} !`);
    db.close();
});

setTimeout(() => {
    MongoClient.connect(url, { useUnifiedTopology: true }, function (err, db) {
        if (err) throw err;
        var dbo = db.db(dbName);
        dbo.createCollection("adminUsers", function (err, res) {
            if (err) throw err;
            console.log('Collection adminUsers created!');
        });
        dbo.createCollection("posts", function (err, res) {
            if (err) throw err;
            console.log('Collection posts created!');
        });
    });
}, 10000)