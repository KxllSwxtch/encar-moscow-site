import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import CalculatorSection from './CalculatorSection'

const HeroSection = () => {
	const [isModalOpen, setIsModalOpen] = useState(false)
	const [name, setName] = useState('')
	const [phone, setPhone] = useState('')
	const [message, setMessage] = useState('')

	const openModal = () => setIsModalOpen(true)
	const closeModal = () => setIsModalOpen(false)

	const handleSubmit = (e) => {
		e.preventDefault()
		const whatsappMessage = `Здравствуйте! Меня зовут ${name}. Мой номер телефона: ${phone}.\n\n${message}`
		const whatsappUrl = `https://wa.me/821032728558?text=${encodeURIComponent(
			whatsappMessage,
		)}`

		// Открытие WhatsApp в новой вкладке
		window.open(whatsappUrl, '_blank')
	}

	return (
		<section
			className='relative w-full h-[80vh] flex items-center justify-center bg-cover bg-center text-white px-5 mt-10 md:mt-0'
			style={{
				backgroundImage:
					"url('https://static.vecteezy.com/system/resources/previews/027/533/475/non_2x/car-or-bike-smokie-background-realistic-ai-generative-free-photo.jpg')",
			}}
		>
			{/* Затемнение для контраста */}
			<div className='absolute inset-0 bg-black opacity-70'></div>

			<div className='relative z-10 flex flex-col md:flex-row items-center max-w-6xl w-full'>
				{/* Текстовая часть */}
				<div className='w-full md:w-2/3 space-y-6'>
					<h1 className='text-4xl md:text-5xl font-bold uppercase leading-tight'>
						Автомобили из <br /> Южной Кореи под ключ <br />
						<span className='text-red-500'>без посредников</span>
					</h1>

					<ul className='space-y-3 text-lg'>
						<li className='flex items-start'>
							<span className='text-red-500 text-xl mr-3'>●</span>
							Полное сопровождение сделки от заключения договора <br />
							до вручения автомобиля.
						</li>
						<li className='flex items-start'>
							<span className='text-red-500 text-xl mr-3'>●</span>
							Профессиональные брокеры в России и странах СНГ
						</li>
					</ul>

					{/* Кнопки */}
					<div className='md:flex md:space-x-4 grid grid-cols-1 gap-2'>
						<button
							onClick={openModal}
							className='bg-red-600 hover:bg-red-800 text-white py-3 px-6 text-lg font-semibold rounded-md transition-colors duration-300 text-center cursor-pointer'
						>
							Рассчитать стоимость
						</button>
						<Link
							to='/catalog'
							rel='noopener noreferrer'
							className='bg-white text-red-600 hover:text-red-800 py-3 px-6 text-lg font-semibold rounded-md border border-red-600 hover:border-red-800 transition-colors duration-300 text-center'
						>
							Смотреть каталог автомобилей
						</Link>
					</div>
				</div>

				{/* Видео (YouTube Embed) */}
				<div className='hidden md:block w-full md:w-1/3'>
					<div className='relative w-full h-48 md:h-56'>
						<iframe
							className='w-full h-full rounded-md shadow-lg'
							src='https://www.youtube.com/embed/your-video-id?rel=0&showinfo=0&autoplay=0'
							title='Как заказать автомобиль'
							allowFullScreen
						></iframe>
					</div>
				</div>
			</div>

			{/* Модальное окно с анимацией */}
			<span id='calculator'></span>
			<AnimatePresence>
				{isModalOpen && (
					<motion.div
						className='fixed inset-0 flex items-center justify-center z-50 text-black before:content-[""] before:absolute before:inset-0 before:bg-black before:opacity-50'
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						onClick={(e) => {
							if (e.target === e.currentTarget) closeModal()
						}}
					>
						<motion.div
							className='bg-white p-8 rounded-lg shadow-lg w-full max-w-5xl relative'
							initial={{ y: -50, opacity: 0 }}
							animate={{ y: 0, opacity: 1 }}
							exit={{ y: -50, opacity: 0 }}
							transition={{ duration: 0.3, ease: 'easeInOut' }}
						>
							<button
								onClick={closeModal}
								className='absolute top-3 right-3 text-gray-600 hover:text-gray-900 text-2xl'
							>
								&times;
							</button>

							<h2 className='text-xl font-semibold mb-4 text-center cursor-pointer'>
								Рассчитать стоимость
							</h2>

							{/* Встраиваем калькулятор */}
							<CalculatorSection />

							<h3 className='text-lg font-semibold mt-6 text-center'>
								Оставить заявку
							</h3>

							{/* Форма заявки */}
							<form
								className='mt-4 space-y-4 text-black'
								onSubmit={handleSubmit}
							>
								<input
									type='text'
									placeholder='Ваше имя'
									className='w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 text-black'
									value={name}
									onChange={(e) => setName(e.target.value)}
									required
								/>
								<input
									type='tel'
									placeholder='Ваш телефон'
									className='w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 text-black'
									value={phone}
									onChange={(e) => setPhone(e.target.value)}
									required
								/>
								<textarea
									placeholder='Ваше сообщение'
									rows='3'
									className='w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 text-black'
									value={message}
									onChange={(e) => setMessage(e.target.value)}
								></textarea>
								<button
									type='submit'
									className='bg-red-600 hover:bg-red-800 text-white py-3 px-6 rounded-md w-full text-lg font-semibold transition cursor-pointer'
								>
									Отправить заявку
								</button>
							</form>
						</motion.div>
					</motion.div>
				)}
			</AnimatePresence>
		</section>
	)
}

export default HeroSection
