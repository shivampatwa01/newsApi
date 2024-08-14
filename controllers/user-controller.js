const User = require("../model/User");
const bcrypt = require("bcryptjs")

exports.getAllUser = async(req, res, next) => {
    let users;
    try {
        users = await User.find();

    } catch (err) {
        console.log(err);
    }
    if(!users) {
        return res.status(404).json({message: "NO User Found"});
    }
    return res.status(200).json({users})
}

exports.signup = async(req, res, next) => {
    const {name, email, password} = req.body;

    let existingUser;
    try {
        existingUser = await User.findOne({email});
    } catch (error) {
       return console.log(error);
    }
    if(existingUser){
        return res.status(400)
        .json({message: "User Already Exists! login instead"})
    }
    const hashedPassword = bcrypt.hashSync(password);

    const user = new User({
        name,
        email,
        password: hashedPassword,
        blos: []
    });


    try {
       await user.save();
    } catch (error) {
       return console.log(error);
        
    }
    return res.status(201).json({user})
}

exports.login = async(req, res, next) =>{

    const {email, password} = req.body;

    let existingUser;
    try {
        existingUser = await User.findOne({email});
    } catch (error) {
       return console.log(error);
    }
    if(!existingUser){
        return res.status(404).json({message: "user does not exist"});
    }

    const isPasswordCorrect = bcrypt.compareSync(password, existingUser.password);

    if(!isPasswordCorrect){
        return res.status(400).json({message:"incorrect password"})
    }
    return res.status(200).json({message:"Login Successfull"})
}