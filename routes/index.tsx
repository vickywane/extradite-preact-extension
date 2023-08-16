import {Route, Routes} from "react-router-dom"
import {Login, UploadFile, Settings, Signup, Home, ForgotPassword} from '~/pages/'

import '../styles/app.css'

// THINGS TO IMPLEMENT:
// FORGET/RESET PASSWORD
// RETRIEVE AWS CREDENTIALS THROUGH AWS SECRET MANAGER SERVICE
// LOGIN USING PASSWORD/EMAIL (Currently it's stuck on wrong credentials error )
// STORE USER DETAILS IN DYNAMODB
// RENAME PROJECT ( remove boilerplate name values )


export const Routing = () => (
    <Routes>
        <Route path="/home" element={<Home/>}/>
        <Route path="/upload" element={<UploadFile/>}/>
        <Route path="/settings" element={<Settings/>}/>
        <Route path="/forgot-password" element={<ForgotPassword/>}/>

        <Route path="/" element={<Login/>}/>
        <Route path="/signup" element={<Signup/>}/>
    </Routes>
)
