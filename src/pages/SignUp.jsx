import { useState } from 'react'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import { auth } from '../firebase'

const SignUp = () => {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [name, setName] = useState('')
	const [role, setRole] = useState('client')
	const [error, setError] = useState('')
	const [success, setSuccess] = useState(false)

	const navigate = useNavigate()

	const handleSubmit = async (e) => {
		e.preventDefault()
		setError('')
		setSuccess(false)

		try {
			const userCredential = await createUserWithEmailAndPassword(
				auth,
				email,
				password,
			)
			await updateProfile(userCredential.user, { displayName: name })
			localStorage.setItem('userRole', role)
			setSuccess(true)
			setEmail('')
			setPassword('')
			setName('')
			setRole('client')
			setTimeout(() => navigate('/'), 1500)
		} catch (err) {
			setError(err.message)
		}
	}

	return (
		<div className='min-h-screen flex items-center justify-center bg-gray-100 px-4'>
			<div className='bg-white shadow-md p-8 rounded-md w-full max-w-md'>
				<h2 className='text-2xl font-bold mb-6 text-center'>Регистрация</h2>
				<form onSubmit={handleSubmit} className='space-y-4'>
					<input
						type='text'
						placeholder='Имя'
						value={name}
						onChange={(e) => setName(e.target.value)}
						className='w-full p-3 border rounded-md'
						required
					/>
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
					{/* <select
						value={role}
						onChange={(e) => setRole(e.target.value)}
						className='w-full p-3 border rounded-md'
					>
						<option value='client'>Клиент</option>
						<option value='manager'>Менеджер</option>
					</select> */}
					<button
						type='submit'
						className='w-full bg-red-600 text-white py-3 rounded-md hover:bg-red-700 transition'
					>
						Зарегистрироваться
					</button>
					{error && <p className='text-red-600 text-sm'>{error}</p>}
					{success && (
						<p className='text-green-600 text-sm'>Регистрация успешна!</p>
					)}
					<p className='text-sm text-center mt-4'>
						Уже есть аккаунт?{' '}
						<a href='/login' className='text-red-600 hover:underline'>
							Войти
						</a>
					</p>
				</form>
			</div>
		</div>
	)
}

export default SignUp
