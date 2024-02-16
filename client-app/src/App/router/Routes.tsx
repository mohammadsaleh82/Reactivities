import { Navigate, RouteObject, createBrowserRouter } from "react-router-dom";
import App from "../Layout/App";
import ActivityForm from "../../featuers/activities/form/ActivityForm";
import ActivityDashboard from "../../featuers/activities/dashboard/ActivityDashboard";
import ActivityDetails from "../../featuers/activities/details/ActivityDetails";
import TestErrors from "../../featuers/errors/TestErrors";
import NotFound from "../../featuers/errors/NotFound";
import ServerError from "../../featuers/errors/ServerError";
import LoginForm from "../../featuers/users/LoginForm";


export const routes: RouteObject[] = [
    {
        path: '/',
        element: <App />,
        children: [
            {
                path: 'createActivity',
                element: <ActivityForm key={'create'} />
            },
            {
                path: 'activities',
                element: <ActivityDashboard />
            },
            {
                path: 'activities/:id', element: <ActivityDetails />
            },
            {
                path: 'manage/:id',
                element: <ActivityForm key={'manage'} />
            },
            {
                path: 'errors',
                element: <TestErrors />
            },
            {
                path: 'login',
                element: <LoginForm />
            },
            {
                path: 'not-found',
                element: <NotFound />
            }, {
                path: 'server-error',
                element: <ServerError />
            },
            {
                path: '*',
                element: <Navigate replace to={'not-found'} />
            }
        ]
    }
]

export const router = createBrowserRouter(routes);