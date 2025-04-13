import { message } from 'antd';
import './App.css'
import Header from './layout/Header/Header'
import Dashboard from './pages/Dashboard/Dashboard';
import Login from './pages/Login/Login'
import { useUser } from '@/context/UserContext';
import { MessageContext } from './context/MessageContext';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoaderProvider from './context/LoadingProvider';
import Layout from './pages/Layouts/Layouts';

function App() {
  const { user, isLoggedIn } = useUser();
  const [messageApi, contextHolder] = message.useMessage();
  return (
    <LoaderProvider>
      <MessageContext.Provider value={messageApi}>
        {contextHolder}
        <Header />
        <Router>
          <Routes>
            {true ? (
              <>
                <Route path="/snaplayout-ui" element={<Dashboard />} />
                <Route path="/snaplayout-ui/layouts" element={<Layout />} />
              </>
            ) : (
              <Route path="/snaplayout-ui" element={<Login />} />
            )}
          </Routes>
        </Router>
      </MessageContext.Provider>
    </LoaderProvider>
  )
}

export default App
