import { createContext, useEffect, useState } from "react";

export const AdministrationLoginAuthContext = createContext({})
export const AdministrationLoginAuth = ({children}) => {
    const [user, setUser] = useState(null)

    useEffect(() => {
        const loadAuth = () => {
            const userCredentials = sessionStorage.getItem('@ADMIN:accessCredentials')
            if(userCredentials) setUser(userCredentials)
        }
        loadAuth()
    })

    return <AdministrationLoginAuthContext.Provider value={{
        authenticated: !!user
    }}>{children}</AdministrationLoginAuthContext.Provider>
}