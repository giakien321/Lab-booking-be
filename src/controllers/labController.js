import Lab from "../models/labModel.js";

export const getLabs = async (req, res) => {
    const labs = await Lab.find();
    res.status(200).json(labs);
};

export const createLab = async (req, res) => {
    const lab = await Lab.create(req.body);
    res.status(201).json(lab);
};

export const updateLab = async (req, res) => {
    const lab = await Lab.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(lab);
};

export const deleteLab = async (req, res) => {
    await Lab.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Lab deleted" });
};
