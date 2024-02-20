import React, { lazy } from 'react';
import { Navigate } from 'react-router-dom';

const ChartTest = lazy(() => import('views/chart-test'));

const routes = [
    {
        path: '/',
        element: <Navigate to="/chart-test" />,
    },
    {
        path: "/chart-test",
        element: <ChartTest/>,
    },
];

export default routes;