const { GraphQLError } = require('graphql');
const jwt = require('jsonwebtoken');

const secret = 'mysecretssshhhhhhh'; // Consider using an environment variable for security
const expiration = '2h';

module.exports = {
  AuthenticationError: new GraphQLError('Could not authenticate user.', {
    extensions: {
      code: 'UNAUTHENTICATED',
    },
  }),

  authMiddleware: function ({ req }) {
    // Allows token to be sent via req.body, req.query, or headers
    let token = req.body.token || req.query.token || req.headers.authorization;

    // If there is an authorization header, split the token string and get the actual token
    if (req.headers.authorization) {
      token = token.split(' ').pop().trim();
    }

    if (!token) {
      return req; // No token found, return the request as-is
    }

    // If token can be verified, add the decoded user's data to the request so it can be accessed in the resolver
    try {
      const { data } = jwt.verify(token, secret, { maxAge: expiration });
      req.user = data; // Attach user data to the request
    } catch (err) {
      console.log('Invalid token', err);
    }

    // Return the request object so it can be passed to the resolver as `context`
    return req;
  },

  signToken: function ({ email, name, _id }) {
    const payload = { email, name, _id }; // Adjust the payload as needed
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};