import express from "express";
import mongoose, { ConnectOptions } from 'mongoose';  
import cors from "cors";    
import {validateUser, getUsers, addUser, deleteUser, updateUser}  from "./controllers/user.controller.js";  
import { verifyJwt } from './middlewares/verifyJwt.js';
import { verifyAdmin } from './middlewares/verifyAdmin.js';
import dotenv from 'dotenv';

// Use env file.
dotenv.config(); 

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/todoapiDB"; 

 
app.use(express.json());
app.use(cors());


// GET requests
app.get("/users",getUsers);  


// POST requests
app.post("/login", validateUser);

app.post("/add",[verifyAdmin,verifyJwt], addUser);  

app.post("/update",[verifyAdmin,verifyJwt], updateUser);


// DELETE requests
app.delete("/delete",[verifyAdmin,verifyJwt], deleteUser);


// Test Auth
app.post("/isAuth", [verifyAdmin,verifyJwt],  (_req: express.Request, _res: express.Response) => {
  _res.json({'message': 'User is Authenticated', auth : true})
}) 


/* Connecting to the database and then starting the server. */

interface CustomConnectionOptions extends ConnectOptions { 
  useNewUrlParser?: boolean;
}

mongoose
  .connect(MONGODB_URI, { useNewUrlParser: true } as CustomConnectionOptions)  
  .then(() => { 
    app.listen(PORT, () => console.log(`Server stated on port ${PORT}`));  
  })
  .catch((err: Error) => {
    console.log(err);
  }); 