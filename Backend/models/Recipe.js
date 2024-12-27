const mongoose = require('mongoose');

const RecipeSchema = mongoose.Schema({
    title:{type:String,required:true},
    ingredients:{type:[String],require:true},
    instructions:{type:[String],require:true},
    createdBy:{type:mongoose.Schema.Types.ObjectId,ref: 'users' ,required:true}
},
{timestamp:true}
);

module.exports = mongoose.model('Recipe',RecipeSchema);