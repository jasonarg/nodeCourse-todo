const {mongoose} = require('./../server/db/mongoose');

const {ObjectID} = require('mongodb');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');



/*Todo.remove({}).then((result) => {
    console.log(result);
});

//

Todo.findOneAndRemove({_id: '5a329a6dd484ca7b9c3183e3'}).then((result) => {
    console.log(remove);
});*/

Todo.findByIdAndRemove('5a329a6dd484ca7b9c3183e3').then((todo) => {
console.log(todo);
});
