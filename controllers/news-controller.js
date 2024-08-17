const { default: mongoose } = require("mongoose");
const News = require("../model/News");
const User = require("../model/User");

exports.getAllNewss = async(req, res, next) => {
    let newss;
    try {
        newss = await News.find();
    } catch (error) {
        return console.log(error);
    }

    if(!newss) {
        return res.status(404).json({message:"No news Found"})
    }
    return res.status(200).json({newss})
}

exports.postNews = async(req, res, next) => {
    const {title, description, image, user} = req.body;
    let existingUser;
     try {
        existingUser = await User.findById(user);
     } catch (error) {
        return console.log(error);
     }

     if(!existingUser) {
        return res.status(400).json({message:"Unable To Find User By Id"})
     }

    const news = new News({
        title,
        description,
        image,
        user,
    });
    try {
       const session = await mongoose.startSession();
       session.startTransaction();
       await news.save({session});
       existingUser.newss.push(news);
       await existingUser.save({session})
       await session.commitTransaction();

    } catch (error) {
         console.log(error);
         return res.status(500).json({message:err})
    }

    return res.status(200).json({news})
}

exports.updateNews = async(req, res, next) => {
    const {title, description} = req.body;
    const newsId = req.params.id;
    let news;
    try {
        news = await News.findByIdAndUpdate(newsId, {
            title,
            description
        }) 
    } catch (error) {
        return console.log(error);
    }

    if(!news){
        return res.status(500).json({message:"unable to update"})
    }

    return res.status(200).json({news});
    
}

exports.getById = async(req, res, next) => {
    const id = req.params.id;
    let news;
    try {
        news = await News.findById(id);
    } catch (error) {
        return console.log(error);
    }

    if(!news){
        return res.status(404).json({message:"No news Found"});
    }

    return res.status(200).json({news});
}

exports.deleteNews = async(req, res, next) => {
    const id = req.params.id;

    let news;
    try {
        news = await News.findByIdAndDelete(id).populate('user');
        await news.user.newss.pull(news);
        await news.user.save();
    } catch (error) {
        console.log(error);
    }

    if(!news){
        return res.status(404).json({message:"unable to delete"});
    }

    return res.status(200).json({message:"News deleted"})
}

exports.getByUserId = async (req, res, next) => {
    const userId = req.params.id;
    let userNewss;
    try {
        userNewss = await User.findById(userId).populate("newss");
    } catch (error) {
        return console.log(error)
    }
    if(!userNewss){
        return res.status(404).json({message:"No News Found"})
    }
    return res.status(200).json({newss:userNewss})
}