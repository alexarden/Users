const User = require("../models/users.model");

/**
 * It's an async function that uses the Userr model to find all user and then returns a status of 200 with the activities in the response body.
 */
const getUsers = async (req, res) => {
  try {
    const users = await User.find();   
    res.status(200).json(users);  
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getUser = async (req, res) => {
    const email = req.body.email

    try {
      const users = await User.findOne({ email: email}).exec();   
      res.status(200).json(users);   
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };


const addUser = async (req, res) => {
    const user = new User(req.body); 
  
    try {
      const newUser = await user.save();
      res.status(201).json(newUser);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
};

const updateUser = async (req, res) => {
    const username = req.body.email; 
    const update = req.body.update; 
    console.log({
        email:username,
        password: update  
    })
    try {
      const updatedUser = await User.updateOne({email: username},{password: update}); 
      res.status(201).json(updatedUser); 
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
};


const deleteUser = async (req, res) => {
    const username = req.body.email; 
    console.log({
        email:username,
    })
    try {
      const updatedUser = await User.deleteOne({ email: username});
      res.status(201).json(updatedUser); 
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
};

module.exports = { getUsers, addUser, updateUser ,getUser, deleteUser};