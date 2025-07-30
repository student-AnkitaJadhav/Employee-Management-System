const jwt = require("jsonwebtoken");
require("dotenv").config();


// Middleware to authenticate token
const authenticateToken = (req, res, next) => {
    console.log("Incoming Headers:", req.headers);
    const authHeader = req.headers.authorization;

    // Format: "Bearer <token>"
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Access Denied: No token provided" });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); 
        req.user = decoded;
        console.log(" Verified User:", req.user);
        next();
    } catch (err) {
        res.status(403).json({ message: "Invalid token" });
    }
};

module.exports = authenticateToken;
