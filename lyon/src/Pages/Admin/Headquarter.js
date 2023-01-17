import { useContext } from "react"
import { Navigate, Outlet } from "react-router-dom"
import { AdministrationLoginAuthContext } from "./Contexts/adminAuth"

const Headquarter = () => {
    const { authenticated } = useContext(AdministrationLoginAuthContext)
    return !authenticated ? <Outlet /> : <Navigate to='/administration/auth' />
}

export default Headquarter