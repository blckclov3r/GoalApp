import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import authService from './authService';

// get user from localstorage
const user = JSON.parse(localStorage.getItem('user'));

const namespace = 'auth';

const initialState = {
    user: user ? user : null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

// register user
export const register = createAsyncThunk(`${namespace}/register`,async(user,thunkAPI)=>{
    try {
        return await authService.register(user)
    } catch (error) {
        // const message = (error.response && error.response.data 
        //     && error.response.data.message) || error.message || error.toString()

        return thunkAPI.rejectWithValue(error)


    }
});

// login user
export const login = createAsyncThunk(`${namespace}/login`,async(user,thunkAPI)=>{
    try {
        return await authService.login(user)
    } catch (error) {
        // const message = (error.response && error.response.data 
        //     && error.response.data.message) || error.message || error.toString()

        return thunkAPI.rejectWithValue(error)


    }
});

export const logout = createAsyncThunk(`${namespace}/logout`,async()=>{
    await authService.logout()
})

export const authSlice = createSlice({
    name: namespace,
    initialState,
    reducers: {
        reset: (state)=>{
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = false;
            state.message = '';
        },
    },
    extraReducers: (builder)=>{
        builder
            .addCase(register.pending,(state,action)=>{
                state.isLoading = true
            })
            .addCase(register.fulfilled,(state,action)=>{
                state.isLoading = false;
                state.isSuccess = true;
                state.user = action.payload
            })
            .addCase(register.rejected,(state,action)=>{
                state.isLoading = false
                state.isError = true
                state.message = action.payload
                state.user = null
            })
      
            .addCase(logout.fulfilled,(state,action)=>{
                state.user = null
            });
          
            // login
            builder.addCase(login.pending,(state,action)=>{
                state.isLoading = true
            })
            .addCase(login.fulfilled,(state,action)=>{
                state.isLoading = false;
                state.isSuccess = true;
                state.user = action.payload
            })
            .addCase(login.rejected,(state,action)=>{
                state.isLoading = false
                state.isError = true
                state.message = action.payload
                state.user = null
            })
    }
});

export const {reset} = authSlice.actions;


export default authSlice.reducer;