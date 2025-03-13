import { useState } from 'react'
import { motion } from 'framer-motion'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { Link } from 'react-router-dom'

const menuVariants = {
	hidden: { x: '100%' },
	visible: {
		x: 0,
		transition: { type: 'spring', stiffness: 100, damping: 15 },
	},
	exit: { x: '100%', transition: { ease: 'easeInOut', duration: 0.3 } },
}

const backdropVariants = {
	hidden: { opacity: 0 },
	visible: { opacity: 0.3, transition: { duration: 0.3 } }, // Полупрозрачность 30%
	exit: { opacity: 0, transition: { duration: 0.3 } },
}

const Header = () => {
	const [menuOpen, setMenuOpen] = useState(false)

	const toggleMenu = () => {
		setMenuOpen(!menuOpen)
	}

	return (
		<header className='fixed top-0 left-0 w-full bg-white shadow-md z-50'>
			{/* Desktop Header */}
			<div className='hidden md:flex justify-between items-center'>
				<Link to='/' className='flex items-center space-x-2'>
					<img
						src='https://encarrussia.ru/thumb/2/AbZl4VMNdZKS2i9wRkMZ1g/1200r1200/d/photo-2024-06-30-16-41-51_1_1.jpg'
						alt='Logo'
						className='h-20 ml-20'
					/>
				</Link>

				<nav className='hidden md:flex space-x-6 text-lg font-semibold'>
					<Link to='/about' className='hover:text-red-500'>
						О нас
					</Link>
					<Link to='/catalog' className='hover:text-red-500'>
						Каталог автомобилей
					</Link>
					<Link to='/contact' className='hover:text-red-500'>
						Контакты
					</Link>
				</nav>

				<div className='flex items-center space-x-4'>
					<a href='tel:+821032728558' className='text-gray-700 font-semibold'>
						+82 10-3272-8558
					</a>
					<a
						href='https://t.me/yourchannel'
						className='text-red-600 hover:opacity-80'
					>
						<i className='fab fa-telegram-plane text-2xl'></i>
					</a>
					<a
						href='https://wa.me/821032728558'
						className='text-red-600 hover:opacity-80'
					>
						<i className='fab fa-whatsapp text-2xl'></i>
					</a>
					<a
						href='https://instagram.com/yourprofile'
						className='text-red-600 hover:opacity-80'
					>
						<i className='fab fa-instagram text-2xl'></i>
					</a>
					<Link to='/favorites' className='text-gray-700 hover:text-red-600'>
						<i className='far fa-heart text-2xl'></i>
					</Link>
				</div>
			</div>

			{/* Mobile Header */}
			<div className='flex md:hidden justify-between items-center px-4 py-4'>
				<img
					src='https://encarrussia.ru/thumb/2/AbZl4VMNdZKS2i9wRkMZ1g/1200r1200/d/photo-2024-06-30-16-41-51_1_1.jpg'
					alt='Logo'
					className='h-8'
				/>
				<button onClick={toggleMenu} className='text-gray-700'>
					{menuOpen ? (
						<XMarkIcon className='w-8 h-8' />
					) : (
						<Bars3Icon className='w-8 h-8' />
					)}
				</button>
			</div>

			{/* Полупрозрачный фон + Mobile Menu */}
			{menuOpen && (
				<>
					{/* Полупрозрачный фон */}
					<motion.div
						className='fixed inset-0 bg-black bg-opacity-50 backdrop-blur-md z-40'
						variants={backdropVariants}
						initial='hidden'
						animate='visible'
						exit='exit'
						onClick={() => setMenuOpen(false)} // Теперь меню закроется правильно
					/>

					{/* Mobile Menu */}
					<motion.div
						variants={menuVariants}
						initial='hidden'
						animate='visible'
						exit='exit'
						className='fixed top-0 right-0 w-[85%] h-screen bg-white p-6 z-50 flex flex-col justify-between shadow-lg'
					>
						{/* Логотип и кнопка закрытия */}
						<div className='flex justify-between items-center'>
							<img
								src='https://encarrussia.ru/thumb/2/AbZl4VMNdZKS2i9wRkMZ1g/1200r1200/d/photo-2024-06-30-16-41-51_1_1.jpg'
								alt='Logo'
								className='h-20 mx-auto'
							/>
							<button
								onClick={() => setMenuOpen(false)}
								className='text-gray-700'
							>
								<XMarkIcon className='w-8 h-8' />
							</button>
						</div>

						{/* Навигация */}
						<nav className='flex flex-col space-y-4 text-xl font-semibold'>
							<Link
								to='/about'
								className='hover:text-red-500'
								onClick={toggleMenu}
							>
								О нас
							</Link>
							<Link
								to='/catalog'
								className='hover:text-red-500'
								onClick={toggleMenu}
							>
								Каталог автомобилей
							</Link>
							<Link
								to='/calculator'
								className='hover:text-red-500'
								onClick={toggleMenu}
							>
								Узнать стоимость
							</Link>
							<Link
								to='/favorites'
								className='hover:text-red-500'
								onClick={toggleMenu}
							>
								Избранное
							</Link>
							<Link
								to='/brands'
								className='hover:text-red-500'
								onClick={toggleMenu}
							>
								Марки авто
							</Link>
						</nav>

						{/* Контакты */}
						<div className='flex flex-col items-center text-lg font-semibold'>
							<a href='tel:+821032728558' className='text-black'>
								+82 10-3272-8558
							</a>
							<div className='flex space-x-4 mt-4'>
								<a
									href='https://instagram.com/yourprofile'
									className='text-red-600 text-3xl'
								>
									<i className='fab fa-instagram'></i>
								</a>
								<a
									href='https://wa.me/821032728558'
									className='text-red-600 text-3xl'
								>
									<i className='fab fa-whatsapp'></i>
								</a>
								<a href='tel:+821051402772' className='text-red-600 text-3xl'>
									<i className='fas fa-phone-alt'></i>
								</a>
								<a
									href='https://t.me/yourchannel'
									className='text-red-600 text-3xl'
								>
									<i className='fab fa-telegram-plane'></i>
								</a>
							</div>
						</div>

						{/* Кнопка расчета стоимости */}
						<Link
							to='/calculator'
							className='bg-red-600 text-white py-4 px-6 text-center rounded-md text-lg font-semibold w-full'
							onClick={toggleMenu}
						>
							Расчет стоимости
						</Link>
					</motion.div>
				</>
			)}
		</header>
	)
}

export default Header
