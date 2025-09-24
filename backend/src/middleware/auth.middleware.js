import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;

    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized - No token provided" });
    }

    // Check if JWT_SECRET_KEY is available
    if (!process.env.JWT_SECRET_KEY) {
      console.error(
        "❌ JWT_SECRET_KEY is not defined in environment variables"
      );
      return res.status(500).json({ message: "Server configuration error" });
    }

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    } catch (jwtError) {
      console.log("JWT verification error:", jwtError.message);

      if (jwtError.name === "TokenExpiredError") {
        return res
          .status(401)
          .json({ message: "Unauthorized - Token expired" });
      } else if (jwtError.name === "JsonWebTokenError") {
        return res
          .status(401)
          .json({ message: "Unauthorized - Invalid token format" });
      } else if (jwtError.name === "NotBeforeError") {
        return res
          .status(401)
          .json({ message: "Unauthorized - Token not active yet" });
      } else {
        return res
          .status(401)
          .json({ message: "Unauthorized - Token verification failed" });
      }
    }

    if (!decoded || !decoded.userId) {
      return res
        .status(401)
        .json({ message: "Unauthorized - Invalid token payload" });
    }

    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      return res.status(401).json({ message: "Unauthorized - User not found" });
    }

    req.user = user;

    next();
  } catch (error) {
    console.log("Error in protectRoute middleware", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
