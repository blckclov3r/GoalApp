import axios from "axios";

const API_URL = "/api/goals";

// create goals
const createGoal = async (goalsData, token) =>{
    const config ={
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.post(API_URL,goalsData,config)
    // if(response.data){
    //     localStorage.setItem('goals',JSON.stringify(response?.data))
    // }
    return response?.data;
}

// get goals
// Get user goals
const getGoals = async (token) => {
    console.log('getGoals invoked')
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    const response = await axios.get(API_URL, config)
    return response.data
  }
  
// Delete user goal
const deleteGoal = async (goalId, token) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  
    const response = await axios.delete(API_URL + `/${goalId}`, config)
  
    return response.data
  }

const goalService = {
    createGoal,
    getGoals,
    deleteGoal
}

export default goalService;