import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState={
    userInfo:[],
    status:'idle',
    error:null,
    loggedIn:false
}

const URL = "http://localhost:5000/auth/";

export const fetchUser=createAsyncThunk("users/fetchUser", async ({username,email,password})=>{
    try{
        const response= await fetch(`${URL}/register`, {
            method:'POST',
            headers:{
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin' : '*',
                'Access-Control-Allow-Credentials': 'true'
            },
            body:JSON.stringify({username,email,password})
        });

        const data = await response.json();
        return await data;

    }catch(error){
        console.log(error)
    }
});

export const checkPassword = createAsyncThunk('users/checkPassword', async({email, password})=>{
    try {
        const response = await fetch(`${URL}/login`, {
            method:'POST',
            headers:{
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin' : '*',
                'Access-Control-Allow-Credentials': 'true'
            },
            body:JSON.stringify({email,password})
        });

        const data= await response.json();
        return await data;

    } catch (error) {
        console.log(error)
    }
});

export const getUser = createAsyncThunk('users/getUser', async(authToken)=>{
    try {
        const response = await fetch(`${URL}/getUser`,{
            method:'POST',
            headers:{
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin' : '*',
                'Access-Control-Allow-Credentials': 'true',
                'auth-token': authToken
            }
        });

        const data = await response.json();
        return  data;
    } catch (error) {
        return (error)
    }
})

export const getUserById = createAsyncThunk('/users/getUserById', async(userId)=>{
    try {
        const response = await fetch(`${URL}/getUserById/${userId}`,{
            method:'POST',
            headers:{
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin' : '*',
                'Access-Control-Allow-Credentials': 'true',
            }
        });

        const data = await response.json();
        return  data;
    } catch (error) {
        return (error)
    }
})


const userSlice = createSlice({
    name:'users',
    initialState,
    reducers:{

    },
    extraReducers:(builder)=>{
        builder
        .addCase(fetchUser.fulfilled, (state,action)=>{
            state.userInfo= action.payload;
            if(state.userInfo){
                localStorage.setItem('auth-token',state.userInfo)
            }
        })

        .addCase(checkPassword.fulfilled, (state, action)=>{
            state.loggedIn= true;
        })

        .addCase(getUser.pending, (state, action)=>{
            state.status='loading';
        })

        .addCase(getUser.fulfilled, (state, action)=>{
            state.userInfo= action.payload;
            state.status ='fullfilled'
        })

        .addCase(getUserById.fulfilled, (state, action)=>{
            return action.payload;
        })
    }

});

export const currentUser = (state)=>state.users.userInfo;
export const userStatus = (state) => state.users.status;
 
export default userSlice.reducer;
