const Contact = () => {
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
					<p className='text-gray-700'>📍 Москва, Россия</p>
					<p className='text-gray-700 mt-2'>
						📞{' '}
						<a
							href='tel:+821032728558'
							className='text-blue-600 hover:underline'
						>
							+82 10-3272-8558
						</a>
					</p>
					<p className='text-gray-700 mt-2'>
						📧{' '}
						<a
							href='mailto:info@encarmoscow.ru'
							className='text-blue-600 hover:underline'
						>
							info@encarmoscow.ru
						</a>
					</p>
				</div>

				{/* Форма обратной связи */}
				<div className='bg-gray-100 p-6 rounded-lg shadow-md'>
					<h2 className='text-xl font-semibold text-gray-800 mb-4'>
						Оставьте сообщение
					</h2>
					<form className='flex flex-col space-y-4'>
						<input
							type='text'
							placeholder='Ваше имя'
							className='p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
						/>
						<input
							type='email'
							placeholder='Ваш email'
							className='p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
						/>
						<textarea
							placeholder='Ваше сообщение'
							rows='4'
							className='p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
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
		</section>
	)
}

export default Contact
