import { createContext, useEffect, useState } from "react"
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { Navigate } from "react-router-dom";
import '../Server/firebase'
import { initializedApp } from "../Server/firebase";
const googleAuth = new GoogleAuthProvider();

export const AuthGoogleContext = createContext({})
export const AuthEmailContext = createContext({})

export const AuthEmail = ({children}) => {
    const [client, setClient] = useState(null)
    
    useEffect(() => {
        const loadClientAuth = () => {
            const authToken = localStorage.getItem('@SYSTEM:token')
            const authClient = localStorage.getItem('@SYSTEM:userCredentials')

            if (authToken && authClient) {
                setClient(authClient)
            }
        }
        loadClientAuth()
    })

    const logInWithEmail = (clientData) => {
        setClient(clientData.email)
        localStorage.setItem('@SYSTEM:token', 123456789)
        localStorage.setItem('@SYSTEM:userCredentials', JSON.stringify({email: clientData.email, displayName: clientData.name + ' ' + clientData.lastName}))
    }

    const signOutEmail = () => {
        localStorage.clear()
        setClient(null)
    }

    return <AuthEmailContext.Provider value={{logInWithEmail, signedInWithEmail: !!client, signOutEmail}}>{children}</AuthEmailContext.Provider>
}

export const AuthGoogle = props => {
    const auth = getAuth(initializedApp);

    const [googleClient, setGoogleClient] = useState(null);

    useEffect(() => {
        const loadGoogleClientAuth = () => {
            const authToken = localStorage.getItem('@SYSTEM:token')
            const authClient = localStorage.getItem('@SYSTEM:userCredentials')

            if (authToken && authClient) {
                setGoogleClient(authClient)
            }
        }
        loadGoogleClientAuth()
    }, [])

    const logInWithGoogle = () => {
        signInWithPopup(auth, googleAuth)
        .then((response) => {
            const credential = GoogleAuthProvider.credentialFromResult(response)
            const token = credential.accessToken
            const client = response.user

            setGoogleClient(client)
            localStorage.setItem('@SYSTEM:token', token)
            localStorage.setItem('@SYSTEM:userCredentials', JSON.stringify(client))
        })
        .catch(error => {
            console.log('Console fechado pelo usuário.')
        })
    }

    const signOutGoogle = () => {
        localStorage.clear()
        setGoogleClient(null)
        return <Navigate to='/' />
    }

    return <AuthGoogleContext.Provider
        value={{logInWithGoogle, signedInWithGoogle: !!googleClient, signOutGoogle}}>
        {props.children}
    </AuthGoogleContext.Provider>
}