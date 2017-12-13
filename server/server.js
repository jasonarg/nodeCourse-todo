var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/TodoApp');

var Todo = mongoose.model('Todo', {
    text: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    completedAt: {
        type: Number,
        default: null
    }
});

//User model (email, password)

var User = mongoose.model('User', {
    email: {
        type: String,
        required: true,
        trim: true,
        minlength: 1
    }
});

var newUser = new User({
    email: 'jason@example.com'
});

newUser.save().then((doc)=>{
    console.log('Saved user model', doc)
}, (e)=>{
    console.log('Unable to save', e)
});

/*

var newTodo = new Todo({
    text: 'Cook dinner'
});

newTodo.save().then((doc) => {
    console.log('Saved todo', doc)
}, (e) => {
    console.log('Unable to save');
});*/


/*var otherTodo = new Todo({
    text: '   Edit this document    '
});

otherTodo.save().then((doc) => {
    console.log('Saved todo', doc)
}, (e) => {
    console.log('Unable to save', e);
});*/
