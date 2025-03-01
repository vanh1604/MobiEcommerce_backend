import validator from "validator";
import userModel from "../models/UserModel.js";
import bcrypt from "bcrypt";
import {
  generalAccessToken,
  generalRefreshToken,
} from "../services/JwtService.js";
const createUser = async (req, res) => {
  try {
    const { name, email, password, phone, confirmPassword } = req.body;
    console.log(name);

    if (!name || !email || !password || !phone) {
      return res
        .status(400)
        .json({ message: "Vui long nhap day du thong tin" });
    } else if (!validator.isEmail(email)) {
      return res.status(400).json({ message: "Email khong dung chinh xac" });
    } else if (!validator.equals(password, confirmPassword)) {
      return res.status(400).json({ message: "Mat khau khong khop" });
    }
    const exists = await userModel.findOne({ email });
    if (exists) {
      return res.status(400).json({
        message: "Tai khoan da ton tai, vui long dang ky tai khoan khac",
      });
    }

    //validating email format & strong password
    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: "please enter valid email" });
    }
    //check password length
    if (password.length < 8) {
      return res.status(400).json({
        message: "password must be at least 8 characters",
      });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new userModel({
      name,
      email,
      password: hashedPassword,
      phone,
      confirmPassword,
    });
    const user = await newUser.save();
    return res
      .status(201)
      .json({ message: "User registered successfully", user });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const accessToken = await generalAccessToken({
      id: user._id,
      isAdmin: user.isAdmin,
    });
    const refreshToken = await generalRefreshToken({
      id: user._id,
      isAdmin: user.isAdmin,
    });

    return res
      .status(200)
      .json({ message: "Login successful", accessToken, refreshToken });
  } catch (error) {
    console.log(error);

    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const updateUser = async (req, res) => {
  try {
    // Lấy userId từ params
    const { id: userId } = req.params;
    console.log("User ID from params:", userId); // Debug

    // Lấy dữ liệu từ body
    const data = req.body;
    console.log("Request body:", data); // Debug dữ liệu gửi lên

    // Kiểm tra userId
    if (!userId) {
      return res.status(400).json({ message: "User id is required" });
    }

    // Tìm user
    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Cập nhật user
    const updatedUser = await userModel.findByIdAndUpdate(userId, data, {
      new: true, // Trả về tài liệu đã cập nhật
      runValidators: true, // Đảm bảo schema validation (tùy chọn)
    });
    console.log("Updated user:", updatedUser); // Debug kết quả

    return res
      .status(200)
      .json({ message: "User updated successfully", user: updatedUser });
  } catch (error) {
    console.error("Error updating user:", error); // Log lỗi chi tiết
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};
export { createUser, loginUser, updateUser };
