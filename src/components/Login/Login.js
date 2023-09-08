import React, { useState } from 'react'
import '../Register/register.css'
import { useDispatch } from 'react-redux';
import { checkPassword } from '../../store/slices/userSlice';
import { useNavigate } from 'react-router-dom';

export default function Login() {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setUsername] = useState('');
  const [password, setPassword]= useState('');

  const [errors, setErrors] = useState();

  function capitalize(str){
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  async function handleClick(){
    const response = await dispatch(checkPassword({email,password}));

    if(!response.payload){
      setErrors([{message:"User Does Not Exists!"}])
    }else if(typeof(response.payload)==="string"){
      localStorage.setItem('auth-token', response.payload)
      navigate('/')
    }else if(response.payload.errors){
      setErrors(response.payload.errors)
    }

    
  }

  let buttonDisabled=true;
  if(email.length<3 || password.length<5){
    buttonDisabled=true;
  }else{
    buttonDisabled=false;
  }

  return (
    <div className='form-page'>
      <h3 className='logo-single'>QuickShop</h3>
        <div className="form-box">

            <h3 className='form-head'>Sign in</h3>

            <div className="form-item">
                <label>Email</label>
                <input type="text"  className='form-input' value={email} onChange={(event)=>{setUsername(event.target.value)}}/>
            </div>

            <div className="form-item">
                <label>Password</label>
                <input type="password"  className='form-input' value={password} onChange={(event)=>{setPassword(event.target.value)}} />
            </div>

        <button className='btn btn-submit' disabled={buttonDisabled} onClick={handleClick}>Log In</button>
        
        {errors && 
            <div className="error-box">
                {errors.map((error,index)=>{
                    if(error.message){
                      return <p className='error-para'>{error.message}</p>
                    }
                    return <p className='error-para' key={index}>{capitalize(error.path)} has {error.msg}</p>
                })}
            </div>}

        </div>
    </div>
  )
}
