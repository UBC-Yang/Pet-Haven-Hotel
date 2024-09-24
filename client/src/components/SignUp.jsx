import React, { useState } from 'react';

const Signup = () => {
  const [formState, setFormState] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    pets: [{ name: '', gender: '', age: '', breed: '', notes: '' }] // New state for pets
  });
  
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState({ ...formState, [name]: value });
  };

  const handlePetChange = (index, e) => {
    const { name, value } = e.target;
    const updatedPets = [...formState.pets];
    updatedPets[index][name] = value;
    setFormState({ ...formState, pets: updatedPets });
  };

  const addPet = () => {
    setFormState({
      ...formState,
      pets: [...formState.pets, { name: '', gender: '', age: '', breed: '', notes: '' }]
    });
  };

  const removePet = (index) => {
    const updatedPets = formState.pets.filter((_, i) => i !== index);
    setFormState({ ...formState, pets: updatedPets });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Check if all fields are filled (owner and pets)
    const { firstName, lastName, username, email, password, confirmPassword, pets } = formState;
    if (!firstName || !lastName || !username || !email || !password || !confirmPassword || pets.some(pet => !pet.name || !pet.gender || !pet.age || !pet.breed || !pet.notes)) {
      setError("All fields are required.");
      return;
    }

    // Other validations...
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    console.log("Form submitted", formState);
    // Call your signup mutation here...
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
      <h2 className="text-lg font-bold">Sign Up</h2>
      {error && <p className="text-red-500">{error}</p>}
      <div>
        <label>First Name:</label>
        <input
          type="text"
          name="firstName"
          value={formState.firstName}
          onChange={handleChange}
          className="border rounded p-2 w-full"
          required
        />
      </div>
      <div>
        <label>Last Name:</label>
        <input
          type="text"
          name="lastName"
          value={formState.lastName}
          onChange={handleChange}
          className="border rounded p-2 w-full"
          required
        />
      </div>
      <div>
        <label>Username:</label>
        <input
          type="text"
          name="username"
          value={formState.username}
          onChange={handleChange}
          className="border rounded p-2 w-full"
          required
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
          required
        />
      </div>
      <div>
        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={formState.password}
          onChange={handleChange}
          className="border rounded p-2 w-full"
          required
        />
      </div>
      <div>
        <label>Confirm Password:</label>
        <input
          type="password"
          name="confirmPassword"
          value={formState.confirmPassword}
          onChange={handleChange}
          className="border rounded p-2 w-full"
          required
        />
      </div>

      <h2 className="text-lg font-bold">Pet Details</h2>
      {formState.pets.map((pet, index) => (
        <div key={index} className="border p-4 rounded">
          <h3 className="font-semibold">Pet {index + 1}</h3>
          <div>
            <label>Pet Name:</label>
            <input
              type="text"
              name="name"
              value={pet.name}
              onChange={(e) => handlePetChange(index, e)}
              className="border rounded p-2 w-full"
              required
            />
          </div>
          <div>
            <label>Gender:</label>
            <input
              type="text"
              name="gender"
              value={pet.gender}
              onChange={(e) => handlePetChange(index, e)}
              className="border rounded p-2 w-full"
              required
            />
          </div>
          <div>
            <label>Age:</label>
            <input
              type="text"
              name="age"
              value={pet.age}
              onChange={(e) => handlePetChange(index, e)}
              className="border rounded p-2 w-full"
              required
            />
          </div>
          <div>
            <label>Breed:</label>
            <input
              type="text"
              name="breed"
              value={pet.breed}
              onChange={(e) => handlePetChange(index, e)}
              className="border rounded p-2 w-full"
              required
            />
          </div>
          <div>
            <label>General Notes:</label>
            <textarea
              name="notes"
              value={pet.notes}
              onChange={(e) => handlePetChange(index, e)}
              className="border rounded p-2 w-full"
              required
            />
          </div>
          <button type="button" onClick={() => removePet(index)} className="text-red-500">
            Remove Pet
          </button>
        </div>
      ))}
      <button type="button" onClick={addPet} className="bg-green-500 text-white px-4 py-2 rounded">
        Add Another Pet
      </button>

      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
        Sign Up
      </button>
    </form>
  );
};

export default Signup;