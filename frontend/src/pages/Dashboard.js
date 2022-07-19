import React,{useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import GoalForm from '../components/GoalForm';
import { getGoals } from '../features/goals/goalSlice';
import Spinner from '../components/Spinner';
import GoalItem from '../components/GoalItem';


export default function Dashboard() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user } = useSelector((state) => state.auth)
  const { goals, isLoading, isError, message } = useSelector(
    (state) => state.goals
  )

  useEffect(() => {
    if (isError) {
      console.log(message)
    }

    if (!user) {
      navigate('/login')
    }

    dispatch(getGoals())

    
  }, [user, navigate, isError, message, dispatch])

  if (isLoading) {
    return <Spinner />
  }


  return (
    <>
      <h1  className='text-center'>Welcome <span className='text-danger'>{user && user.name}</span></h1>
   

      <GoalForm />

      <h1 className='mt-4 fs-2 text-success'>My Goal</h1>
      <div className='row g-2'>
      {
          (goals.length > 0) ? (
            <>
              {
              goals.map((goal)=>(
         
                   <GoalItem goal={goal} key={goal._id} />
              ))
              }
            </>
          ) : (<h3>You have not set any goals</h3>)
        }
      </div>
    </>
  )
}
