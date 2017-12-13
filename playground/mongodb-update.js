//const MongoClient = require('mongodb').MongoClient;

const {MongoClient, ObjectID} = require('mongodb');


MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if(err){
        return console.log('Unable to connect to MongoDB server');
    }
    console.log('Connected to MongoDB server');

/*db.collection('Todos').findOneAndUpdate({
    _id: new ObjectID("5a30c68cdd29ecb663a55bc8")
    }, {
        $set: {
            completed: true
        }
    }, {
        returnOriginal: false
    }
).then((result) => {
    console.log(result);
});*/
    db.collection('Users').findOneAndUpdate({
            _id: new ObjectID("5a2fe856bb385c468026988c")
        }, {
            $set: {
                name: 'Auttie',
            },
            $inc: {
                age: -1
            }
        }, {
            returnOriginal: false
        }
    ).then((result) => {
        console.log(result);
    });


});

