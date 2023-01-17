import { collection, getDocs, query, where } from 'firebase/firestore'
import { db } from '../../../Server/firebase'

export const getClients = async () => {
    const clients = await getDocs(query(
        collection(db, 'clients'),
        where('email', '!=', '')
    ))

    return clients
}