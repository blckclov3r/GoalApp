const asyncHandler = require('express-async-handler')

const Goal = require('./../model/goalModel');
const User = require('./../model/userModel')

const getGoals = asyncHandler(async (req,res)=>{
   
    const goals = await Goal.find({id: req.user._id})
 
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
    
    const goal = await Goal.create({
        text: req.body.text,
        user: req.user._id
    })
    res.status(200).json(goal)
})

const updateGoal = asyncHandler(async(req,res)=>{
    const {id} = req.params;
 
    const goal = await Goal.findById(id);
    if(!goal){
        res.status(400)
        throw new Error('Goal not found');
    }
    
    const user = await User.findById(req.user._id);
    // check for user is exists
    if(!user){
        res.status(401)
        throw new Error('User not found')
    }

    // make sure the login user matches the goal user
    if(goal.user.toString() !== user.id){
        res.status(401)
        throw new Error('User not authorized')
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
 
    const user = await User.findById(req.user._id);

    // check for user is exists
    if(!user){
        res.status(401)
        throw new Error('User not found')
    }
 
    // make sure the login user matches the goal user
    if(goal.user.toString() !== user.id){
        res.status(401)
        throw new Error('User not authorized')
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