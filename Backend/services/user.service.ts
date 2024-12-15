import userModel from '../models/user.model';

type TcreateUserInput = {

    firstName: string,
    lastName: string,
    email: string,
    password: string,
}

const createUser = async ({firstName, lastName, email, password}: TcreateUserInput) => {
    if (!firstName || !email || !password) {
        console.log("First name ,email and password are required!");
    }
    const user = userModel.create({
        fullname: {
            firstName,
            lastName
        },
        email,
        password
    });

    return user;
}

const userService={
    createUser,
}

export default userService;