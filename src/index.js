import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/mongodb.js";
import userRouter from "./routes/userRoute.js";
const app = express();
import "dotenv/config";
import productRoute from "./routes/ProductRoute.js";

const port = process.env.PORT || 5000;
app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.use(express.json());
app.use("/api/user", userRouter);
app.use("/api/product", productRoute);
connectDB();
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
