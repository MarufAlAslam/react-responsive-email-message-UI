import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../layout/main';
import NotFound from '../pages/error';
import React from 'react';
import Messages from '../pages/message-page';
import Emails from '../pages/email-page';

export const mainRoute = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout />,
        errorElement: <NotFound />,
        children: [
            {
                path: '/messages',
                element: <Messages />,
            },
            {
                path: '/emails',
                element: <Emails />,
            },
        ]
    },
    {
        path: '*',
        element: <NotFound />,
    }
]);
