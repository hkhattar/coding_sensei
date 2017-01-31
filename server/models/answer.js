console.log('belt.model')

var mongoose = require('mongoose');
var Schema = mongoose.Schema;






var AnswerSchema = new mongoose.Schema({
	_user: {type:Schema.Types.ObjectId, ref: 'User'},
	_question: {type: Schema.Types.ObjectId, ref: 'Question'},
	name:{type: String},
	answer:{type: String, required: true},
	details:{type: String},
	likes: {type: Number,default: 0}
});



mongoose.model('Answer',AnswerSchema);

