import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/mongodb.js";
import userRouter from "./routes/userRoute.js";
const app = express();
import "dotenv/config";

const port = process.env.PORT || 5000;
app.get("/", (req, res) => {
    res.send("Hello World!");
})
app.use(express.json());
app.use('/api/user', userRouter);
connectDB();
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

