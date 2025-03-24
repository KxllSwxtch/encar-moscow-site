import { useState } from 'react'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../firebase'
import { useNavigate } from 'react-router-dom'

const Login = () => {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [error, setError] = useState('')
	const navigate = useNavigate()

	const handleSubmit = async (e) => {
		e.preventDefault()
		setError('')

		try {
			await signInWithEmailAndPassword(auth, email, password)
			navigate('/')
		} catch (err) {
			setError('Неверный email или пароль')
		}
	}

	return (
		<div className='min-h-screen flex items-center justify-center bg-gray-100 px-4'>
			<div className='bg-white shadow-md p-8 rounded-md w-full max-w-md'>
				<h2 className='text-2xl font-bold mb-6 text-center'>Вход</h2>
				<form onSubmit={handleSubmit} className='space-y-4'>
					<input
						type='email'
						placeholder='Email'
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						className='w-full p-3 border rounded-md'
						required
					/>
					<input
						type='password'
						placeholder='Пароль'
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						className='w-full p-3 border rounded-md'
						required
					/>
					<button
						type='submit'
						className='w-full bg-red-600 text-white py-3 rounded-md hover:bg-red-700 transition'
					>
						Войти
					</button>
					{error && <p className='text-red-600 text-sm'>{error}</p>}
				</form>
			</div>
		</div>
	)
}

export default Login
