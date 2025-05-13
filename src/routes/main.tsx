import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../layout/main';
import NotFound from '../pages/error';
import React from 'react';
import Messages from '../pages/message-page';
import Emails from '../pages/email-page';
import Automation from '../pages/automation';
import EditAutomationPage from '../pages/edit-automation';
import CreateAutomationPage from '../pages/create-automation';
import ReviewRequestAutomationPage from '../pages/review-request';

export const mainRoute = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout />,
        errorElement: <NotFound />,
        children: [
            {
                path: '/',
                element: <Messages />,
            },
            {
                path: '/messages',
                element: <Messages />,
            },
            {
                path: '/emails',
                element: <Emails />,
            },
            {
                path: '/automation',
                element: <Automation />,
            },
            {
                path: '/automation/create',
                element: <CreateAutomationPage />,
            },
            {
                path: '/automation/:id',
                element: <EditAutomationPage />,
            },
            {
                path: '/review-request',
                element: <ReviewRequestAutomationPage />,
            },
        ]
    },
    {
        path: '*',
        element: <NotFound />,
    }
]);
