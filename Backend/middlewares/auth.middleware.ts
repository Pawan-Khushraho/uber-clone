// @ts-ignore
const userModel = require("../models/user.model");
// @ts-ignore
const bcrypt = require("bcrypt");
// @ts-ignore
const jwt = require("jsonwebtoken");

module.exports.authUser = async (req:any, res:any, next:any) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

    if(!token){
        return res.status(401).json({ message: "Unauthorized" });
    }

    const isBlackListed = await userModel.findOne({token:token})


    if(isBlackListed){
        return res.status(401).json({ message: "Unauthorized" });
    }

    try{
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        const user = await userModel.findById(decoded._id);

        req.user = user;

        return next();

    }catch(e){
        return res.status(401).json({ message: "Unauthorized" });
    }

}

