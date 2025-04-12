import './App.css'
import Header from './layout/Header/Header'
import Dashboard from './pages/Dashboard/Dashboard';
import Login from './pages/Login/Login'
import { useUser } from '@/context/UserContext';

function App() {
  const { user, isLoggedIn } = useUser();
  return (
    <>
      <Header />
      {
        user && isLoggedIn
          ? <Dashboard />
          : <Login />
      }
    </>
  )
}

export default App
