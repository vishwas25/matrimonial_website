var mongoose = require('mongoose');
var Schema = mongoose.Schema;

userSchema = new Schema( {

	unique_id: Number,
  firstn:String,
  lastn:String,
	email: String,
  mobile: Number,
  city:String,
  dob : Date,
  gender:String,
  religion:String,
  aadhar:Number,
  pan:String,
  psw:String,
  psw_repeat:String
}),
User = mongoose.model('User', userSchema);

module.exports = User;
