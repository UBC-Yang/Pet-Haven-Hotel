import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations'; // Import your login mutation
import { useAuth } from '../context/AuthContext'; // Import the AuthContext
import AuthService from '../utils/auth'; // Ensure AuthService is imported for managing tokens

const Login = () => {
  const { login } = useAuth(); // Get login function from AuthContext
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [loginUser, { error }] = useMutation(LOGIN_USER); // Setup login mutation

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await loginUser({
        variables: { email: formState.email, password: formState.password },
      });

      // Assuming the response includes a token and user data
      const { token, user } = data.login;

      // Store user and token in AuthContext
      AuthService.login(token); // Save token to localStorage
      login(token); // Use the AuthContext's login method

      console.log("Login successful", data);
    } catch (e) {
      console.error("Login failed", e);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col space-y-4 p-4 border rounded shadow-md">
      <div>
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={formState.email}
          onChange={handleChange}
          className="border rounded p-2 w-full"
        />
      </div>
      <div>
        <label>Password:</label>
        <div className="relative">
          <input
            type={showPassword ? 'text' : 'password'}
            name="password"
            value={formState.password}
            onChange={handleChange}
            className="border rounded p-2 w-full"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
          >
            {showPassword ? 'Hide' : 'Show'}
          </button>
        </div>
      </div>
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
        Login
      </button>
      {error && <p className="text-red-500">{error.message}</p>} {/* Display error message */}
    </form>
  );
};

export default Login;