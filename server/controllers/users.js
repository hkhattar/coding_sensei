


console.log('belt server controller')

var mongoose = require('mongoose');
var Question = mongoose.model('Question');
var Answer = mongoose.model('Answer');
var User = mongoose.model('User');

module.exports = {


	index_question: function(req,res){
		console.log("inside question index in routes");
		Question.find({},false,true).populate('_answers').exec(function(err,questions){

			console.log(questions);
			res.json(questions);
		});
	},

	index_user: function(req,res){
		console.log("inside user index in routes");
		User.find({},false,true).populate('_answers').exec(function(err,users){

			console.log(users);
			res.json(users);
		});
	},
	


	create_question: function(req,res)
	{
		console.log('inside question create server controller')
		console.log('POST DATA',req.body);
		
		var question = new Question({question:req.body.question,description:req.body.description,category:req.body.category});
		question.save(function(err,data){
		
			if(err){
				console.log('ERR', err)
			}
			else{
				res.json(data)
				
			}

		})

		
	},

	register_user: function(req,res)
	{
		console.log('inside register user server controller')
		console.log('POST DATA',req.body);
		
		var user = new User({first_name:req.body.first_name,last_name:req.body.last_name,password:req.body.password,user_name:req.body.user_name});
		user.save(function(err,data){
		
			if(err){
				console.log('ERR', err)
			}
			else{
				res.json(data)
				
			}

		})

		
	},

	show_question: function(req,res){
		Question.findOne({_id:req.params.id},function(err,result){
			res.json(result);
		})
		.populate('_answers').exec(function(err,question){
			console.log('error', err);
		})
	},

	create_answer: function(req,res)
	{
		console.log('create_answer in server controller');
		Question.findOne({_id:req.params.id},function(err,question)
		{
			var answer = new Answer({details:req.body.answer.details, answer:req.body.answer.answer, name:req.body.name});

			console.log('POST DATA', req.body)
			console.log('req.body.answer.answer',req.body.answer.answer)
			console.log('req.body.name',req.body.name);
			console.log('answer',answer);
			console.log(question._id);
			answer._question = question._id;
			console.log('answer._question',answer._question)
			question._answers.push(answer);
			answer.save(function(err)
			{
				question.save(function(err)
				{
					if(err)
					{
						console.log(error);
					}
					else
					{
						console.log('successfully added an answer');
						console.log('question',question)
						console.log('answer',answer)
						res.json(answer);
					}

				})
				
			})
		})
	},

	answer_update : function(req,res){
		console.log('answer_update server controller');
		console.log('req.params.id',req.params.id);
		console.log('req.body',req.body);
		var likes = req.body.likes;

		Answer.update({_id: req.params.id},
			{$set: {likes:likes}},
			function(err,result){
				if(err){
					console.log(err);
				}
				else{
					res.json(result);
				}
			})

	}













}