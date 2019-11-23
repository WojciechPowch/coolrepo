var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
var crypto = require('crypto');
var dbName = "cooldb";


MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db(dbName);

    let login = 'test';
    let email = 'test@test.net';
    let password = '123';

    let sign = 'commodore_atari'
    let iv = 'T1000'
    const inCrypt = crypto.createCipher("bf-cbc", sign);
    inCrypt.setAutoPadding(true);
    let encrypted = inCrypt.update(password, "utf-8", "base64");
    encrypted += inCrypt.final("base64");

    dbo.collection('adminUsers').insert({
        email: email,
        login: login,
        password: encrypted
    }, (error, respone) => {
        if (error) {
            console.log(error.message)
            return
        }
        console.log('Data inserted sucessfully')
    })
});
