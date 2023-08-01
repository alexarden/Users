import express from "express";
import jwt from 'jsonwebtoken';

export const verifyJwt = (_req: express.Request, _res : express.Response, next: express.NextFunction) => {
    const token = _req.headers['x-access-token'];

    if(!token){
        _res.send('token is required')
    }else{
        jwt.verify(token as string, process.env.JWT_TOKEN as string, (err, decoded) => {
            if(err){
                _res.json({
                    message: "Fail to log in", 
                    auth: false
                  })
            }else {
                console.log(decoded);
                // @ts-ignore
                _req.userId = decoded.id;
                next()
            }
        })
    }
}

