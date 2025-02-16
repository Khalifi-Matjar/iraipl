import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { routesDefinitions } from './routes';
import { SnackbarProvider } from './components/context/snackbar-context';

const router = createBrowserRouter(routesDefinitions);

const App = () => {
    return (
        <SnackbarProvider>
            <RouterProvider router={router} />
        </SnackbarProvider>
    );
};

export default App;
