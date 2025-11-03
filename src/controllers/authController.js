import jwt from "jsonwebtoken";
import { OAuth2Client } from "google-auth-library";
import User from "../models/userModel.js";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const generateTokens = (user) => {
    const payload = { id: user._id, email: user.email, role: user.role };
    const accessToken = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });
    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, { expiresIn: "7d" });
    return { accessToken, refreshToken };
};

export const googleLogin = async (req, res) => {
    try {
        const { token } = req.body;
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.GOOGLE_CLIENT_ID,
        });
        const { sub, name, email, picture } = ticket.getPayload();

        let user = await User.findOne({ email });
        if (!user) {
            const role = email.includes("fpt.edu.vn") ? "student" : "admin";
            user = await User.create({ googleId: sub, name, email, picture, role });
        }

        const { accessToken, refreshToken } = generateTokens(user);
        res.status(200).json({ message: "Login successful", user, accessToken, refreshToken });
    } catch (error) {
        res.status(400).json({ message: "Google login failed", error });
    }
};

export const refreshToken = (req, res) => {
    const { token } = req.body;
    if (!token) return res.status(401).json({ message: "Missing refresh token" });

    jwt.verify(token, process.env.JWT_REFRESH_SECRET, (err, user) => {
        if (err) return res.status(403).json({ message: "Invalid refresh token" });
        const accessToken = jwt.sign(
            { id: user.id, email: user.email, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );
        res.status(200).json({ accessToken });
    });
};
