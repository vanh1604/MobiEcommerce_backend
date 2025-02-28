import mongoose from "mongoose";
import dotenv from "dotenv";
const connectDB = async () => {
  mongoose.connection.on("connected", () => {
    console.log("Database connected");
  });
  await mongoose.connect(`mongodb+srv://vietanhscout:vanh1604@cluster0.arqkh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`);
};
export default connectDB;
