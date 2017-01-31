console.log('belt.model')

var mongoose = require('mongoose');
var Schema = mongoose.Schema;






var UserSchema = new mongoose.Schema({
	
	first_name:{type: String},
	last_name:{type:String},
	user_name:{type:String},
	password:{type:String},
	_questions:[{type:Schema.Types.ObjectId, ref: 'Question'}],
	_answers:[{type:Schema.Types.ObjectId, ref: 'Answer'}],
	
});



mongoose.model('User',UserSchema);


