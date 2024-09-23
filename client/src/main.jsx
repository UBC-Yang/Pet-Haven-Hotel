// root/client/main.jsx
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';

import App from './App.jsx';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Registration from './pages/Registration';  
import Booking from './pages/Booking';
import Services from './pages/Services'; // Ensure this matches the file name

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />, // The App component now handles the layout
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: 'registration',  
        element: <Registration />
      },
      {
        path: 'me',
        element: <Profile />
      },
      {
        path: 'booking',
        element: <Booking />
      },
      {
        path: 'services',
        element: <Services /> // Ensure this is correctly named
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
);