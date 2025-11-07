

import { Routes,Route } from 'react-router-dom'
import './App.css'
import IndexPage from './pages/IndexPage'
import LoginPage from './pages/LoginPage'
import Layout from './Layout'
import RegisterPage from './pages/RegisterPage'
import axios from 'axios'
import { UserContextProvider } from './UserContext'
import AccountPage from './pages/AccountPage'
import ProfilePage from './pages/ProfilePage'
import PlacesPage from './pages/PlacesPage'
import BookingPage from './pages/BookingPage'
import AddNew from './pages/AddNew'
import NewPage from './pages/NewPage'
import { SinglePage } from './pages/SinglePage'
import ProtectedRoute from './components/ProtectedRoute'




// Force local development for now
axios.defaults.baseURL = 'http://localhost:4000';
axios.defaults.withCredentials = true;

console.log('Axios configured with baseURL:', axios.defaults.baseURL);

function App() {
   


  return (
    <UserContextProvider>
    <Routes>
      <Route path='/' element={<Layout/>}>
        <Route index element={<IndexPage/>}/>
        <Route path='login' element={<LoginPage/>}/>
        <Route path='register' element={<RegisterPage/>}/>
        <Route path='places/:id' element={<NewPage/>}/>

        <Route element={<ProtectedRoute/>}>
          <Route path='account' element={<AccountPage/>}/>
          <Route path='account/profile' element={<ProfilePage/>}/>
          <Route path='account/places' element={<PlacesPage/>}/>
          <Route path='account/places/new' element={<AddNew/>}/>
          <Route path='account/places/:id' element={<AddNew/>}/>
          <Route path='account/bookings' element={<BookingPage/>}/>
          <Route path='account/bookings/:id' element={<BookingPage/>}/>
          <Route path='account/booking/:id' element={<SinglePage/>}/>
        </Route>
      </Route>
    </Routes>
    </UserContextProvider>
     

  )
}

export default App
