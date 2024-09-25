const mongoose = require('mongoose');
const Service = require('../models/Service');
const User = require('../models/User'); // Import the User model
const db = require('../config/connection');

const serviceData = [
  {
    name: 'Basic',
    price: 20,
    tier: 'Basic',
    description: 'Pamper your pet with our essential spa services, perfect for a quick refresh. This package includes a gentle shampoo bath, a thorough coat brushing, ear cleaning, and a nail trim. Your pet will leave feeling clean and rejuvenated.'
  },
  {
    name: 'Standard',
    price: 40,
    tier: 'Standard',
    description: 'Upgrade your pet’s spa experience with our Standard Package. Along with all the Basic services, your pet will enjoy a deep conditioning treatment to soften and detangle their coat, followed by a relaxing paw massage. This package also includes a spritz of our signature pet-safe fragrance.'
  },
  {
    name: 'Premium',
    price: 60,
    tier: 'Premium',
    description: 'Our Premium Package offers a luxurious spa experience for your pet. In addition to all Standard services, this package includes a soothing oatmeal or hypoallergenic bath tailored to their skin type, teeth brushing for fresh breath, and a blueberry facial to brighten their fur. Your pet will feel pampered from head to tail.'
  },
  {
    name: 'Deluxe',
    price: 80,
    tier: 'Deluxe',
    description: 'For the ultimate spa indulgence, treat your pet to our Deluxe Package. This all-inclusive experience features everything from the Premium Package, plus a full-body massage to ease tension, a warm towel wrap for deep relaxation, and a personalized grooming session tailored to their unique style. We will finish with a gourmet treat and a complimentary bandana or bow.'
  }
];

// Sample user data
const userData = [
  {
    firstName: 'John',
    lastName: 'Doe',
    username: 'johnDoe',
    email: 'john@example.com',
    password: 'password123', // Use a simple password for testing
    pets: [
      {
        name: 'Fido',
        gender: 'male',
        age: 5,
        breed: 'Labrador',
        notes: 'Loves to play fetch.'
      }
    ]
  },
  {
    firstName: 'Jane',
    lastName: 'Smith',
    username: 'janeSmith',
    email: 'jane@example.com',
    password: 'password123', // Use a simple password for testing
    pets: [
      {
        name: 'Whiskers',
        gender: 'female',
        age: 3,
        breed: 'Siamese',
        notes: 'Very playful and friendly.'
      }
    ]
  }
];

db.once('open', async () => {
  try {
    await Service.deleteMany({});  // Clear existing services
    await User.deleteMany({});      // Clear existing users
    await Service.insertMany(serviceData);  // Insert new services
    await User.insertMany(userData);        // Insert new users
    console.log('Services and users seeded!');
  } catch (err) {
    console.error(err);
  } finally {
    mongoose.connection.close();  // Close the connection
  }
});
