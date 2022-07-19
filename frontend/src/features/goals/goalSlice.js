import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import goalService from "./goalService";

const initialState = {
    goals: [],
    isErrror: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

const namespace = "goal";

export const createGoal = createAsyncThunk(`${namespace}/createGoal`, async(goalData,thunkAPI)=>{
    try {
        const token = thunkAPI.getState().auth.user.token;
        
        return await goalService.createGoal(goalData,token);
    } catch (error) {
        console.log(error)
        return thunkAPI.rejectWithValue(error);
    }
});

export const deleteGoal = createAsyncThunk(`${namespace}/deleteGoal`, async (id, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await goalService.deleteGoal(id, token)
    } catch (error) {
        const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
});


// get user goals

// Get user goals
export const getGoals = createAsyncThunk(
    `${namespace}/getGoals`,
    async (_, thunkAPI) => {
      try {
        const token = thunkAPI.getState().auth.user.token
        
        return await goalService.getGoals(token)
      } catch (error) {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString()
        return thunkAPI.rejectWithValue(message)
      }
    }
);


  

export const goalSlice = createSlice({
    name: namespace,
    initialState,
    reducers: {
        reset: (state,action)=> {
            state.goals= [];
            state.isErrror= false;
            state.isSuccess= false;
            state.isLoading= false;
            state.message= ''
        },
     
    },
    extraReducers: (builder)=>{
        builder 
            .addCase(createGoal.pending,(state,action)=>{
                state.isLoading = true;
            })
            .addCase(createGoal.fulfilled,(state,action)=>{
                state.isLoading = false;
                state.isSuccess = true;
                state.goals.push(action.payload)
            })
            .addCase(createGoal.rejected,(state,action)=>{
                state.isLoading = false;
                state.isErrror = true;
                state.isSuccess = false;
                state.message = action.payload
            })
        builder.addCase(getGoals.pending,(state,action)=>{
                state.isLoading = true;
            })
            .addCase(getGoals.fulfilled,(state,action)=>{
                state.isLoading = false;
                state.isSuccess = true;
                state.goals = action.payload
            })
            .addCase(getGoals.rejected,(state,action)=>{
                state.isLoading = false;
                state.isErrror = true;
                state.isSuccess = false;
                state.message = action.payload
            });
        builder.addCase(deleteGoal.pending,(state,action)=>{
                state.isLoading = true;
            })
            .addCase(deleteGoal.fulfilled,(state,action)=>{
                state.isLoading = false;
                state.isSuccess = true;
                state.goals = state.goals.filter((goal)=> goal._id !== action.payload.id)
            })
            .addCase(deleteGoal.rejected,(state,action)=>{
                state.isLoading = false;
                state.isErrror = true;
                state.isSuccess = false;
                state.message = action.payload
            });
    }
});

export const {reset} = goalSlice.actions;
export default goalSlice.reducer;