const expect = require('expect');
const request = require('supertest');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');
const {ObjectID} = require('mongodb');

const todos = [
    {
        _id: new ObjectID ,
        text: "First test todo"
    },
    {
        _id: new ObjectID,
        text: "Second test todo",
        completed: true,
        completedAt: 31223123312
    }];

beforeEach((done) => {
    Todo.remove({}).then(() => {
        return Todo.insertMany(todos);

    }).then(() => done());

});

describe('POST /todos', () => {
    it('should create a new todo', (done) => {
        var text = 'Test todo text';

        request(app)
            .post('/todos')
            .send({text})
            .expect(200)
            .expect((res) => {
                expect(res.body.text).toBe(text);
            })
            .end((err, res) => {
                if(err){
                    return done(err);
                }
                Todo.find({text}).then((todos) => {
                    expect(todos.length).toBe(1);
                    expect(todos[0].text).toBe(text);
                    done();
                }).catch((e) => done(e));

            })
    });

   it('should not create todo with invalid body data ', (done) => {
       request(app)
           .post('/todos')
           .send({})
           .expect(400)
           .end((err, res) => {
               if(err){
                   return done(err);
               }
               Todo.find().then((todos) => {
                   expect(todos.length).toBe(2);
                   done();
               }).catch((e) => done(e));
           })
   });
});

describe('GET /todos', () => {
    it('should GET all todos', (done) => {
        request(app)
            .get('/todos')
            .expect(200)
            .expect((res) => {
                console.log(res.body);
                expect(res.body.todos.length).toBe(2);
            })
            .end(done);
    });
});

describe('GET /todos/:id', () =>{
    it('should return todo doc', (done) => {
        request(app)
            .get(`/todos/${todos[0]._id.toHexString()}`)
            .expect(200)
            .expect((res) => {
                expect(res.body.todo.text).toBe(todos[0].text);
            }).end(done);
    });

    it('should return a 404 if todo not found', (done) => {
        request(app)
            .get(`todos/${todos[0]._id.toHexString().replace('a', 'c')}`)
            .expect(404)
            .end(done)
    });

    it('should return a 404 for non-object id', (done) => {
        request(app)
            .get(`todos/1231231231`)
            .expect(404)
            .end(done);
    });


});


describe('DELETE /todos/:id', () =>{
    it('should remove a todo', (done) => {
        var hexId = todos[0]._id.toHexString();
        console.log(hexId);
        request(app)
            .delete(`/todos/${hexId}`)
            .expect(200)
            .expect((res) => {
                expect(res.body.todo._id).toBe(hexId);
            })
            .end((err, res) => {
                if(err){
                    return done(err);
                }

                //query db using findById toNotExist assertion
                Todo.findById(hexId).then((todo) => {
                    expect(todo).toNotExist();
                    done();
                }).catch((e) => done(e));

            });

    });

    it('should return a 404 if todo not found', (done) =>{
        request(app)
            .delete(`todos/${todos[0]._id.toHexString().replace('a', 'c')}`)
            .expect(404)
            .end(done);
    });

    it('should return 404 if object id is invalid', (done) => {
        request(app)
            .delete(`todos/1231231231`)
            .expect(404)
            .end(done);
    });
});

describe('PATCH /todos/:id', () => {
    it('should update the todo', (done) => {
        var hexId = todos[0]._id.toHexString();
        var text = 'Row your boat';
        request(app)
            .patch(`/todos/${hexId}`)
            .send({
                completed: true,
                text
            })
            .expect(200)
            .expect((res) => {
                expect(res.body.todo.text).toBe(text);
                expect(res.body.todo.completed).toBe(true);
                expect(res.body.todo.completedAt).toBeA('number');
            }).end(done);

    });

    it('should clear the completedAt property when todo is not completed', (done) => {
        //grab second item id
        //update text, set completed to false
        //200
        //text is changed, completed false, completedAt is null .toNotExist
        var hexId = todos[1]._id.toHexString();
        var text = 'Make more coffee';
        request(app)
            .patch(`/todos/${hexId}`)
            .send({
                text,
                completed: false
            })
            .expect(200)
            .expect((res) => {
                expect(res.body.todo.text).toBe(text);
                expect(res.body.todo.completed).toBe(false);
                expect(res.body.todo.completedAt).toNotExist();

            }).end(done);
    });

});