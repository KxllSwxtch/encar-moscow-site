import { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import axios from 'axios'
import CalculatorSection from './CalculatorSection'
import { translations, translateSmartly } from '../translations'

const HeroSection = () => {
	const [isModalOpen, setIsModalOpen] = useState(false)
	const [name, setName] = useState('')
	const [phone, setPhone] = useState('')
	const [message, setMessage] = useState('')
	const [latestVideoId, setLatestVideoId] = useState(null)

	// Состояния для выбора автомобиля
	const [manufacturers, setManufacturers] = useState(null)
	const [selectedManufacturer, setSelectedManufacturer] = useState('')

	const [modelGroups, setModelGroups] = useState(null)
	const [selectedModelGroup, setSelectedModelGroup] = useState('')

	const [models, setModels] = useState(null)
	const [selectedModel, setSelectedModel] = useState('')

	const navigate = useNavigate()

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

	// Функция для перехода в каталог с выбранными параметрами
	const handleSearchCars = () => {
		const searchParams = new URLSearchParams()

		if (selectedManufacturer) {
			searchParams.append('manufacturer', selectedManufacturer)
		}

		if (selectedModelGroup) {
			searchParams.append('modelGroup', selectedModelGroup)
		}

		if (selectedModel) {
			searchParams.append('model', selectedModel)
		}

		if (searchParams.toString()) {
			navigate(`/catalog?${searchParams.toString()}`)
		} else {
			navigate('/catalog')
		}
	}

	useEffect(() => {
		const fetchLatestVideo = async () => {
			const API_KEY = 'AIzaSyAB3idei-7vTnDclriYXU_Fp_QEnsEvGKk' // Заменить на свой API ключ
			const CHANNEL_ID = 'UCOkFdDKSE_ECh-PFE2kBQTA' // ID канала KoreaExCar
			const API_URL = `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&channelId=${CHANNEL_ID}&order=date&part=snippet&type=video&maxResults=1`

			try {
				const response = await fetch(API_URL)
				const data = await response.json()
				if (data.items.length > 0) {
					setLatestVideoId(data.items[0].id.videoId)
				}
			} catch (error) {
				console.error('Ошибка загрузки видео:', error)
			}
		}

		fetchLatestVideo()
	}, [])

	// Загружаем список производителей
	useEffect(() => {
		const fetchManufacturers = async () => {
			const url = `https://encar-proxy.habsida.net/api/nav?count=true&q=(And.Hidden.N._.SellType.%EC%9D%BC%EB%B0%98._.CarType.A.)&inav=%7CMetadata%7CSort`

			try {
				const response = await axios.get(url)
				const data = response.data

				// data -> iNav -> Nodes[2] -> Nodes[2]?.Facets -> Nodes[2]?.Facets[0]?.Refinements?.Nodes[0]?.Facets
				const manufacturersList =
					data?.iNav?.Nodes[1]?.Facets[0]?.Refinements?.Nodes[0]?.Facets

				setManufacturers(manufacturersList)
			} catch (error) {
				console.error('Ошибка при загрузке производителей:', error)
			}
		}

		fetchManufacturers()
	}, [])

	// Загружаем модели
	useEffect(() => {
		const fetchModelGroups = async () => {
			if (!selectedManufacturer) {
				setModelGroups(null)
				setSelectedModelGroup('')
				return
			}

			const url = `https://encar-proxy.habsida.net/api/nav?count=true&q=(And.Hidden.N._.SellType.%EC%9D%BC%EB%B0%98._.(C.CarType.A._.Manufacturer.${selectedManufacturer}.))&inav=%7CMetadata%7CSort`

			try {
				const response = await axios.get(url)
				const data = response?.data

				// data?.iNav?.Nodes[2]?.Facets[0]?.Refinements?.Nodes[0]?.Facets
				const allManufacturers =
					data?.iNav?.Nodes[2]?.Facets[0]?.Refinements?.Nodes[0]?.Facets

				const filteredManufacturer = allManufacturers.filter(
					(item) => item.IsSelected === true,
				)[0]

				const models = filteredManufacturer?.Refinements?.Nodes[0]?.Facets

				setModelGroups(models)
			} catch (error) {
				console.error('Ошибка при загрузке моделей:', error)
			}
		}

		fetchModelGroups()
	}, [selectedManufacturer])

	// Загружаем поколения
	useEffect(() => {
		const fetchModels = async () => {
			if (!selectedModelGroup || !selectedManufacturer) {
				setModels(null)
				setSelectedModel('')
				return
			}

			const url = `https://encar-proxy.habsida.net/api/nav?count=true&q=(And.Hidden.N._.SellType.%EC%9D%BC%EB%B0%98._.(C.CarType.A._.(C.Manufacturer.${selectedManufacturer}._.ModelGroup.${selectedModelGroup}.)))&inav=%7CMetadata%7CSort`

			try {
				const response = await axios.get(url)
				const data = response?.data

				const allManufacturers =
					data?.iNav?.Nodes[2]?.Facets[0]?.Refinements?.Nodes[0]?.Facets

				const filteredManufacturer = allManufacturers.filter(
					(item) => item.IsSelected === true,
				)[0]

				const modelGroup = filteredManufacturer?.Refinements?.Nodes[0]?.Facets
				const filteredModel = modelGroup.filter(
					(item) => item.IsSelected === true,
				)[0]
				const modelsList = filteredModel?.Refinements?.Nodes[0]?.Facets

				setModels(modelsList)
			} catch (error) {
				console.error('Ошибка при загрузке поколений:', error)
			}
		}

		fetchModels()
	}, [selectedManufacturer, selectedModelGroup])

	return (
		<section
			className='relative w-full h-full md:h-screen flex items-center justify-center bg-cover bg-center text-white px-5 pt-30 pb-20 md:pt-0 md:pb-0'
			style={{
				backgroundImage:
					"url('https://static.vecteezy.com/system/resources/previews/027/533/475/non_2x/car-or-bike-smokie-background-realistic-ai-generative-free-photo.jpg')",
			}}
		>
			{/* Затемнение для контраста */}
			<div className='absolute inset-0 bg-black opacity-70'></div>

			<div className='relative z-10 flex flex-col md:flex-row items-center max-w-6xl w-full gap-10'>
				{/* Текстовая часть */}
				<div className='w-full md:w-2/3 space-y-6'>
					<motion.h1
						className='text-4xl md:text-5xl font-bold uppercase leading-tight'
						initial={{ opacity: 0, y: 40 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
					>
						Автомобили из <br /> Южной Кореи под ключ <br />
						<span className='text-red-500'>Выгода до 30%</span>
					</motion.h1>

					<motion.ul
						className='space-y-3 text-lg'
						initial={{ opacity: 0, y: 40 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, ease: 'easeOut', delay: 0.4 }}
					>
						<li className='flex items-start'>
							<span className='text-red-500 text-xl mr-3'>●</span>
							Полное сопровождение сделки от заключения договора <br />
							до вручения автомобиля.
						</li>
						<li className='flex items-start'>
							<span className='text-red-500 text-xl mr-3'>●</span>
							Профессиональные брокеры в России и странах СНГ
						</li>
					</motion.ul>

					{/* Форма поиска автомобиля */}
					<div className='bg-white/10 backdrop-blur-sm p-4 rounded-lg border border-white/20'>
						<h3 className='text-xl font-semibold mb-3 text-center'>
							Подобрать автомобиль
						</h3>
						<div className='grid grid-cols-1 md:grid-cols-3 gap-3'>
							<select
								className='w-full bg-white border border-gray-300 rounded-md px-3 py-2 text-gray-800 appearance-none shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200'
								value={selectedManufacturer}
								onChange={(e) => setSelectedManufacturer(e.target.value)}
								style={{
									backgroundImage:
										'url("data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 fill=%22none%22 viewBox=%220 0 24 24%22 stroke=%22%23666%22%3E%3Cpath stroke-linecap=%22round%22 stroke-linejoin=%22round%22 stroke-width=%222%22 d=%22M19 9l-7 7-7-7%22%3E%3C/path%3E%3C/svg%3E")',
									backgroundRepeat: 'no-repeat',
									backgroundPosition: 'right 0.5rem center',
									backgroundSize: '1.5em 1.5em',
									paddingRight: '2.5rem',
								}}
							>
								<option value=''>Выберите марку</option>
								{manufacturers
									?.filter((manufacturer) => manufacturer.Count > 0)
									.map((manufacturer, index) => (
										<option key={index} value={manufacturer.Value}>
											{translateSmartly(manufacturer.Value)}
										</option>
									))}
							</select>

							<select
								disabled={!selectedManufacturer}
								className='w-full bg-white border border-gray-300 rounded-md px-3 py-2 text-gray-800 appearance-none shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200 disabled:bg-gray-200 disabled:opacity-70'
								value={selectedModelGroup}
								onChange={(e) => setSelectedModelGroup(e.target.value)}
								style={{
									backgroundImage:
										'url("data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 fill=%22none%22 viewBox=%220 0 24 24%22 stroke=%22%23666%22%3E%3Cpath stroke-linecap=%22round%22 stroke-linejoin=%22round%22 stroke-width=%222%22 d=%22M19 9l-7 7-7-7%22%3E%3C/path%3E%3C/svg%3E")',
									backgroundRepeat: 'no-repeat',
									backgroundPosition: 'right 0.5rem center',
									backgroundSize: '1.5em 1.5em',
									paddingRight: '2.5rem',
								}}
							>
								<option value=''>Выберите модель</option>
								{modelGroups
									?.filter((modelGroup) => modelGroup.Count > 0)
									.map((modelGroup, index) => (
										<option key={index} value={modelGroup.Value}>
											{translateSmartly(modelGroup.Value)}
										</option>
									))}
							</select>

							<select
								disabled={!selectedModelGroup}
								className='w-full bg-white border border-gray-300 rounded-md px-3 py-2 text-gray-800 appearance-none shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200 disabled:bg-gray-200 disabled:opacity-70'
								value={selectedModel}
								onChange={(e) => setSelectedModel(e.target.value)}
								style={{
									backgroundImage:
										'url("data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 fill=%22none%22 viewBox=%220 0 24 24%22 stroke=%22%23666%22%3E%3Cpath stroke-linecap=%22round%22 stroke-linejoin=%22round%22 stroke-width=%222%22 d=%22M19 9l-7 7-7-7%22%3E%3C/path%3E%3C/svg%3E")',
									backgroundRepeat: 'no-repeat',
									backgroundPosition: 'right 0.5rem center',
									backgroundSize: '1.5em 1.5em',
									paddingRight: '2.5rem',
								}}
							>
								<option value=''>Выберите поколение</option>
								{models
									?.filter((model) => model.Count > 0)
									.map((model, index) => (
										<option key={index} value={model.Value}>
											{translations[model.Value] ||
												translateSmartly(model.Value) ||
												model.Value}
										</option>
									))}
							</select>
						</div>

						<div className='mt-3'>
							<button
								onClick={handleSearchCars}
								className='bg-red-600 hover:bg-red-800 text-white py-2 px-6 w-full font-semibold rounded-md transition-colors duration-300 text-center cursor-pointer'
							>
								Поиск автомобилей
							</button>
						</div>
					</div>

					<div className='md:flex md:space-x-4 grid grid-cols-1 gap-2'>
						<button
							onClick={openModal}
							className='bg-red-600 hover:bg-red-800 text-white py-3 px-6 text-lg font-semibold rounded-md transition-colors duration-300 text-center cursor-pointer'
						>
							Рассчитать стоимость
						</button>
					</div>
				</div>

				{/* Видео (YouTube Embed) */}
				{latestVideoId && (
					<div className='mt-20 md:mt-0 block w-full md:w-1/3'>
						<div className='relative w-full h-48 md:h-130'>
							<iframe
								className='w-full h-full rounded-md shadow-lg'
								src={`https://www.youtube.com/embed/${latestVideoId}?rel=0&showinfo=0&autoplay=1&controls=0`}
								title='Последнее видео с Youtube канала KoreaExCar'
								allow='autoplay; encrypted-media'
								allowFullScreen
							></iframe>
						</div>
					</div>
				)}
			</div>

			{/* Модальное окно с анимацией */}
			<span id='calculator'></span>
			<AnimatePresence>
				{isModalOpen && (
					<motion.div
						className=' fixed inset-0 z-50 text-black overflow-auto pt-10 md:pt-20'
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						onClick={(e) => {
							if (e.target === e.currentTarget) closeModal()
						}}
					>
						<motion.div
							className='bg-white p-8 rounded-lg shadow-lg mx-auto w-full max-w-3xl md:mt-20 relative'
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

			{/* Анимированная стрелка вниз */}
			<button
				onClick={() =>
					window.scrollBy({ top: window.innerHeight * 0.9, behavior: 'smooth' })
				}
				className='absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 cursor-pointer'
			>
				<motion.div
					animate={{ y: [0, 10, 0] }}
					transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
				>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						fill='none'
						viewBox='0 0 24 24'
						strokeWidth={2}
						stroke='white'
						className='w-8 h-8 animate-bounce'
					>
						<path
							strokeLinecap='round'
							strokeLinejoin='round'
							d='M19 9l-7 7-7-7'
						/>
					</svg>
				</motion.div>
			</button>
		</section>
	)
}

export default HeroSection
