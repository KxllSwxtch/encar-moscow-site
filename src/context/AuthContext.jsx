import { useEffect, useState } from 'react'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { app } from '../firebase'
import { AuthContext } from './AuthContextOnly'

export const AuthProvider = ({ children }) => {
	const [currentUser, setCurrentUser] = useState(null)
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		const auth = getAuth(app)
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			setCurrentUser(user)
			setLoading(false)
		})
		return unsubscribe
	}, [])

	return (
		<AuthContext.Provider value={{ user: currentUser }}>
			{!loading && children}
		</AuthContext.Provider>
	)
}
