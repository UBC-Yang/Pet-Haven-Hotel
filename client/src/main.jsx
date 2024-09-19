import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';

import App from './App.jsx';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Registration from './pages/Registration';  
import Booking from './pages/Booking';
import Service from './pages/Service';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
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
        path: 'profiles/:profileId',
        element: <Profile />
      },
      {
        path: 'booking',
        element: <Booking />
      },
      {
        path: 'services',
        element: <Service />
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
);
