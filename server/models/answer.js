console.log('belt.model')

var mongoose = require('mongoose');
var Schema = mongoose.Schema;






var AnswerSchema = new mongoose.Schema({
	_question: {type: Schema.Types.ObjectId, ref: 'Question'},
	name:{type: String},
	answer:{type: String, required: true},
	details:{type: String}
});


mongoose.model('Answer',AnswerSchema);

