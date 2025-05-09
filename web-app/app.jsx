import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { routesDefinitions } from './routes';
import { SnackbarProvider } from './components/context/snackbar-context';
import { ConfirmationProvider } from './components/context/confirmation-context';
import { SpinnerProvider } from './components/context/spinner-context';
import { AppModalProvider } from './components/context/app-modal-context';

const router = createBrowserRouter(routesDefinitions);

const App = () => {
    return (
        <AppModalProvider>
            <SpinnerProvider>
                <SnackbarProvider>
                    <ConfirmationProvider>
                        <RouterProvider router={router} />
                    </ConfirmationProvider>
                </SnackbarProvider>
            </SpinnerProvider>
        </AppModalProvider>
    );
};

export default App;
