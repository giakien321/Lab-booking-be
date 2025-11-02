import Lab from "../models/labModel.js";

export const getLabs = async (req,res) =>{
    try {
        const labs = await Lab.find();
        res.status(200).json(labs);
    } catch (error) {
        res.status(500).json({message: error.message});
        
    }
};

export const createLab = async (req,res) =>{
    try {
        const {name, location, capacity} =  req.body;

        if(!name || !location || !capacity){
            return res.status(400).json({message: "All fields are required"});
        }
        const newLab = new Lab({name, location, capacity});
        await newLab.save();
        res.status(201).json(newLab);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

export const updateLab = async(req,res) =>{
    try {
        const {id} = req.params;
        const updateLab = await Lab.findByIdAndUpdate(id, req.body,{new:true});
        if(!updateLab){
            return res.status(404).json({message:""})
        };
        res.status(200).json(updateLab);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

export const deleteLab = async (req,res)=>{
    try {
        const{id} = req.params;
        const deleteLab = await Lab.findByIdAndDelete(id);
        if(!deleteLab){
            return res.status(404).json({message:"Lab not found"});
        };
        res.status(200).json({message:"Lab deleted successfully"});
    } catch (error) {
        res.status(500).json({message:error.message});
    }
};