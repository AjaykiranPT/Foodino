const express = require("express");
const Like = require("../models/Like");

const Liked = async (req ,res) =>{
    try{
        const {RecipeLiked,LikedBy} = req.body;
        const newLike = new Like(
            {
                RecipeLiked,
                LikedBy
            }
        )
    }
    catch(error){
        return res.status(500).json({error:error})
    }
};

const UnLiked = async (req, res) => {
    try {
        const { _id } = req.body;
        if (!_id) {
            return res.status(400).json({ error: "Missing '_id' in the request body." });
        }
        const unLiked = await Like.findByIdAndDelete(_id);
        if (!unLiked) {
            return res.status(404).json({ error: "Like not found or already removed." });
        }
        res.status(200).json({ message: "Successfully unliked.", data: unLiked });
    } catch (error) {
        console.error("Error in UnLiked:", error);
        res.status(500).json({ error: "An internal server error occurred." });
    }
};

module.exports = {Liked, UnLiked};