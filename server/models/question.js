console.log('belt.model')

var mongoose = require('mongoose');
var Schema = mongoose.Schema;




var QuestionSchema = new mongoose.Schema({
	name: {type: String},
	question: {type: String, required: true},
	description: {type: String},
	category: {type:String},
	_answers: [{type: Schema.Types.ObjectId, ref: 'Answer'}]
});



mongoose.model('Question',QuestionSchema);


