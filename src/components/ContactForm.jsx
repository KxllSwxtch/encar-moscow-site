import { useState } from 'react'

const ContactForm = () => {
	const [formData, setFormData] = useState({
		name: '',
		phone: '',
		email: '',
		message: '',
	})
	const [isSubmitting, setIsSubmitting] = useState(false)
	const [submitStatus, setSubmitStatus] = useState(null)

	const handleChange = (e) => {
		const { name, value } = e.target
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}))
	}

	const handleSubmit = async (e) => {
		e.preventDefault()
		setIsSubmitting(true)
		setSubmitStatus(null)

		try {
			// Формируем сообщение для отправки в WhatsApp
			const message = `
	Новая заявка с сайта:
	Имя: ${formData.name}
	Телефон: ${formData.phone}
	Email: ${formData.email}
	Сообщение: ${formData.message}
			`.trim()

			// Кодируем сообщение для использования в URL
			const encodedMessage = encodeURIComponent(message)

			// Номер телефона в международном формате без плюса и дефисов
			const phoneNumber = '821099802858'

			// Формируем ссылку для отправки сообщения в WhatsApp
			const waLink = `https://wa.me/${phoneNumber}?text=${encodedMessage}`

			// Открываем ссылку в новой вкладке
			window.open(waLink, '_blank')

			// Очистка формы после успешной отправки
			setFormData({
				name: '',
				phone: '',
				email: '',
				message: '',
			})

			setSubmitStatus({
				success: true,
				message: 'Спасибо! Ваше сообщение отправлено.',
			})
		} catch (error) {
			console.error('Ошибка при подготовке сообщения:', error)
			setSubmitStatus({
				success: false,
				message: 'Произошла ошибка. Пожалуйста, попробуйте позже.',
			})
		} finally {
			setIsSubmitting(false)
		}
	}

	return (
		<section className='py-16 bg-gray-50'>
			<div className='container mx-auto px-6'>
				<div className='max-w-3xl mx-auto'>
					<h2 className='text-3xl font-bold text-center mb-8'>
						Связаться с нами
					</h2>
					<p className='text-center text-gray-600 mb-10'>
						Остались вопросы? Заполните форму ниже, и мы свяжемся с вами в
						ближайшее время.
					</p>

					{submitStatus && (
						<div
							className={`mb-6 p-4 rounded-md ${
								submitStatus.success
									? 'bg-green-100 text-green-700'
									: 'bg-red-100 text-red-700'
							}`}
						>
							{submitStatus.message}
						</div>
					)}

					<form
						onSubmit={handleSubmit}
						className='bg-white rounded-lg shadow-md p-8'
					>
						<div className='mb-4'>
							<label
								htmlFor='name'
								className='block text-gray-700 font-medium mb-2'
							>
								Имя
							</label>
							<input
								type='text'
								id='name'
								name='name'
								value={formData.name}
								onChange={handleChange}
								className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500'
								required
							/>
						</div>

						<div className='mb-4'>
							<label
								htmlFor='phone'
								className='block text-gray-700 font-medium mb-2'
							>
								Телефон
							</label>
							<input
								type='tel'
								id='phone'
								name='phone'
								value={formData.phone}
								onChange={handleChange}
								className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500'
								required
							/>
						</div>

						<div className='mb-4'>
							<label
								htmlFor='email'
								className='block text-gray-700 font-medium mb-2'
							>
								Email
							</label>
							<input
								type='email'
								id='email'
								name='email'
								value={formData.email}
								onChange={handleChange}
								className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500'
								required
							/>
						</div>

						<div className='mb-6'>
							<label
								htmlFor='message'
								className='block text-gray-700 font-medium mb-2'
							>
								Сообщение
							</label>
							<textarea
								id='message'
								name='message'
								value={formData.message}
								onChange={handleChange}
								rows='4'
								className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500'
								required
							/>
						</div>

						<div className='text-center'>
							<button
								type='submit'
								disabled={isSubmitting}
								className={`px-6 py-3 bg-red-500 text-white font-medium rounded-md hover:bg-red-600 transition-colors ${
									isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
								}`}
							>
								{isSubmitting ? 'Отправка...' : 'Отправить сообщение'}
							</button>
						</div>
					</form>
				</div>
			</div>
		</section>
	)
}

export default ContactForm
