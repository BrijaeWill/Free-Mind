import express from "express";
import Journal from "../models/journal.js";
import authMiddleware from "../middleware//authMiddleware.js";
const router = express.Router();

//Post journal entry
router.post("/",authMiddleware,async (req,res)=>{
    try{
        const {title,content} = req.body;
        const newJournal = new Journal({
            user:req.user.userId,
            title,
            content,
        });
        await newJournal.save();
        res.status(201).json(newJournal);
    }catch(error){
        res.status(500).json({message: "Server error",error});
    }
})

//get all journals for logged in user

router.get("/",authMiddleware,async (req,res)=>{
    try{
        const journals = await Journal.find({user:req.user.userId}).sort({createdAt:-1});
        res.json(journals);
    }catch(error){
        res.status(500).json({message:"Server error",error});
    }

});

//update Journals
router.put("/",authMiddleware, async (req,res)=>{
    try{
        const {title,content}=req.body;
        const updatedJournal = await Journal.findOneAndUpdate(
            {_id:req.params.id, user:req.user.userId},
            {title,content},
            {new:true}
        );
        if(!updatedJournal) return res.status(404).json({message: "Journal not found"});
        res,json(updatedJournal);
    }catch(error){
        res.status(500).json({message:"Server error",error});
    }
});

//delete journal
router.delete("/:id",authMiddleware, async (req,res)=>{
    try{
        const deletedJournal = await Journal.findOneAndDelete({
            _id: req.params.id,
            user:req.user.userId,
        });
        if(!deletedJournal) return res.status(404).json({message:"Journal not found"});
    }catch (error){
        res.status(500).json({message:"Server error",error});
    }
});

export default router;