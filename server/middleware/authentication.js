import jwt from 'jsonwebtoken';
export function isAuthenticated(req, res, next) {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).send('Access Denied: No Token Provided!');
    }
    try{
        const decoded = jwt.verify(token, "my-secret-key");
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(400).send('Invalid Token');
    }
}