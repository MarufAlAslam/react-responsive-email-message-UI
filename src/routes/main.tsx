import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../layout/main';
import NotFound from '../pages/error';
import React from 'react';

export const mainRoute = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout />,
        errorElement: <NotFound />,
    },
    {
        path: '*',
        element: <NotFound />,
    }
]);
