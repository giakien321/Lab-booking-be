import User from "../models/userModel.js";

export const getMe = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-__v");
        if (!user) return res.status(404).json({ message: "User not found" });

        res.status(200).json({
            message: "User profile retrieved successfully",
            user,
        });
    } catch (error) {
        res.status(500).json({ message: "Failed to get profile", error: error.message });
    }
};

export const getUsers = async (req, res) => {
    try {
        const users = await User.find().select("-__v");
        res.status(200).json({
            message: "User list fetched successfully",
            total: users.length,
            users,
        });
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch users", error: error.message });
    }
};

export const updateUserRole = async (req, res) => {
    try {
        const { role } = req.body;
        if (!role) return res.status(400).json({ message: "Role is required" });

        const user = await User.findByIdAndUpdate(req.params.id, { role }, { new: true });

        if (!user) return res.status(404).json({ message: "User not found" });

        res.status(200).json({
            message: "User role updated successfully",
            user,
        });
    } catch (error) {
        res.status(500).json({ message: "Failed to update user role", error: error.message });
    }
};
