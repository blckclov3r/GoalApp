import React from 'react'
import { useDispatch } from 'react-redux'
import { deleteGoal } from '../features/goals/goalSlice';
export default function GoalItem({goal}) {
const dispatch = useDispatch();

  return (
    <div className='col-12 col-md-3'>
        <div className='bg-white p-4 shadow-sm'>

            <div className='d-flex justify-content-between align-items-baseline'>
            <h4 className='my-0'>{goal.text}</h4>
            <button className='btn btn-warning' onClick={()=>dispatch(deleteGoal(goal._id))}>x</button>
            </div>
            {new Date(goal.createdAt).toLocaleString('en-US')}
        </div>
    </div>
  )
}
