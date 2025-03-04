import jwt from "jsonwebtoken";
import dotenv from "dotenv";
const authMiddleware = (req, res, next) => {
  const token = req.headers.token.split(" ")[1];
  console.log("token", req.headers.token);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      res.status(403).json("token is not valid");
    }
    console.log("user", user);

    if (user.isAdmin) {
      next();
    } else {
      res.status(403).json("you are not admin");
    }
  });
};
const authUserMiddleware = (req, res, next) => {
  const token = req.headers.token?.split(" ")[1];
  const userId = req.params.id;
  if (!token) {
    return res.status(401).json("You are not authenticated!");
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      res.status(403).json("token is not valid");
    }
    console.log("user", user);

    if (user.isAdmin || user.id === userId) {
      next();
    } else {
      res.status(403).json("you can see detail user only");
    }
  });
};
export { authMiddleware, authUserMiddleware };
