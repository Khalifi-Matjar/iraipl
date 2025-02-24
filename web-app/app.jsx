import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { routesDefinitions } from './routes';
import { SnackbarProvider } from './components/context/snackbar-context';
import { ConfirmationProvider } from './components/context/confirmation-context';

const router = createBrowserRouter(routesDefinitions);

const App = () => {
    return (
        <SnackbarProvider>
            <ConfirmationProvider>
                <RouterProvider router={router} />
            </ConfirmationProvider>
        </SnackbarProvider>
    );
};

export default App;
