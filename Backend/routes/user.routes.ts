import express from "express";
const router = express.Router();
import {body} from 'express-validator';
const userController = require('../controllers/user.controller');

router.post('/register', [
        body('email').isEmail().withMessage('Invalid Email'),
        body('fullname.firstName').isLength({ min: 3 }).withMessage('First name must be at least 3 characters long'),
        body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
    ],
    userController.registerUser
)

module.exports = router;