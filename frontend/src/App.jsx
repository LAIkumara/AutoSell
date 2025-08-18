import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/home'
import LoginPage from './pages/signIn'
import ClientProfile from './pages/client/clientProfile'
import AdminDashboard from './pages/admin/adminDashbord'
import Header from './components/header'
import SignUp from './pages/singUp'
import { Toaster } from 'react-hot-toast'
import AdForm from './pages/client/adForm'

function App() {

  return (
    <BrowserRouter>
    {/* <Header /> */}
      <div className='relative overflow-hidden bg-gradient-to-br'>
      {/* <div className="absolute inset-0">
        <div className="absolute top-30 left-0 w-96 h-96 bg-purple-200 rounded-full opacity-20 -translate-x-32 -translate-y-32"></div>
        <div className="absolute top-220 left-10 w-96 h-96 bg-purple-200 rounded-full opacity-20 -translate-x-32 -translate-y-32 animate-pulse"></div>
        <div className="absolute bottom-150 right-0 w-80 h-80 bg-purple-300 rounded-full opacity-15 translate-x-32 translate-y-32"></div>
        
      </div> */}
        <div>
        <Toaster position="top-center" />
          <Routes path="/">
            <Route path="/" element={<Home />} />
            <Route path="/singIn" element={<LoginPage />} />
            <Route path="/singUp" element={<SignUp />} />
            <Route path="/user/userProfile" element={<ClientProfile />} />
            <Route path="/admin/adminDashboard" element={<AdminDashboard />} />
            <Route path="/adform" element={<AdForm/>}/>
          </Routes>
        </div>
      </div>
      
    </BrowserRouter>
    
  )
}

export default App
