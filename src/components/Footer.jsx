import { Link } from 'react-router-dom'

const Footer = () => {
	return (
		<footer className='bg-white text-black py-12'>
			<div className='container mx-auto px-6 flex flex-col md:flex-row justify-between items-center'>
				{/* Логотип */}
				<div className='mb-6 md:mb-0 flex flex-col items-center md:items-start'>
					<Link to='/'>
						<img
							src='https://res.cloudinary.com/pomegranitedesign/image/upload/v1742517574/EncarMoscow/encar_logo.webp'
							alt='Encar Moscow Logo'
							className='h-14'
						/>
					</Link>
					<p className='text-gray-400 mt-3 text-sm text-center md:text-left'>
						Надежные автомобили из Южной Кореи
					</p>
				</div>

				{/* Навигация */}
				<nav className='flex flex-wrap justify-center md:justify-start space-x-6 text-sm uppercase font-semibold'>
					<a href='/about' className='hover:text-red-500 transition'>
						О нас
					</a>
					<a href='/catalog' className='hover:text-red-500 transition'>
						Каталог
					</a>
					<a href='/contact' className='hover:text-red-500 transition'>
						Контакты
					</a>
					<a href='#calculator' className='hover:text-red-500 transition'>
						Калькулятор
					</a>
				</nav>

				{/* Контакты */}
				<div className='text-sm mt-6 md:mt-0 text-center md:text-left'>
					<p>📍 Москва, Россия</p>
					<p className='mt-1'>
						📞{' '}
						<a
							href='tel:+821032728558'
							className='hover:text-red-500 transition'
						>
							+82 10-3272-8558
						</a>
					</p>
					<p className='mt-1'>
						📧{' '}
						<a
							href='mailto:info@encarmoscow.ru'
							className='hover:text-red-500 transition'
						>
							info@encarmoscow.ru
						</a>
					</p>
				</div>
			</div>

			{/* Разделитель */}
			<div className='border-t border-gray-700 my-6'></div>

			{/* Социальные сети */}
			<div className='flex justify-center space-x-6'>
				<a
					href='https://t.me/yourchannel'
					className='text-red-500 text-2xl hover:opacity-80 transition'
				>
					<i className='fab fa-telegram-plane'></i>
				</a>
				<a
					href='https://wa.me/821032728558'
					className='text-red-500 text-2xl hover:opacity-80 transition'
				>
					<i className='fab fa-whatsapp'></i>
				</a>
				<a
					href='https://www.instagram.com/koreaexcar/'
					className='text-red-500 text-2xl hover:opacity-80 transition'
				>
					<i className='fab fa-instagram'></i>
				</a>
			</div>

			{/* Копирайт */}
			<div className='mt-6 text-center text-sm text-gray-500'>
				© {new Date().getFullYear()} Encar Moscow. Все права защищены.
			</div>
		</footer>
	)
}

export default Footer
