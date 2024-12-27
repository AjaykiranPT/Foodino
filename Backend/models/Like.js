const express = require("express");

const LikeSchema = Mongoose.Schema({
    RecipeLiked : {type:Mongoose.Schema.Types.ObjectId,ref:'Recipe',required:true},
    LikedBy : {type:Mongoose.Schema.Types.ObjectId,ref:'User',required:true}
},
{timestamp:true});


module.exports = Mongoose.model('Like',LikeSchema)