import { Outlet, Navigate } from 'react-router-dom'
import { AuthContext } from '../Store/AuthProvider'
import { useContext } from 'react'
import Cookies from 'js-cookie';

const PrivateRoutes = () => {
    

    const auth=useContext(AuthContext)

    // console.log("store ",auth.isLoggedIn)
    const user=Cookies.get("loggedInUser")

    const isLoggedIn=auth.isLoggedIn;

    

    // console.log("private route ",isLoggedIn)
    return(
        isLoggedIn ? <Outlet/> : <Navigate to="/auth"/>
    )
}

export default PrivateRoutes