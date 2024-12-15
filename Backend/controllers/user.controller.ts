import userModel from "../models/user.model";
import userService from "../services/user.service";
import {validationResult} from "express-validator";

module.exports.registerUser = async (req: any, res: any, next: any): Promise<void> => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }
    const {fullname, email, password} = req.body;

    const hashedPassword = await userModel.prototype.hashPassword(password);

    const user = await userService.createUser({firstName:fullname.firstName, lastName:fullname.lastName, email, password: hashedPassword});

    const token = user.generateAuthToken();


    res.status(200).json({token, user});
}

