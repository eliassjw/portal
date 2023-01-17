import { Route, BrowserRouter as Router, Routes } from "react-router-dom"
import Home from '../Pages/Home/Home'
import Login from '../Pages/Login/Login'
import { PrivateRoutes } from "./PrivateRoutes"
import Cart from '../Pages/Profile/Cart/Cart'
import { Shopping } from "../Components/Shopping/Shopping"
import PageNotFound from "../Pages/NotFound/NotFound"
import { ClientDataRegistration } from "../Contexts/registrationData"
import PrivilegedRoutes from "./PrivilegedRoutes"
import HeadquarterAuthentication from "../Pages/Admin/Pages/Authentication/Authentication"
import Headquarter from "../Pages/Admin/Headquarter"
import { Dashboard } from "../Pages/Admin/Pages/Home/Home"
import Clients from "../Pages/Admin/Pages/Clients/Clients"
import Sales from "../Pages/Admin/Pages/Sales/Sales"
import Deliveries from "../Pages/Admin/Pages/Deliveries/Deliveries"
import Settings from "../Pages/Admin/Pages/Settings/Settings"

const MainRoutes = () => {
    return <>
        <Router>
            <Routes>
                <Route path='*' element={<PageNotFound />} />

                <Route path='/' element={<Home />} />
                <Route path='/login' element={
                    <ClientDataRegistration>
                        <Login />
                    </ClientDataRegistration>
                    
                } />

                <Route element={<PrivateRoutes />}>
                    <Route path="/buy" element={<Shopping />} />
                    <Route path="/cart" element={<Cart />} />
                </Route>
                
                <Route element={<PrivilegedRoutes />}>
                    <Route element={<HeadquarterAuthentication />} path='/administration/auth' />
                    <Route element={<Headquarter />}>
                        <Route path="/administration/panel" element={<Dashboard />} />
                        <Route path='/administration/panel/clients' element={<Clients />} />
                        <Route path='/administration/panel/sales' element={<Sales />} />
                        <Route path='/administration/panel/deliveries' element={<Deliveries />} />
                        <Route path='/administration/panel/settings' element={<Settings />} />
                    </Route>
                </Route>
            </Routes>
        </Router>
    </>
}

export default MainRoutes