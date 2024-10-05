import { ApolloClient, InMemoryCache, ApolloProvider, HttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

// Define the URI for your Apollo Server
const uri = import.meta.env.VITE_GRAPHQL_URI || 'http://localhost:3001/graphql'; // Access using import.meta.env

// Create an HTTP link
const httpLink = new HttpLink({
    uri, // Ensure this matches your server URL
});

// Optionally, set up authentication or other headers if needed
const authLink = setContext((_, { headers }) => {
    // Get the authentication token from local storage if it exists
    const token = localStorage.getItem('token');
    
    // Return the headers to the context so httpLink can read them
    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : "",
        },
    };
});

// Create the Apollo Client
const client = new ApolloClient({
    link: authLink.concat(httpLink), // Use the combined link
    cache: new InMemoryCache(),
});

// Export the client as default
export default client;

// Export ApolloProvider if needed
export { ApolloProvider };
