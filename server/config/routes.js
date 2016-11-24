var path = require('path');
var users = require('../controllers/users.js')//we can get functions from friends
module.exports = function(app){
	app.get('/', function(req, res) {
		console.log('/users')
   		users.index(req,res)
    
	})

	

	app.post('/questions',function(req,res){
		console.log("POST DATA",req.body);
		users.create_question(req,res)
	})

	app.get('/questions',function(req,res){
		users.index_question(req,res)
	})

	app.get('/questions/:id',users.show_question);

	app.post('/answers/:id',users.create_answer);

	app.put('/answers/:id', users.answer_update);

}