const {mongoose} = require('./../server/db/mongoose');
const {ObjectID} = require('mongodb');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

var id = '5a320904bb0f99bd048e30311';

//query users
//query by id, query works, user not found.  query when user is found, also handle error

var userId = '5a30d19e5138720c4b450e26';

User.findById(userId).then((user) => {
    if(!user){
        return console.log('User Id not found');
    }
    console.log('User by id', JSON.stringify(user, undefined, 2));
}).catch((e) => {console.log(e)});

/*
if(!ObjectID.isValid(id)){
    console.log('Id not valid');
}

console.log(id);*/

/*Todo.find({
    _id: id
}).then((todos) => {
    console.log('Todos', todos);
});

Todo.findOne({
    _id: id
}).then((todo) => {
    console.log('Todo', todo);
});*/

/*

Todo.findById(id).then((todo) => {
    if(!todo){
        return console.log('Id not found');
    }
    console.log('Todo by id', todo);
}).catch((e) => {
    console.log(e);
});*/
