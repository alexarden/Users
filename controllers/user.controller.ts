import express from "express";
import User from "../models/users.model.js";
import jwt, { Secret } from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const getUsers = async (
  req: express.Request,
  res: express.Response
): Promise<void> => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

export const validateUser = async (
  req: express.Request,
  res: express.Response
): Promise<void> => {
  try {
    const { email, password } = req.body;
    console.log({ email: email, password: password });
    const user = await User.findOne({ email: email }).exec();

    if (!user) {
      console.log(
        "User does not exist, make sure email is correct or sign up."
      );
      res
        .status(401)
        .json({
          massage:
            "User does not exist, make sure email is correct or sign up.",
        });
      return;
    }

    if (user?.password !== password) {
      console.log("wrong password");
      res.status(401).json({ massage: "wrong password" });
      return;
    }

    const jwtToken = jwt.sign(
      {
        id: user?.id,
      },
      process.env.JWT_TOKEN as Secret,
      { expiresIn: 86400 }
    );

    const result = {
      id: user.id,
      email: user.email,
      password: "****",
      role: user.role,
      token: jwtToken,
    };

    res.status(200).json({
      message: "User logged in",
      auth: true,
      token: jwtToken,
      result: result,
      expire: 86400,
    });
  } catch (err: any) {
    res.status(500).json({ auth: false, message: err.message });
  }
};

export const signUser = async (
  req: express.Request,
  res: express.Response
): Promise<void> => {
  console.log('signup');
  try {
    const { email, password } = req.body;
    console.log({ email: email, password: password });
    const user = await User.findOne({ email: email }).exec();

    if (user) {
      console.log("User exist");
      res.status(401).json({ massage: "User exist" });
      return;
    } else {
      const newUser = new User({
        email: email,
        password: password,
        role: "user",
      });
      const savedUser = await newUser.save();
      res.status(201).json({user:savedUser, message: 'signed'});
    }
  } catch (err: any) {
    res.status(500).json({ auth: false, message: err.message });
  }
};

export const addUser = async (
  req: express.Request,
  res: express.Response
): Promise<void> => {
  const { user } = req.body;

  try {
    const isUserExist = await User.findOne({ email: user?.email });
    if (isUserExist) {
      res.status(409).json({ succeeded: false, message: "User already exist" });
    } else {
      const newUser = new User(user);
      const savedUser = await newUser.save();
      res.status(201).json(savedUser);
    }
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

export const updateUser = async (
  req: express.Request,
  res: express.Response
): Promise<void> => {
  const user = req.body.user;
  console.log("in update");
  try {
    const updatedUser = await User.updateOne(
      { email: user.email },
      { email: user.email, password: user.password, role: user.role }
    );
    console.log(updatedUser);
    res.status(201).json({ edited: true });
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

export const deleteUser = async (
  req: express.Request,
  res: express.Response
): Promise<void> => {
  const userId = req.body.userId;
  console.log({
    userId: userId,
  });
  try {
    const deletedUser = await User.deleteOne({ _id: userId });
    res.status(201).json({ message: deletedUser });
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};
