import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;

    //token format: "Bearer <token>"
    if (!authHeader || !authHeader.startsWith("Bearer")) {
        return res.status(401).json({message:"unauthorized: no token provided"})

    }

    const token = authHeader.split(" ")[1];
    try {
        const decoded = jwt.verify(token, process.env.SECRET_ACCESS_TOKEN);
        req.user = decoded;
        next();
    }catch (error) {
        res.status(403).json({message:"Forbidden: Invalid token"});
    }


}

export default verifyToken;