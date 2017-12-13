//const MongoClient = require('mongodb').MongoClient;
//Es6 Object Destructuring
const {MongoClient, ObjectID} = require('mongodb');

/*

var obj = new ObjectID();

console.log(obj, obj.getTimestamp());

*/


MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if(err){
        return console.log('Unable to connect to MongoDB server');
    }
        console.log('Connected to MongoDB server');

/*
   var docs = db.collection('Todos').find({
        _id: new ObjectID('5a2fe6d91de176467726baa9')
    }).toArray().then((docs) => {
        console.log('Todos');
        console.log(JSON.stringify(docs, undefined, 2));
        db.close();
    }, (err) =>{
        console.log('Unable to fetch todos', err);
    });
*/



/*
    db.collection('Todos').find().count().then((count) => {
        console.log(`Todos count ${count}`);
        db.close();
    }, (err) =>{
        console.log('Unable to fetch todos', err);
    });

*/

    var docs = db.collection('Users').find({
        name: 'Hb'
    }).toArray().then((docs) => {
        console.log('Users');
        console.log(JSON.stringify(docs, undefined, 2));
        db.close();
    }, (err) =>{
        console.log('Unable to fetch users', err);
    });
});

