import dotenv from "dotenv";
dotenv.config();
import express from 'express';
import cors from 'cors';
const app = express();
import connectToDB from './db/db';

connectToDB();

app.use(cors());

app.get('/', (req, res) => {
    res.send("Hello World!");
});


export default app;