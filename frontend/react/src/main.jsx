import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css'
import Layout from './layout/layout.jsx';
import MainPage from './pages/MainPage.jsx';
import StudentsList from './pages/students/StudentsList.jsx';
import StudentsForm from './pages/students/StudentsForm.jsx';

const router = createBrowserRouter ([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <MainPage />
      },
      {
        path: '/students',
        element: <StudentsList />
      },
      {
        path: '/students/form',
        element: <StudentsForm />
      }
    ]
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router = { router} />
  </StrictMode>,
)
