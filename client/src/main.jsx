import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';

import App from './App.jsx';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Registration from './pages/Registration';
import Booking from './pages/Booking';
import Services from './pages/Services';
import Products from './pages/Products';  // Import Products page

const ErrorPage = () => (
  <div className="flex flex-col items-center justify-center h-screen">
    <h1 className="text-3xl font-bold text-red-600">404 - Page Not Found</h1>
    <p className="text-xl">Sorry, we couldn't find what you were looking for.</p>
  </div>
);

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,  // Add an error page handler
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
        element: <Services />
      },
      {
        path: 'products',
        element: <Products />
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);