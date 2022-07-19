import React,{useState} from 'react';
import { useDispatch } from 'react-redux';
import { createGoal } from '../features/goals/goalSlice';

const GoalForm = () => {

    const [text,setText] = useState('');

    const dispatch = useDispatch();

    const onGoalSubmit = (e) =>{
        e.preventDefault();
        if(text === ''){
            return;
        }
        dispatch(createGoal({text}))
        setText('')
    }

    return (
       
            <div className='w-100 mx-auto'>
            <form onSubmit={onGoalSubmit}>
                <div className='form-group mb-3'>
                    {/* <label className='form-label'>Goal</label> */}
                    <input type='text' placeholder='goal' className='form-control' value={text} onChange={(e)=>{setText(e.target.value)}} />
                </div>
                <div className='form-group'>
                   <button className='btn btn-primary w-100'>Add Goal</button>
                </div>
            </form>
        </div>
    );
}

export default GoalForm;
