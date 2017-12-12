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


/*    db.collection('Todos').insertOne({
        text: 'Something to do',
        completed: false
    }, (err, result) => {
        if(err){
            return console.log('Unable to insert todoitem', err);
        }
        console.log(JSON.stringify(result.ops, undefined, 2));
    });*/

//insert new doc into Users collection (name, age, location String)
/*    db.collection('Users').insertOne({
        name: 'Auttie',
        age: 4,
        location: 'Towson'
    }, (err, result) => {
        if(err){
            return console.log('Unable to insert user', err);
        }
        console.log(JSON.stringify(result.ops, undefined, 2));
        console.log(result.ops[0]._id.getTimestamp());
    });
*/
    db.close();
});

