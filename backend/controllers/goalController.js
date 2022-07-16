const asyncHandler = require('express-async-handler')

const Goal = require('./../model/goalModel')

const getGoals = asyncHandler(async (req,res)=>{
    const goals = await Goal.find()
    res.status(200).json(goals);
})

const getGoalsId = asyncHandler(async (req,res)=>{
    res.status(200).json({message: `getSingleGoals ${req.params.id}`})
})

const setGoal = asyncHandler(async(req,res)=>{
    if(!req.body.text){
        res.status(400)
        throw new Error('Please add a text field')
    }
    const {text} = req.body;
    const goal = await Goal.create({text})
    res.status(200).json(goal)
})

const updateGoal = asyncHandler(async(req,res)=>{
    const {id} = req.params;
 
    const goal = await Goal.findById(id);
    if(!goal){
        res.status(400)
        throw new Error('Goal not found');
    }
    
    console.log({...req.body})
    const updatedGoal  = await Goal.findByIdAndUpdate(id,{...req.body},{new: true});

    res.status(200).json(updatedGoal)
})

const deleteGoal = asyncHandler(async(req,res)=>{

    const {id} = req.params;
    const goal = await Goal.findById(id);

    if(!goal){
        res.status(400)
        throw new Error('Goal not found');
    }

    await goal.remove();

    res.status(200).json({_id: id})
})

module.exports = {
    getGoals,
    getGoalsId,
    setGoal,
    updateGoal,
    deleteGoal
}