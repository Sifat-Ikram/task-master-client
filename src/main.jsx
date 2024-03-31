import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import SignIn from './components/pages/sign/SignIn.jsx';
import SignUp from './components/pages/sign/SignUp.jsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AuthProvider from './components/provider/AuthProvider.jsx';
import HomePage from './components/pages/home/HomePage.jsx';
import Dashboard from './components/pages/dashboard/Dashboard.jsx';
import AddTask from './components/pages/add_task/AddTask.jsx';
const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    children: [
      {
        path: "/",
        element: <HomePage />
      },
      {
        path: "/signIn",
        element: <SignIn />
      },
      {
        path: "/signUp",
        element: <SignUp />
      },
      {
        path: "/dashboard",
        element: <Dashboard />
      },
      {
        path: "/addTask",
        element: <AddTask />
      }
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </AuthProvider>
  </React.StrictMode>,
)
