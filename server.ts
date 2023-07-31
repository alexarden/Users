import express from "express";
import mongoose, { ConnectOptions } from 'mongoose';  
import cors from "cors";    

const app = express();

/* Loading the environment variables from the .env file. */
import dotenv from 'dotenv';
dotenv.config(); 


const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/todoapiDB"; 
import {validateUser, getUsers, addUser, deleteUser, updateUser}  from "./controllers/user.controller.js";  
import { verifyJwt } from './middlewares/verifyJwt.js';
 

app.use(express.json());
app.use(cors());


app.get("/", (_req: express.Request, _res: express.Response) => { 
  _res.send("Hello World!");
});

// GET requests
app.get("/users",verifyJwt,getUsers);  
app.get("/isAuth", verifyJwt, (_req: express.Request, _res: express.Response) => {
  _res.json({'message': 'User is Authenticated', auth : true})
})

// POST requests
app.post("/login", validateUser);
app.post("/add",verifyJwt, addUser);  
app.post("/update",verifyJwt, updateUser);

// DELETE requests
app.delete("/delete",verifyJwt, deleteUser);


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