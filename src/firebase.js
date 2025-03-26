import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
	apiKey: 'AIzaSyCB8WlP6xwvRkjE6ik_UFdpxpZav9qFh-c',
	authDomain: 'encarmoscow.firebaseapp.com',
	projectId: 'encarmoscow',
	storageBucket: 'encarmoscow.firebasestorage.app',
	messagingSenderId: '592777241887',
	appId: '1:592777241887:web:1faf5ae8c823cca7b8bc2a',
}

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const db = getFirestore(app)

export { auth, app, db }
