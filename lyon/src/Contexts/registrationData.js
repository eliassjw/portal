import { createContext, useState } from "react"

export const ClientDataRegistrationContext = createContext({})


export const ClientDataRegistration = ({ children }) => {
    const [firstName, setFirstName] = useState('');
    const [secondName, setSecondName] = useState('');
    const [birthday, setBirthday] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return <ClientDataRegistrationContext.Provider value={{
        firstName, secondName, birthday, email, password,
        setFirstName, setSecondName, setBirthday, setEmail, setPassword
    }}>{children}</ClientDataRegistrationContext.Provider>
}