import React, { useState } from 'react';

const Signup = () => {
  const [formState, setFormState] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState({
      ...formState,
      [name]: value,
    });
    // Clear error when user types
    if (name === 'confirmPassword') {
      setError('');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Check if passwords match
    if (formState.password !== formState.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    // Handle signup logic (e.g., API call)
    console.log("Form submitted", formState);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
      <div>
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={formState.name}
          onChange={handleChange}
          className="border rounded p-2 w-full"
        />
      </div>
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
      <div>
        <label>Confirm Password:</label>
        <div className="relative">
          <input
            type={showConfirmPassword ? 'text' : 'password'}
            name="confirmPassword"
            value={formState.confirmPassword}
            onChange={handleChange}
            className="border rounded p-2 w-full"
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
          >
            {showConfirmPassword ? 'Hide' : 'Show'}
          </button>
        </div>
        {error && <p className="text-red-500">{error}</p>} {/* Error message */}
      </div>
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
        Sign Up
      </button>
    </form>
  );
};

export default Signup;