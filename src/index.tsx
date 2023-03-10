import { ChakraProvider, ColorModeScript, theme } from '@chakra-ui/react';
import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import { RootPage } from './routes/root/root-page';
import reportWebVitals from './react-utils/reportWebVitals';
import * as serviceWorker from './react-utils/serviceWorker';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ErrorPage from './routes/error/error-page';
import LoginPage from './routes/login/login-page';
import RegisterPage from './routes/register/register-page';
import { UserProvider } from './context/DataContext';
import { ProfilePage } from './routes/settings/profile-page';
import { pb } from './utils/database.utils';
import { TrendingPage } from './routes/trending/trending-page';
import {UsersPage } from './routes/users/users-page';

const container = document.getElementById('root');
if (!container) throw new Error('Failed to find the root element');
const root = ReactDOM.createRoot(container);

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootPage/>,
    errorElement: <ErrorPage/>
  },
  {
    path: '/login',
    element: <LoginPage/>
  },
  {
    path: '/register',
    element: <RegisterPage/>
  },
  {
    path: '/trending',
    element: <TrendingPage/>
  },
  {
    path: '/users',
    element: <UsersPage/>
  },
  {
    path: 'profile/:username',
    errorElement: <ErrorPage/>,
    element: <ProfilePage/>,
    loader: async ({ params }) => {
      return await pb.collection('users').getFirstListItem(`username="${params.username}"`);
    }
  }
]);

root.render(
  <React.StrictMode>
      <ChakraProvider theme={theme}>
          <ColorModeScript />
          <UserProvider>
              <RouterProvider router={router} />
          </UserProvider>
      </ChakraProvider>
  </React.StrictMode>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorker.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
