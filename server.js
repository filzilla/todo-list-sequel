const express = require ('express');
const mustache = require('mustache');
const mustacheExpress = require ('mustache-express')
const models = require ('./models');

const bodyParser = require ('body-parser');

var application = express();
application.engine('mustache', mustacheExpress());
application.set('view engine', 'mustache');

application.set('views', './views');


application.use(express.static('public'));

application.use(bodyParser.urlencoded());
application.use(bodyParser.json());


application.get ('/todo', async (request, response) => {
        var list = {};
     list =  await models.todoList.findAll({});
    
   // var renderModel = {
     //    myApp: "the best todo list ever",
       //  itemList: list
    // };

   // var todo = await models.todolist.findAll();
    
    response.render('todo', {list: list});
    
});

// using this to add new items to the list
application.post('/todo', async (request, response) => {
    
    var newTodo = request.body.newTodo;

    await models.todoList.create({

        item: newTodo,
        complete: false
    });

    //send is for testing(postman)/ building backend API
    // response.send(todo);
    //we redirect after we create new item
    //get('/todo') will render 'todo' and todolist with new todo item.
    response.redirect('todo');
  
});

// using this to change the status of complete to true when clicked
application.post('/todo/:id', async (request, response) => {

    var id = request.params.id;

   await models.todoList.update({

        complete: true
    }, {
        where: {
            id: id
    }
});
response.redirect('/todo');
});


application.listen(3000, function () {
  console.log('Successfully started express application!');
});