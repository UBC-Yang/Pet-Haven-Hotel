import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { REGISTER_USER } from '../utils/mutations'; // Adjust the import path as necessary

const SignUp = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [pets, setPets] = useState([{ name: '', gender: '', age: '', breed: '', notes: '' }]);
    const [register, { error }] = useMutation(REGISTER_USER);
    const [registrationError, setRegistrationError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setRegistrationError(''); // Reset error message
    
        // Password validation
        if (password !== confirmPassword) {
            setRegistrationError("Passwords do not match.");
            return;
        }
    
        // Validate pet entries before submitting
        const updatedPets = pets.map(pet => ({
            ...pet,
            age: parseInt(pet.age, 10) >= 0 ? parseInt(pet.age, 10) : 0 // Ensure age is non-negative
        }));
    
        // Check for empty fields in pets
        for (const pet of updatedPets) {
            if (!pet.name || !pet.gender || !pet.breed) {
                setRegistrationError("Please fill out all pet details.");
                return;
            }
        }
    
        try {
            const { data } = await register({
                variables: {
                    firstName,
                    lastName,
                    username,
                    email,
                    password,
                    pets: updatedPets,
                },
            });
            console.log('Registration successful:', data);
            resetForm();
        } catch (error) {
            console.error("Registration error details:", error);
            const errorMessage = error.graphQLErrors?.[0]?.message || "Registration failed. Please check your inputs.";
            setRegistrationError(errorMessage); // Display error messages more clearly
        }
    };

    const handlePetChange = (index, event) => {
        const { name, value } = event.target;
        const updatedPets = [...pets];
        updatedPets[index][name] = value;
        setPets(updatedPets);
    };

    const addPet = () => {
        setPets([...pets, { name: '', gender: '', age: '', breed: '', notes: '' }]);
    };

    const removePet = (index) => {
        if (window.confirm("Are you sure you want to remove this pet?")) {
            const updatedPets = pets.filter((_, i) => i !== index);
            setPets(updatedPets);
        }
    };

    const resetForm = () => {
        setFirstName('');
        setLastName('');
        setUsername('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setPets([{ name: '', gender: '', age: '', breed: '', notes: '' }]);
    };

    return (
        <div className="container mx-auto mt-10">
            <h2 className="font-bold text-2xl mb-4">Owner Details</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    placeholder="First Name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="border p-2 w-full"
                    required
                />
                <input
                    type="text"
                    placeholder="Last Name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="border p-2 w-full"
                    required
                />
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="border p-2 w-full"
                    required
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="border p-2 w-full"
                    required
                />

                <div className="relative">
                    <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="border p-2 w-full"
                        required
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-2 top-2 text-sm text-gray-600"
                    >
                        {showPassword ? "Hide" : "Show"}
                    </button>
                </div>

                <div className="relative">
                    <input
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="border p-2 w-full"
                        required
                    />
                    <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-2 top-2 text-sm text-gray-600"
                    >
                        {showConfirmPassword ? "Hide" : "Show"}
                    </button>
                </div>

                <h2 className="font-bold text-2xl mb-4">Pet Details</h2>
                {pets.map((pet, index) => (
                    <div key={index} className="border p-4 mb-4">
                        <input
                            type="text"
                            name="name"
                            placeholder="Pet Name"
                            value={pet.name}
                            onChange={(e) => handlePetChange(index, e)}
                            className="border p-2 w-full mb-2"
                            required
                        />

                        <select
                            name="gender"
                            value={pet.gender}
                            onChange={(e) => handlePetChange(index, e)}
                            className="border p-2 w-full mb-2 text-gray-600"
                            required
                        >
                            <option value="">Select Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </select>

                        <input
                            type="number"
                            name="age"
                            placeholder="Age"
                            value={pet.age}
                            onChange={(e) => handlePetChange(index, e)} // Pass the event directly
                            className="border p-2 w-full mb-2"
                            required
                            min="0" // Prevent negative numbers
                        />
                        <input
                            type="text"
                            name="breed"
                            placeholder="Breed"
                            value={pet.breed}
                            onChange={(e) => handlePetChange(index, e)}
                            className="border p-2 w-full mb-2"
                            required
                        />
                        <input
                            type="text"
                            name="notes"
                            placeholder="Notes"
                            value={pet.notes}
                            onChange={(e) => handlePetChange(index, e)}
                            className="border p-2 w-full mb-2"
                            required
                        />
                        <button
                            type="button"
                            onClick={() => removePet(index)}
                            className="bg-red-500 text-white p-1 rounded"
                        >
                            Remove Pet
                        </button>
                    </div>
                ))}
                <div className="flex space-x-2">
                    <button type="button" onClick={addPet} className="bg-blue-500 text-white p-2 rounded">
                        Add Another Pet
                    </button>
                </div>
                <button type="submit" className="bg-green-500 text-white p-2 rounded mt-4">
                    Sign Up
                </button>
                {registrationError && <p className="text-red-500">{registrationError}</p>}
                {error && <p className="text-red-500">{error.message}</p>}
            </form>
        </div>
    );
};

export default SignUp;