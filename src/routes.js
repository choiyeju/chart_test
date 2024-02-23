import React, { lazy } from 'react';
import { Navigate } from 'react-router-dom';

const ChartTest = lazy(() => import('views/chart-test'));
const ChartOtb = lazy(() => import('views/chart-otb'));
const ChartCustom = lazy(() => import('views/chart-custom'));
const SettingLayout = lazy(() => import('views/chart-setting'));

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
    {
        path: "/chart-setting",
        element: <SettingLayout/>,
    },
];

export default routes;