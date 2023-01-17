import './Components/Header/style.css'
import './Fonts/font.css'
import './Styles/default.css'
import MainRoutes from './Routes/MainRoutes'
import { AuthGoogle, AuthEmail } from './Contexts/clientAuth'
// import * as DB from './Components/Server/firebase'

const App = () => {
    return (
        <AuthGoogle><AuthEmail><MainRoutes /></AuthEmail></AuthGoogle>
    )
}

export default App