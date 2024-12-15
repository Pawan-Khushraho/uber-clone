import mongoose from 'mongoose';

function connectToDB() {
    mongoose.connect(process.env.DB_CONNECT||"")
        .then(() => console.log("MongoDB Connected"))
        .catch((err:unknown) => {
            console.log(err)
        });
}

export default connectToDB;