const asyncHandler = require('express-async-handler')

const getGoals = asyncHandler(async (req,res)=>{
    res.status(200).json({message: 'Get goals'});
})

const getGoalsId = asyncHandler(async (req,res)=>{
    res.status(200).json({message: `getSingleGoals ${req.params.id}`})
})

const setGoal = asyncHandler(async(req,res)=>{
    if(!req.body.text){
        res.status(400)
        throw new Error('Please add a text field')
    }
    res.status(200).json({message: 'setGoals'})
})

const updateGoal = asyncHandler(async(req,res)=>{
    res.status(200).json({message: `updateGoals ${req.params.id}`})
})

const deleteGoal = asyncHandler(async(req,res)=>{
    res.status(200).json({message: `deleteGoals ${req.params.id}`})
})

module.exports = {
    getGoals,
    getGoalsId,
    setGoal,
    updateGoal,
    deleteGoal
}