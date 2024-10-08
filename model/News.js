const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const newsSchema = new Schema({
    title:{
        type: String,
        require: true
    },
    description:{
        type: String,
        require: true
    },
    image:{
        type: String,
        require: true
    },
    user:{
        type: mongoose.Types.ObjectId,
        ref:"User",
        require: true
    }
});

module.exports = mongoose.model("News", newsSchema); 