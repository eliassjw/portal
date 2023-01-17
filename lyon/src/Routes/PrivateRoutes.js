import { useContext } from "react"
import { Navigate, Outlet } from "react-router-dom"
import { AuthGoogleContext, AuthEmailContext } from "../Contexts/clientAuth"

export const PrivateRoutes = () => {
    const { signedInWithGoogle } = useContext(AuthGoogleContext)
    const { signedWithEmail } = useContext(AuthEmailContext)
    return signedInWithGoogle || signedWithEmail ? <Outlet /> : <Navigate to='/login' />
}