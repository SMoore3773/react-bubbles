import React, {useState} from "react";
import {axiosWithAuth} from '../utils/axiosWithAuth';
import {useHistory} from 'react-router-dom';


const Login = (props) => {
  const [loginCreds, setLoginCreds] = useState({credentials:{username:'', password:''}})
  const history = useHistory();
console.log(history)

  const handleChanges = e =>{
    setLoginCreds({
      credentials:{...loginCreds.credentials,
        [e.target.name]:e.target.value
      }
    })
  };
console.log(loginCreds)
  const login = e =>{
    e.preventDefault();
    axiosWithAuth()
    .post('http://localhost:5000/api.login',loginCreds)
    .then(res=>{
      console.log('login success in login.js axios post', res)
      localStorage.setItem('token', res.data.payload);
      history.push('/bubble-page')
    })
    .catch(err => console.log('error in login : ',err))
  }

  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  return (
    <>
      <h1>Welcome to the Bubble App!</h1>
      <p>Build a login page here</p>
      <form className='loginForm' onSubmit={login}>
                    <input
                    type='text'
                    name='username'
                    value={loginCreds.credentials.username}
                    onChange={handleChanges}
                    placeholder='Username'
                    className='loginField'
                    />
                    <input
                    type='text'
                    name='password'
                    value={loginCreds.credentials.password}
                    onChange={handleChanges}
                    placeholder='Password'
                    className='loginField'
                    />
                <button className='loginButton'> Login </button>
                </form>
    </>
  );
};

export default Login;
