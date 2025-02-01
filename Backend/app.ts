import dotenv from "dotenv";
dotenv.config();
import express from 'express';
import cors from 'cors';
const app = express();
import connectToDB from './db/db';
const userRoutes = require("./routes/user.routes");
const captainRoutes = require("./routes/captain.routes")
const cookieParser = require("cookie-parser");

connectToDB();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get('/', (req, res) => {
    res.send("Hello World!");
});
app.use("/users",userRoutes);
app.use("/captains",captainRoutes);


export default app;