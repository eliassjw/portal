import { useContext } from "react"
import { Outlet } from "react-router-dom"
import { AdministrationLoginAuth } from "../Pages/Admin/Contexts/adminAuth"
import { AuthEmailContext, AuthGoogleContext } from "../Contexts/clientAuth"
import PageNotFound from "../Pages/NotFound/NotFound"

const PrivilegedRoutes = () => {
    const { signedInWithGoogle } = useContext(AuthGoogleContext)
    const { signedInWithEmail } = useContext(AuthEmailContext)
    return (signedInWithGoogle || signedInWithEmail) ? <AdministrationLoginAuth><Outlet /></AdministrationLoginAuth> : <PageNotFound />
}

export default PrivilegedRoutes