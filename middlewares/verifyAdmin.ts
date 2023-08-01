import express from "express";

export const verifyAdmin = (_req: express.Request, _res : express.Response, next: express.NextFunction) => {
    
    const role = _req.body.role 

    if(!role){
        _res.send('role is required')
    }else{
        if(role !== 'admin'){
            _res.status(401).json({'message': 'You are not allowed'})
            return
        }else{
            next()
        }
    }
}
