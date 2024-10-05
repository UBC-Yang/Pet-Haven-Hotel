// server.js
require('dotenv').config(); // Load environment variables

const express = require('express');
const cors = require('cors');
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const path = require('path');
const { authMiddleware } = require('./utils/auth');
const db = require('./config/connection');
const paymentRoutes = require('./routes/payment'); // Import payment routes

const { typeDefs, resolvers } = require('./schemas');

const PORT = process.env.PORT || 3001;
const app = express();
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// Enable CORS
app.use(cors());
app.use(express.json()); // Use JSON parser for POST requests
=======
app.use(cors({
  origin: [ 
    'http://localhost:3000',   // For local development
    'https://pet-haven-hotel-5w68.onrender.com'  // For production
  ],
  credentials: true, // If you're using cookies or authentication
}));

// Payment Routes
app.use('/api', paymentRoutes);

// Start the Apollo Server
const startServer = async () => {
  await server.start();
  // Apollo server middleware with authentication
  app.use('/graphql', expressMiddleware(server, {
    context: authMiddleware,
  }));

  // Serve static assets in production
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/dist')));

    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, '../client/dist/index.html'));
    });
  }

  // Connect to the database and start the server
  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
    });
  });
};

// Call the start function
startServer().catch((err) => {
  console.error('Failed to start the server:', err);
});
