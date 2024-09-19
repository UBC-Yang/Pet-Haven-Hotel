import React, { useState } from 'react';
import Login from '../components/Login';
import Signup from '../components/SignUp';

const Registration = () => {
  const [isLogin, setIsLogin] = useState(true);

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div>
      <h2>{isLogin ? 'Login' : 'Sign Up'}</h2>
      {isLogin ? <Login /> : <Signup />}
      <button onClick={toggleForm}>
        {isLogin ? 'Switch to Sign Up' : 'Switch to Login'}
      </button>
    </div>
  );
};

export default Registration;
