import React, { lazy } from 'react';
import { Navigate } from 'react-router-dom';

const ChartTest = lazy(() => import('views/chart-test'));
const ChartOtb = lazy(() => import('views/chart-otb'));
const ChartCustom = lazy(() => import('views/chart-custom'));

const routes = [
    {
        path: '/',
        element: <Navigate to="/chart-test" />,
    },
    {
        path: "/chart-test",
        element: <ChartTest/>,
    },
    {
        path: "/chart-otb",
        element: <ChartOtb/>,
    },
    {
        path: "/chart-custom",
        element: <ChartCustom/>,
    },
];

export default routes;