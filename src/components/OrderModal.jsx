import { useState, useEffect } from 'react'
import { FaTelegram, FaWhatsapp, FaTimes } from 'react-icons/fa'
import { motion, AnimatePresence } from 'framer-motion'

const OrderModal = ({ isOpen, onClose, carName }) => {
	const [formData, setFormData] = useState({
		name: '',
		phone: '',
		car: carName || '',
		budget: '',
	})
	const [isSubmitting, setIsSubmitting] = useState(false)

	useEffect(() => {
		// Обновляем данные автомобиля при изменении props
		setFormData((prev) => ({
			...prev,
			car: carName || '',
		}))
	}, [carName])

	useEffect(() => {
		// Блокируем скролл при открытом модальном окне
		if (isOpen) {
			document.body.style.overflow = 'hidden'
		} else {
			document.body.style.overflow = 'auto'
		}

		return () => {
			document.body.style.overflow = 'auto'
		}
	}, [isOpen])

	const handleChange = (e) => {
		const { name, value } = e.target
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}))
	}

	const handleSubmitTelegram = () => {
		setIsSubmitting(true)
		window.open('https://t.me/+Ndi8rrAfpg00ZGJl', '_blank')
		onClose()
		setIsSubmitting(false)
	}

	const handleSubmitWhatsApp = () => {
		setIsSubmitting(true)

		const message = `
Новая заявка на автомобиль:
Имя: ${formData.name}
Телефон: ${formData.phone}
Автомобиль: ${formData.car}
Примерный бюджет: ${formData.budget}
    `.trim()

		const encodedMessage = encodeURIComponent(message)
		const phoneNumber = '821099802858'
		const waLink = `https://api.whatsapp.com/send/?phone=${phoneNumber}&text=${encodedMessage}`

		window.open(waLink, '_blank')
		onClose()
		setIsSubmitting(false)
	}

	// Варианты анимаций для модального окна
	const overlayVariants = {
		hidden: { opacity: 0 },
		visible: { opacity: 1, transition: { duration: 0.3 } },
	}

	const modalVariants = {
		hidden: { y: -50, opacity: 0 },
		visible: {
			y: 0,
			opacity: 1,
			transition: {
				type: 'spring',
				stiffness: 300,
				damping: 25,
				delay: 0.1,
			},
		},
		exit: {
			y: -30,
			opacity: 0,
			transition: {
				duration: 0.2,
			},
		},
	}

	return (
		<AnimatePresence>
			{isOpen && (
				<motion.div
					className='fixed inset-0 z-50 flex items-center justify-center bg-black/60'
					variants={overlayVariants}
					initial='hidden'
					animate='visible'
					exit='hidden'
				>
					<motion.div
						className='relative bg-white rounded-lg shadow-xl w-full max-w-md mx-4 overflow-hidden'
						variants={modalVariants}
						initial='hidden'
						animate='visible'
						exit='exit'
					>
						<motion.button
							onClick={onClose}
							className='absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors'
							whileHover={{ scale: 1.1 }}
							whileTap={{ scale: 0.9 }}
						>
							<FaTimes size={24} />
						</motion.button>

						<div className='p-6'>
							<motion.h2
								className='text-3xl font-bold text-center mb-2'
								initial={{ opacity: 0, y: -10 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ delay: 0.2 }}
							>
								Узнайте стоимость
							</motion.h2>
							<motion.p
								className='text-center text-gray-600 mb-6'
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								transition={{ delay: 0.3 }}
							>
								Ответьте на вопросы и мы свяжемся с Вами
							</motion.p>

							<div className='space-y-4 mb-6'>
								<motion.div
									initial={{ x: -20, opacity: 0 }}
									animate={{ x: 0, opacity: 1 }}
									transition={{ delay: 0.4 }}
								>
									<input
										type='text'
										name='name'
										value={formData.name}
										onChange={handleChange}
										placeholder='Ваше имя'
										className='w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500'
										required
									/>
								</motion.div>

								<motion.div
									initial={{ x: -20, opacity: 0 }}
									animate={{ x: 0, opacity: 1 }}
									transition={{ delay: 0.5 }}
								>
									<input
										type='tel'
										name='phone'
										value={formData.phone}
										onChange={handleChange}
										placeholder='Ваш номер телефона'
										className='w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500'
										required
									/>
								</motion.div>

								<motion.div
									initial={{ x: -20, opacity: 0 }}
									animate={{ x: 0, opacity: 1 }}
									transition={{ delay: 0.6 }}
								>
									<input
										type='text'
										name='car'
										value={formData.car}
										onChange={handleChange}
										placeholder='Какое авто вы рассматриваете?'
										className='w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500'
									/>
								</motion.div>

								<motion.div
									initial={{ x: -20, opacity: 0 }}
									animate={{ x: 0, opacity: 1 }}
									transition={{ delay: 0.7 }}
								>
									<input
										type='text'
										name='budget'
										value={formData.budget}
										onChange={handleChange}
										placeholder='Примерный бюджет'
										className='w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500'
									/>
								</motion.div>
							</div>

							<div className='flex flex-col gap-4'>
								<motion.button
									onClick={handleSubmitTelegram}
									disabled={isSubmitting}
									className='w-full py-3 bg-blue-500 text-white font-medium rounded-md hover:bg-blue-600 transition-colors flex items-center justify-center'
									whileHover={{ scale: 1.02 }}
									whileTap={{ scale: 0.98 }}
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ delay: 0.8 }}
								>
									<FaTelegram className='mr-2' size={20} />
									Отправить в Telegram
								</motion.button>

								<motion.button
									onClick={handleSubmitWhatsApp}
									disabled={isSubmitting || !formData.name || !formData.phone}
									className='w-full py-3 bg-green-500 text-white font-medium rounded-md hover:bg-green-600 transition-colors flex items-center justify-center'
									whileHover={{ scale: 1.02 }}
									whileTap={{ scale: 0.98 }}
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ delay: 0.9 }}
								>
									<FaWhatsapp className='mr-2' size={20} />
									Отправить в WhatsApp
								</motion.button>
							</div>

							<motion.div
								className='mt-4 text-center text-sm text-gray-500'
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								transition={{ delay: 1 }}
							>
								<label className='flex items-center justify-center'>
									<input
										type='checkbox'
										checked={true}
										readOnly
										className='mr-2'
									/>
									<span>
										Я соглашаюсь с{' '}
										<a href='#' className='text-red-500'>
											политикой конфиденциальности
										</a>{' '}
										и даю согласие на обработку персональных данных
									</span>
								</label>
							</motion.div>
						</div>
					</motion.div>
				</motion.div>
			)}
		</AnimatePresence>
	)
}

export default OrderModal
