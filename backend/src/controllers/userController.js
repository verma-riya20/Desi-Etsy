import { User } from "../models/user.js";
import jwt from 'jsonwebtoken';

// Generate Access and Refresh Token
const generateaccesandrefreshtoken = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new Error("Something went wrong while generating tokens.");
  }
};

// Register User
const registerUser = async (req, res) => {
  try {
    const { fullname, email, password } = req.body;

    if ([fullname, email, password].some(field => field?.trim() === "")) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ success: false, message: "User already exists" });
    }

    const user = await User.create({ fullname, email, password });
    const createdUser = await User.findById(user._id).select("-password -refreshToken");

    if (!createdUser) {
      return res.status(500).json({ success: false, message: "User not created" });
    }

    return res.status(201).json({
      success: true,
      message: "User created successfully",
      data: createdUser
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error?.message || "Registration failed" });
  }
};

// Login User
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: "Email and Password are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const isPasswordValid = await user.isPasswordCorrect(password);
    if (!isPasswordValid) {
      return res.status(401).json({ success: false, message: "Invalid email or password" });
    }

    const { accessToken, refreshToken } = await generateaccesandrefreshtoken(user._id);
    const loggedInUser = await User.findById(user._id).select("-password -refreshToken");

    const options = { httpOnly: true, secure: true };

    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken)
      .json({
        success: true,
        message: "User logged in",
        data: { user: loggedInUser, accessToken, refreshToken }
      });
  } catch (error) {
    return res.status(500).json({ success: false, message: error?.message || "Login failed" });
  }
};

// Logout User
const logoutUser = async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.user._id, {
      $set: { refreshToken: undefined }
    }, { new: true });

    const options = { httpOnly: true, secure: true };

    return res
      .status(200)
      .clearCookie("accessToken", options)
      .clearCookie("refreshToken", options)
      .json({ success: true, message: "User logged out" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error?.message || "Logout failed" });
  }
};

// Refresh Access Token
const refreshAccessToken = async (req, res) => {
  const incomingRefreshToken = req.cookies?.refreshToken || req.body.refreshToken;

  if (!incomingRefreshToken) {
    return res.status(401).json({ success: false, message: "Unauthorized access" });
  }

  try {
    const decodedToken = jwt.verify(incomingRefreshToken, process.env.REFRESH_TOKEN_SECRET);
    const user = await User.findById(decodedToken._id);

    if (!user) {
      return res.status(401).json({ success: false, message: "Invalid refresh token" });
    }

    if (incomingRefreshToken !== user?.refreshToken) {
      return res.status(401).json({ success: false, message: "Refresh token is expired or invalid" });
    }

    const { accessToken, refreshToken: newRefreshToken } = await generateaccesandrefreshtoken(user._id);
    const options = { httpOnly: true, secure: true };

    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", newRefreshToken)
      .json({
        success: true,
        message: "Access token refreshed",
        data: { accessToken, refreshToken: newRefreshToken }
      });
  } catch (error) {
    return res.status(401).json({ success: false, message: error?.message || "Invalid refresh token" });
  }
};

export { registerUser, loginUser, logoutUser, refreshAccessToken };
