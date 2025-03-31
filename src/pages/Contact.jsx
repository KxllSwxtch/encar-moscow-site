import { useState } from 'react'

const Contact = () => {
	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [message, setMessage] = useState('')

	const handleSubmit = (e) => {
		e.preventDefault()
		const whatsappMessage = `Здравствуйте! Меня зовут ${name}, моя почта: ${email}.\n\n${message}`
		const whatsappUrl = `https://wa.me/821032728558?text=${encodeURIComponent(
			whatsappMessage,
		)}`
		window.open(whatsappUrl, '_blank')
	}

	return (
		<section className='container mx-auto px-6 py-30 md:py-35'>
			<h1 className='text-3xl font-bold text-center mb-6'>Свяжитесь с нами</h1>
			<p className='text-center text-gray-600 mb-12'>
				Если у вас есть вопросы, мы всегда готовы помочь! Вы можете связаться с
				нами удобным для вас способом.
			</p>

			<div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
				{/* Контактная информация */}
				<div className='bg-gray-100 p-6 rounded-lg shadow-md'>
					<h2 className='text-xl font-semibold text-gray-800 mb-4'>
						Контактная информация
					</h2>
					<p className='text-gray-700 mt-4 font-semibold'>
						📱 WhatsApp контакты:
					</p>
					<p className='text-gray-700'>
						Вячеслав (Ген. Директор):{' '}
						<a
							href='https://wa.me/821032728558'
							className='text-green-600 hover:underline'
							target='_blank'
							rel='noopener noreferrer'
						>
							+82 10-3272-8558
						</a>{' '}
						/{' '}
						<a
							href='https://wa.me/79143491602'
							className='text-green-600 hover:underline'
							target='_blank'
							rel='noopener noreferrer'
						>
							+7 914 349 1602
						</a>
					</p>
					<p className='text-gray-700 mt-1'>
						Виктор (Менеджер):{' '}
						<a
							href='https://wa.me/821099802858'
							className='text-green-600 hover:underline'
							target='_blank'
							rel='noopener noreferrer'
						>
							+82 10-9980-2858
						</a>
					</p>
				</div>

				{/* Форма обратной связи */}
				<div className='bg-gray-100 p-6 rounded-lg shadow-md'>
					<h2 className='text-xl font-semibold text-gray-800 mb-4'>
						Оставьте сообщение
					</h2>
					<form className='flex flex-col space-y-4' onSubmit={handleSubmit}>
						<input
							type='text'
							placeholder='Ваше имя'
							className='p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
							value={name}
							onChange={(e) => setName(e.target.value)}
							required
						/>
						<input
							type='email'
							placeholder='Ваш email'
							className='p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							required
						/>
						<textarea
							placeholder='Ваше сообщение'
							rows='4'
							className='p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
							value={message}
							onChange={(e) => setMessage(e.target.value)}
							required
						></textarea>
						<button
							type='submit'
							className='bg-blue-600 text-white py-3 px-6 rounded-md hover:bg-blue-700 transition'
						>
							Отправить сообщение
						</button>
					</form>
				</div>
			</div>

			<div className='col-span-1 md:col-span-2 bg-white p-6 rounded-lg shadow-md'>
				<h2 className='text-xl font-semibold text-gray-800 mb-4'>Наши офисы</h2>
				<ul className='space-y-4'>
					<li>
						<p className='font-medium'>📍 Владивосток:</p>
						<p>Океанский проспект 17, 6 этаж, 616 кабинет</p>
						<div className='flex items-center mb-2'>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								fill='none'
								viewBox='0 0 24 24'
								strokeWidth={2}
								stroke='currentColor'
								className='w-5 h-5 text-red-600 mr-2'
							>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									d='M15 10a3 3 0 11-6 0 3 3 0 016 0z'
								/>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									d='M19.5 10c0 7.5-7.5 11.25-7.5 11.25S4.5 17.5 4.5 10a7.5 7.5 0 1115 0z'
								/>
							</svg>
							<span className='font-semibold text-gray-700'>
								Точное местоположение
							</span>
						</div>
						<iframe
							src='https://yandex.ru/map-widget/v1/?ll=131.919459%2C43.119543&mode=search&ol=geo&ouri=ymapsbm1%3A%2F%2Fgeo%3Fdata%3DCgg1Nzc4NjA3NxJs0KDQvtGB0YHQuNGPLCDQn9GA0LjQvNC-0YDRgdC60LjQuSDQutGA0LDQuSwg0JLQu9Cw0LTQuNCy0L7RgdGC0L7Quiwg0J7QutC10LDQvdGB0LrQuNC5INC_0YDQvtGB0L_QtdC60YIsIDE3IgoN8eIDQxVpeixC&sll=37.460708%2C55.837540&sspn=0.147629%2C0.084235&text=%D0%9E%D0%BA%D0%B5%D0%B0%D0%BD%D1%81%D0%BA%D0%B8%D0%B9%20%D0%BF%D1%80%D0%BE%D1%81%D0%BF%D0%B5%D0%BA%D1%82%2017%2C%206%20%D1%8D%D1%82%D0%B0%D0%B6%2C%20616%20%D0%BA%D0%B0%D0%B1%D0%B8%D0%BD%D0%B5%D1%82&z=13'
							width='100%'
							height='250'
							allowFullScreen='true'
							className='relative'
						></iframe>
					</li>
					<li>
						<p className='font-medium'>📍 Москва:</p>
						<p>Строительный проезд, 7Ак30</p>
						<div className='flex items-center mb-2'>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								fill='none'
								viewBox='0 0 24 24'
								strokeWidth={2}
								stroke='currentColor'
								className='w-5 h-5 text-red-600 mr-2'
							>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									d='M15 10a3 3 0 11-6 0 3 3 0 016 0z'
								/>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									d='M19.5 10c0 7.5-7.5 11.25-7.5 11.25S4.5 17.5 4.5 10a7.5 7.5 0 1115 0z'
								/>
							</svg>
							<span className='font-semibold text-gray-700'>
								Точное местоположение
							</span>
						</div>

						<iframe
							src='https://yandex.ru/map-widget/v1/?ll=37.460708%2C55.837540&mode=search&ol=geo&ouri=ymapsbm1%3A%2F%2Fgeo%3Fdata%3DCgg1Njc3Nzk5NBJK0KDQvtGB0YHQuNGPLCDQnNC-0YHQutCy0LAsINCh0YLRgNC-0LjRgtC10LvRjNC90YvQuSDQv9GA0L7QtdC30LQsIDfQkNC6MzAiCg0DthVCFaRZX0I%2C&sll=131.952120%2C43.797244&sspn=0.213547%2C0.108424&text=%D0%A1%D1%82%D1%80%D0%BE%D0%B8%D1%82%D0%B5%D0%BB%D1%8C%D0%BD%D1%8B%D0%B9%20%D0%BF%D1%80%D0%BE%D0%B5%D0%B7%D0%B4%2C%207%D0%90%D0%BA30&z=13'
							width='100%'
							height='250'
							allowFullScreen='true'
							className='relative'
						></iframe>
					</li>
					<li>
						<p className='font-medium'>📍 Южная Корея:</p>
						<p>
							Incheon 313 Central-ro, Yeonsu-gu, Incheon Metropolitan City, B
							2101
						</p>
						<iframe
							src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3164.8303577489766!2d126.67302617638438!3d37.3975057720896!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357b7d4c8792e7cd%3A0x79f8fc57ef402c84!2s313%20Central-ro%2C%20Yeonsu-gu%2C%20Incheon%2C%20South%20Korea!5e0!3m2!1sen!2skr!4v1711881549976!5m2!1sen!2skr'
							width='100%'
							height='250'
							style={{ border: 0 }}
							allowFullScreen=''
							loading='lazy'
							referrerPolicy='no-referrer-when-downgrade'
							title='Карта Южная Корея'
						></iframe>
					</li>
				</ul>
			</div>
		</section>
	)
}

export default Contact
