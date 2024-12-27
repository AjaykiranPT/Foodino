const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    name : {type:String, required:true},
    email : {type:String, required:true, unique:true},
    phonenumber : {type:String, required:true},
    age : {type:Number, required:true},
    role : {
      type:String, 
      required:true,
      enum:['admin','masterchef','foodie'],
      default : 'foodie'
    },
    password : {type : String, required : true},
    isblocked : { type : Boolean, default: false},
    createdAt : { type : Date, default: Date.now},
  },
  {timestamps : true} 
)

module.exports = mongoose.model("users", userSchema);
