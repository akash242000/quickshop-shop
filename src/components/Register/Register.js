import React, { useEffect, useState } from 'react'
import {useDispatch} from 'react-redux'
import './register.css'
import {fetchUser} from '../../store/slices/userSlice';
import { useNavigate } from 'react-router-dom';

export default function Register() {

    const dispatch =useDispatch();
    const navigate = useNavigate();

    const [username, setUsername]= useState('');
    const [email, setEmail]= useState('');
    const [password, setPassword]= useState('');

    const [errors, setErrors] = useState();

    let errorContainer;


    async function handleClick(){

        const response= await dispatch(fetchUser({username,email,password}));
        if(response.payload.errors){
            setErrors(response.payload.errors)
        }else{
            navigate('/');
        }
    }

    function capitalize(str){
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    let buttonDisable=false;
    if(username.length<3 || email.length<5 || password.length<5){
        buttonDisable=true;
    }else{
        buttonDisable=false;
    }

    

  return (
    <div className='form-page'>

        <h3 className='logo-single'>QuickShop</h3>
        <div className="form-box">

            <h3 className='form-head'>Create Account</h3>

            <div className="form-item">
                <label>Name</label>
                <input type="text" className='form-input' value={username} onChange={(event)=>{setUsername(event.target.value)}} />
            </div>

            <div className="form-item">
                <label>Email</label>
                <input type="text"  className='form-input' value={email} onChange={(event)=>{setEmail(event.target.value)}} />
            </div>

            <div className="form-item">
                <label>Password</label>
                <input type='password'  className='form-input' value={password} onChange={(event)=>{setPassword(event.target.value)}} />
            </div>

        <button className='btn btn-submit' disabled={buttonDisable} onClick={handleClick}>Submit</button>

        {errors && 
            <div className="error-box">
                {errors.map((error,index)=>{
                    return <p className='error-para' key={index}>{capitalize(error.path)} has {error.msg}</p>
                })}
            </div>}

        </div>
    </div>
  )
}