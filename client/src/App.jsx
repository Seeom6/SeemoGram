import { AuthLayout, LoginFrom, SignUpForm } from "./AuthenticationForms"
import { Route , Routes} from "react-router-dom"
import {HomePages} from "./Root/Pages"
import RootLayout from './Root/RootLayout.jsx'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {

  return (
    <main className='flex h-max'>
    <Routes>
      {/* Public routes */}
      <Route  element={<AuthLayout/>}>
        <Route path="/sign-up" element={<SignUpForm/>} />
        <Route path="/log-in" element={<LoginFrom/>} />
      </Route>
      {/* private routes */}
      <Route element={<RootLayout/>}>
        <Route index element={<HomePages.Home/>} /> 
        <Route path="/explore" element={<HomePages.Explore/>}/> 
        <Route path="/saved" element={<HomePages.Saved/>}/> 
        <Route path="/all-users" element={<HomePages.AllUsers/>}/> 
        <Route path="/create-post" element={<HomePages.CreatePost/>}/> 
        <Route path="/update-post/:id" element={<HomePages.EditPost/>}/> 
        <Route path="/posts/:id" element={<HomePages.PostDetails/>}/> 
        <Route path="/profile/:id" element={<HomePages.Profile/>}/>                                 
        <Route path="/update-profile/:id" element={<HomePages.UpdateProfile/>}/> 
      </Route>
  </Routes>
  <ToastContainer/> 
  </main>
  )
}

export default App
