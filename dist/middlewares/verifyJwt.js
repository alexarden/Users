import jwt from 'jsonwebtoken';
export const verifyJwt = (_req, _res, next) => {
    const token = _req.headers['x-access-token'];
    if (!token) {
        _res.send('token is required');
    }
    else {
        jwt.verify(token, process.env.JWT_TOKEN, (err, decoded) => {
            if (err) {
                _res.json({
                    message: "Fail to log in",
                    auth: false
                });
            }
            else {
                console.log(decoded);
                // @ts-ignore
                _req.userId = decoded.id;
                next();
            }
        });
    }
};
