import User from "../models/users.model.js";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
export const getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
};
export const validateUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log({ email: email, password: password });
        const user = await User.findOne({ email: email }).exec();
        if (!user) {
            console.log("User does not exist, make sure email is correct or sign up.");
            res.status(401).json({ massage: "User does not exist, make sure email is correct or sign up." });
            return;
        }
        if (user?.password !== password) {
            console.log("wrong password");
            res.status(401).json({ massage: "wrong password" });
            return;
        }
        const jwtToken = jwt.sign({
            id: user?.id
        }, process.env.JWT_TOKEN, { expiresIn: 86400 });
        const result = {
            id: user.id,
            email: user.email,
            password: '****',
            role: user.role,
            token: jwtToken
        };
        res.status(200).json({
            message: "User logged in",
            auth: true,
            token: jwtToken,
            result: result,
            expire: 86400
        });
    }
    catch (err) {
        res.status(500).json({ auth: false, message: err.message });
    }
};
export const addUser = async (req, res) => {
    const { user } = req.body;
    try {
        const isUserExist = await User.findOne({ email: user?.email });
        if (isUserExist) {
            res.status(409).json({ succeeded: false, message: 'User already exist' });
        }
        else {
            const newUser = new User(user);
            const savedUser = await newUser.save();
            res.status(201).json(savedUser);
        }
    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
};
export const updateUser = async (req, res) => {
    const user = req.body.user;
    console.log('in update');
    try {
        const updatedUser = await User.updateOne({ email: user.email }, { email: user.email, password: user.password, role: user.role });
        console.log(updatedUser);
        res.status(201).json({ edited: true });
    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
};
export const deleteUser = async (req, res) => {
    const userId = req.body.userId;
    console.log({
        userId: userId,
    });
    try {
        const deletedUser = await User.deleteOne({ _id: userId });
        res.status(201).json({ message: deletedUser });
    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
};
