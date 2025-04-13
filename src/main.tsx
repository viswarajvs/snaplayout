import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import './styles/main.scss';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { UserProvider } from './context/UserContext';
import { FileProvider } from './context/FileContext';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';

const rootElement = document.getElementById('root');

if (!rootElement) throw new Error("Root element not found");

createRoot(rootElement).render(
  <StrictMode>
    <ErrorBoundary>
      <GoogleOAuthProvider clientId="157792108925-ui1mh9bschn5dmlpnkl6l5bdjbomcfo8.apps.googleusercontent.com">
        <UserProvider>
          <FileProvider>
            <App />
          </FileProvider>
        </UserProvider>
      </GoogleOAuthProvider>
    </ErrorBoundary>
  </StrictMode>
);

