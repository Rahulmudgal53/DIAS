import React, { useState } from 'react';
import './AuthForm.css';

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    role: 'author', // Default role
  });
  const [isLogin, setLogin] = useState(true);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleLogin = () => {
    // Handle login logic here
    console.log("Login:", formData);
  };

  const handleSignUp = () => {
    // Handle sign-up logic here
    console.log("Sign Up:", formData);
    fetch('http://localhost:5000/api/auth/register',{
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify(formData)
    })
    .then((res)=>res.json())
    .then((son)=>{
      console.log(son)
    })
    .catch((err)=>{
      console.log("Signup post error: ",err)
    })
  };

  return (
    <div className="container">
      <div className="form-container">
        <div className="form-toggle">
          <button className={isLogin ? 'active' : ''} onClick={() => setLogin(true)}>Login</button>
          <button className={!isLogin ? 'active' : ''} onClick={() => setLogin(false)}>Sign Up</button>
        </div>

        {isLogin ? (
          <div className="form">
            <input
              type="email"
              placeholder='Email'
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            <input
              type="password"
              placeholder='Password'
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
            <a href="#">Forgot password?</a>
            <button onClick={handleLogin}>Login</button>
            <p>Not a Member? <a href="#" onClick={() => setLogin(false)}>Sign Up now</a></p>
          </div>
        ) : (
          <div className="form">
            <input
              type="text"
              placeholder='Username'
              name="username"
              value={formData.username}
              onChange={handleChange}
            />
            <input
              type="email"
              placeholder='Email'
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            <input
              type="password"
              placeholder='Password'
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
            <div className="role-selection">
              <label>
                <input
                  type="radio"
                  value="author"
                  name="role"
                  checked={formData.role === 'author'}
                  onChange={handleChange}
                />
                Author
              </label>
              <label>
                <input
                  type="radio"
                  value="reader"
                  name="role"
                  checked={formData.role === 'reader'}
                  onChange={handleChange}
                />
                Reader
              </label>
            </div>
            <button onClick={handleSignUp}>Sign Up</button>
            <p>Already have an account? <a href="#" onClick={() => setLogin(true)}>Login here</a></p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
