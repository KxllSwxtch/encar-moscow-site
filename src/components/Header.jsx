import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

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
	const auth = useAuth()
	const [menuOpen, setMenuOpen] = useState(false)
	const [showHeader, setShowHeader] = useState(false)
	const location = useLocation()

	useEffect(() => {
		if (location.pathname !== '/') {
			setShowHeader(true)
			return
		}

		const handleScroll = () => {
			if (window.scrollY > 10) {
				setShowHeader(true)
			} else {
				setShowHeader(false)
			}
		}

		window.addEventListener('scroll', handleScroll)
		return () => {
			window.removeEventListener('scroll', handleScroll)
		}
	}, [location])

	const toggleMenu = () => {
		setMenuOpen(!menuOpen)
	}

	if (!auth) return null
	const { user } = auth

	return (
		<motion.header
			className='fixed top-0 left-0 w-full bg-white z-50 shadow-md'
			initial={{ opacity: 0, y: -50 }}
			animate={{ opacity: showHeader ? 1 : 0, y: showHeader ? 0 : -50 }}
			transition={{ duration: 0.3 }}
		>
			{/* Desktop Header */}
			<div className='hidden md:flex justify-between items-center'>
				<Link to='/' className='flex items-center space-x-2'>
					<img
						src='https://res.cloudinary.com/pomegranitedesign/image/upload/v1742517574/EncarMoscow/encar_logo.webp'
						alt='Logo'
						className='h-25 ml-20'
					/>
				</Link>

				<nav className='hidden md:flex space-x-6 text-lg font-semibold'>
					<Link
						to='/about'
						className='hover:text-red-500 transition-all duration-300'
					>
						О нас
					</Link>
					<Link
						to='/catalog'
						className='hover:text-red-500 transition-all duration-300'
					>
						Каталог автомобилей
					</Link>
					<Link
						to='/contact'
						className='hover:text-red-500 transition-all duration-300'
					>
						Контакты
					</Link>
					<Link
						className='hover:text-red-500 transition-all duration-300'
						to='/why-us'
					>
						7 причин выбрать нас
					</Link>
					<Link to='/for-partners'>Для партнёров</Link>
					{user ? (
						user.role === 'manager' ? (
							<Link
								to='/manager-dashboard'
								className='hover:text-red-500 transition-all duration-300'
							>
								Панель менеджера
							</Link>
						) : (
							<Link
								to='/my-cars'
								className='hover:text-red-500 transition-all duration-300'
							>
								Мои авто
							</Link>
						)
					) : (
						<Link
							to='/signup'
							className='hover:text-red-500 transition-all duration-300'
						>
							Вход / Регистрация
						</Link>
					)}
				</nav>

				<div className='flex items-center space-x-4'>
					<p>Вячеслав</p>
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
				<Link to='/'>
					<img
						src='https://res.cloudinary.com/pomegranitedesign/image/upload/v1742517574/EncarMoscow/encar_logo.webp'
						alt='Logo'
						className='h-8'
					/>
				</Link>
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
							<Link to='/'>
								<img
									src='https://res.cloudinary.com/pomegranitedesign/image/upload/v1742517574/EncarMoscow/encar_logo.webp'
									alt='Logo'
									className='h-20 mx-auto'
								/>
							</Link>
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
								className='hover:text-red-500 transition-all duration-300'
								to='/why-us'
							>
								7 причин выбрать нас
							</Link>
							<Link
								to='/favorites'
								className='hover:text-red-500'
								onClick={toggleMenu}
							>
								Избранное
							</Link>
							{user ? (
								user.role === 'manager' ? (
									<Link
										to='/manager-dashboard'
										className='hover:text-red-500'
										onClick={toggleMenu}
									>
										Панель менеджера
									</Link>
								) : (
									<Link
										to='/my-cars'
										className='hover:text-red-500'
										onClick={toggleMenu}
									>
										Мои авто
									</Link>
								)
							) : (
								<Link
									to='/signup'
									className='hover:text-red-500'
									onClick={toggleMenu}
								>
									Вход / Регистрация
								</Link>
							)}
						</nav>

						{/* Контакты */}
						<div className='flex flex-col items-center text-lg font-semibold'>
							<p>Вячеслав</p>
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
		</motion.header>
	)
}

export default Header
