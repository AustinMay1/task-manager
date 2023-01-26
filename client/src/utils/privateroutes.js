import { useContext } from "react"
import { UserContext } from "./context"
import { Outlet, Navigate } from "react-router-dom"

const PrivateRoute = () => {
    const { user } = useContext(UserContext)
    return user ? <Outlet /> : <Navigate to='/login' />
}

export default PrivateRoute;