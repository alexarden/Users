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
            console.log('Faild to get user');
            res.status(400).json({ massage: "Wrong e-mail, please try again." });
            return;
        }
        if (user?.password !== password) {
            console.log('Faild to match password');
            res.status(400).json({ massage: "Wrong password" });
            return;
        }
        const jwtToken = jwt.sign({
            id: user?.id,
            email: user?.email
        }, process.env.JWT_TOKEN);
        res.status(200).json({ message: "User loged in", token: jwtToken, user: user });
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
};
export const addUser = async (req, res) => {
    const user = new User(req.body);
    try {
        const newUser = await user.save();
        res.status(201).json(newUser);
    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
};
export const updateUser = async (req, res) => {
    const username = req.body.email;
    const update = req.body.update;
    console.log({
        email: username,
        password: update
    });
    try {
        const updatedUser = await User.updateOne({ email: username }, { password: update });
        res.status(201).json(updatedUser);
    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
};
export const deleteUser = async (req, res) => {
    const username = req.body.email;
    console.log({
        email: username,
    });
    try {
        const updatedUser = await User.deleteOne({ email: username });
        res.status(201).json(updatedUser);
    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
};
