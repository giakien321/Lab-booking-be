import Lab from "../models/labModel.js";

export const getLabs = async (req, res) => {
  try {
    const labs = await Lab.find().select("-__v");
    res.status(200).json(labs);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch labs", error });
  }
};

export const getLabById = async (req, res) => {
  try {
    const lab = await Lab.findById(req.params.id);
    if (!lab) return res.status(404).json({ message: "Lab not found" });
    res.status(200).json(lab);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch lab", error });
  }
};

export const createLab = async (req, res) => {
  try {
    const lab = await Lab.create(req.body);
    res.status(201).json(lab);
  } catch (error) {
    res.status(400).json({ message: "Failed to create lab", error });
  }
};

export const updateLab = async (req, res) => {
  try {
    const updated = await Lab.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: "Lab not found" });
    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ message: "Failed to update lab", error });
  }
};

export const deleteLab = async (req, res) => {
  try {
    const deleted = await Lab.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Lab not found" });
    res.status(200).json({ message: "Lab deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete lab", error });
  }
};
