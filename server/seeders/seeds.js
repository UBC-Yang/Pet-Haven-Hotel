const mongoose = require('mongoose');
const Service = require('../models/Service');
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

db.once('open', async () => {
  try {
    await Service.deleteMany({});  // Clear existing services
    await Service.insertMany(serviceData);  // Insert new services
    console.log('Services seeded!');
  } catch (err) {
    console.error(err);
  } finally {
    mongoose.connection.close();  // Close the connection
  }
});
