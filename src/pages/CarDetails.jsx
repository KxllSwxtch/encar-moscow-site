import axios from 'axios'
import * as cheerio from 'cheerio'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination } from 'swiper/modules'
import {
	FaInstagram,
	FaTelegram,
	FaWhatsapp,
	FaShoppingCart,
} from 'react-icons/fa'
import { doc, getDoc, setDoc, updateDoc, arrayUnion } from 'firebase/firestore'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import {
	Loader,
	CarInspection,
	KazakhstanCalculator,
	OrderModal,
} from '../components'
import { useAuth } from '../hooks/useAuth'
import { db } from '../firebase'

const translations = {
	price: 'Цена в Корее (₩)',
	연식: 'Год выпуска',
	최초등록일: 'Дата первой регистрации',
	연료: 'Тип топлива',
	휘발유: 'Бензин',
	가솔린: 'Бензин',
	경유: 'Дизель',
	전기: 'Электро',
	하이브리드: 'Гибрид',
	변속기: 'Трансмиссия',
	오토: 'Автомат',
	수동: 'Механика',
	색상: 'Цвет',
	흰색: 'Белый',
	검정색: 'Чёрный',
	회색: 'Серый',
	파란색: 'Синий',
	빨간색: 'Красный',
	주행거리: 'Пробег',
	차량번호: 'Гос. номер',
	차대번호: 'VIN-номер',
	'압류｜저당': 'Был в ДТП',
	'0건｜0건': 'Нет',
	모델명: 'Модель',
	세금미납: 'Задолженность по налогам',
	없음: 'Отсутствует',
	제시번호: 'Номер предложения',
	'가솔린+전기': 'Гибрид',
}

const colorTranslations = {
	흰색: 'Белый',
	검정색: 'Чёрный',
	회색: 'Серый',
	파란색: 'Синий',
	빨간색: 'Красный',
	은색: 'Серебристый',
	녹색: 'Зелёный',
	노란색: 'Жёлтый',
	주황색: 'Оранжевый',
	보라색: 'Фиолетовый',
	갈색: 'Коричневый',
	베이지색: 'Бежевый',
	분홍색: 'Розовый',
	금색: 'Золотой',
	청록색: 'Бирюзовый',
	기타: 'Другой',
	쥐색: 'Тёмно-серый',
	은회색: 'Серебристый',
}

const CarDetails = () => {
	const [vehicleId, setVehicleId] = useState(null)
	// const [calculatedResultKZ, setCalculatedResultKZ] = useState(null)

	const [usdKrwRate, setUsdKrwRate] = useState(null)
	const [usdRubRate, setUsdRubRate] = useState(null)
	const [usdKztRate, setUsdKztRate] = useState(null)
	// const [usdEurRate, setUsdEurRate] = useState(null)
	const [usdtRubRates, setUsdtRubRates] = useState(null)

	const [car, setCar] = useState(null)
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(null)
	const [selectedCountry, setSelectedCountry] = useState(null)
	const [loadingCalc, setLoadingCalc] = useState(false)
	const [errorCalc, setErrorCalc] = useState('')
	const [calculatedResult, setCalculatedResult] = useState(null)
	const [drivetrain, setDrivetrain] = useState('')
	const [isOrderModalOpen, setIsOrderModalOpen] = useState(false)

	const { carId } = useParams()
	const { user } = useAuth() // Пользователь

	useEffect(() => {
		const fetchCar = async () => {
			try {
				setLoading(true)
				const response = await axios.get(
					`https://api.encar.com/v1/readside/vehicle/${carId}`,
				)

				setCar(response.data)
				setVehicleId(response?.data?.vehicleId)
			} catch (err) {
				setError('Ошибка при загрузке данных')
				console.error(err)
			} finally {
				setLoading(false)
			}
		}

		if (carId) fetchCar()
	}, [carId])

	useEffect(() => {
		if (!vehicleId) return

		const fetchInspectionData = async () => {
			try {
				const gradeDrive = car?.category?.gradeEnglishName?.toUpperCase()
				if (gradeDrive?.includes('2WD')) {
					setDrivetrain('2WD')
					return
				}
				if (gradeDrive?.includes('4WD') || gradeDrive?.includes('AWD')) {
					setDrivetrain('AWD / 4WD')
					return
				}
				if (gradeDrive?.includes('RWD')) {
					setDrivetrain('RWD')
					return
				}
				const response = await axios.get(
					`https://api.encar.com/v1/readside/inspection/vehicle/${vehicleId}`,
				)

				const data = response?.data
				if (!data?.inners) {
					setDrivetrain('')
					return
				}

				const powertrain = data.inners.find(
					(item) =>
						item.type?.code === 'S03' && item.type?.title === '동력전달',
				)

				if (!powertrain || !powertrain.children) {
					setDrivetrain('')
					return
				}

				const drivetrainText = powertrain?.children?.find(
					(c) =>
						typeof c.description === 'string' && c.description.includes('WD'),
				)?.description
				const titles = powertrain.children.map((c) => c.type?.title)
				const hasDifferential = titles.includes('디피렌셜 기어')
				const hasCVJoint = titles.includes('등속조인트')
				const hasDriveShaft = titles.includes('추친축 및 베어링')

				if (drivetrainText) {
					setDrivetrain(drivetrainText)
				} else if (hasDifferential && hasCVJoint && hasDriveShaft) {
					setDrivetrain('AWD / 4WD')
				} else if (hasDifferential && (hasDriveShaft || hasCVJoint)) {
					setDrivetrain('RWD')
				} else if (!hasDifferential && hasCVJoint) {
					setDrivetrain('FWD')
				} else {
					setDrivetrain('2WD')
				}
			} catch (error) {
				console.warn(
					'Inspection fetch failed or empty, fallback to empty drivetrain.',
				)
				setDrivetrain('')
			}
		}

		fetchInspectionData()
	}, [vehicleId])

	useEffect(() => {
		const fetchUsdKrwRate = async () => {
			try {
				const response = await axios.get(
					'https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/usd.json',
				)

				if (response.status === 200) {
					const jsonData = response.data
					const rate = jsonData['usd']['krw']
					const usdRubRate = jsonData['usd']['rub']
					const usdKztRate = jsonData['usd']['kzt']

					setUsdKrwRate(rate)
					setUsdRubRate(usdRubRate)
					setUsdKztRate(usdKztRate + 3)
				}
			} catch (error) {
				console.error(error)
			}
		}

		fetchUsdKrwRate()
	}, [])

	useEffect(() => {
		const fetchUsdtRubRates = async () => {
			const url = `https://corsproxy.io/?url=${encodeURIComponent(
				'https://www.bestchange.ru/action.php?lang=ru',
			)}`

			try {
				// Создаем FormData для запроса
				const formData = new URLSearchParams({
					action: 'getrates',
					page: 'rates',
					from: '91',
					to: '10',
					city: '1',
					type: '',
					give: '',
					get: '',
					commission: '0',
					light: '0',
					sort: 'from',
					range: 'asc',
					sortm: '0',
					tsid: '0',
				})

				// Отправляем POST-запрос
				const response = await axios.post(url, formData, {
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded',
					},
				})

				// Загружаем HTML в cheerio
				const $ = cheerio.load(response.data)

				// Парсим таблицу
				const parsedData = []
				$('tbody tr').each((index, element) => {
					const row = $(element)
					const fsText = row.find('td.bi div.fs').text().trim() // Получаем текст из <div class="fs">
					const formattedFsText = parseFloat(fsText.split(' ')[0])

					if (fsText) parsedData.push(formattedFsText)
				})

				// Сохраняем в состояние
				setUsdtRubRates(parsedData)
			} catch (error) {
				console.error('Ошибка при получении данных:', error)
			}
		}

		fetchUsdtRubRates()
	}, [])

	const handleAddToFavorites = async () => {
		if (!user) {
			alert(
				'Для того чтобы добавить этот автомобиль в избранное, пожалуйста зарегистрируйтесь или войдите в ваш аккаунт.',
			)
			return
		}

		try {
			const userRef = doc(db, 'users', user.uid)
			const docSnap = await getDoc(userRef)

			if (!docSnap.exists()) {
				await setDoc(userRef, {
					email: user.email,
					favorites: [carId],
				})
			} else {
				await updateDoc(userRef, {
					favorites: arrayUnion(carId),
				})
			}

			alert('Автомобиль добавлен в избранное!')
		} catch (error) {
			console.error('Ошибка при добавлении в избранное:', error)
		}
	}

	// Расчёт под ключ до РФ
	const handleCalculate = async () => {
		setLoadingCalc(true)
		setErrorCalc('')

		try {
			const response = await axios.post(
				'https://calcus.ru/calculate/Customs',
				new URLSearchParams({
					owner: 1,
					age: calculateAge(parseInt(car?.category?.formYear)),
					engine: car?.spec?.fuelName === '가솔린' ? 1 : 2,
					power: 1,
					power_unit: 1,
					value: car?.spec?.displacement,
					price: car?.advertisement?.price * 10000,
					curr: 'KRW',
				}).toString(),
				{
					withCredentials: false,
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded',
					},
				},
			)

			if (!response.status === 200) throw new Error('Ошибка при расчёте')

			const data = await response.data

			const parsedTotal = parseInt(data.total.split(',')[0].replace(/\s/g, ''))
			const parsedCarPrice = parseInt(
				data.total2.split(',')[0].replace(/\s/g, ''),
			)

			const carPriceRub = parsedCarPrice
			const customsFees = parsedTotal

			const koreaExpensesKRW = 1800000 + 440000
			const koreaExpensesUSD = koreaExpensesKRW / usdKrwRate
			const koreaExpensesRUB = koreaExpensesUSD * usdRubRate

			const brokerServices = 120000
			const deliveryByTruck = 210000
			const deliveryByLorry = 240000

			// Правильный: используем total2 (carPriceRub), в который уже входит всё
			const totalWithTruck =
				carPriceRub + brokerServices + koreaExpensesRUB + deliveryByTruck
			const totalWithLorry =
				carPriceRub + brokerServices + koreaExpensesRUB + deliveryByLorry

			setCalculatedResult({
				...data,
				carPriceRub,
				customsFees,
				koreaExpensesRUB: Math.round(koreaExpensesRUB),
				brokerServices,
				deliveryByTruck,
				deliveryByLorry,
				totalWithTruck,
				totalWithLorry,
			})
		} catch (err) {
			setErrorCalc(err.message)
		} finally {
			setLoadingCalc(false)
		}
	}

	const calculateAge = (year) => {
		// Текущая дата
		const currentDate = new Date()
		const currentYear = currentDate.getFullYear()

		// Преобразуем в числа
		const yearInt = parseInt(year)

		// Расчет возраста в годах
		const ageInYears = currentYear - yearInt

		if (ageInYears < 3) {
			return '0-3'
		} else if (ageInYears >= 3 && ageInYears < 5) {
			return '3-5'
		} else if (ageInYears >= 5 && ageInYears < 7) {
			return '5-7'
		} else {
			return '7-0'
		}
	}

	if (loading) return <Loader />
	if (error) return <p className='text-center text-red-500'>{error}</p>
	if (!car) return <p className='text-center text-lg'>Автомобиль не найден</p>

	// Получение URL первой фотографии
	const getPhotoUrl = (path) => `https://ci.encar.com/carpicture${path}`
	const sortedPhotos = car?.photos?.sort((a, b) => (a.path > b.path ? 1 : -1))
	const uniquePhotos = [
		...new Map(car?.photos?.map((photo) => [photo.path, photo])).values(),
	]

	const formattedYearMonth = `${car?.category?.yearMonth.substring(
		4,
	)}/${car?.category?.yearMonth.substring(0, 4)}`

	const carPriceKorea = car?.advertisement?.price * 10000
	const carPriceUsd = Math.round(
		(car?.advertisement?.price * 10000) / usdKrwRate,
	)
	const carPriceRub = carPriceUsd * usdRubRate

	const meanUsdtRubRate =
		usdtRubRates?.reduce((a, b) => a + b, 0) / usdtRubRates?.length + 2

	const carName = car?.category?.manufacturerEnglishName
	const formattedCarName = carName?.replaceAll('_', ' ')

	const modelGroup = car?.category?.modelGroupEnglishName
	const formattedModelGroup = modelGroup === 'Canival' ? 'Carnival' : modelGroup

	const koreaExpensesKRW = 1800000
	const koreaExpensesUSD = koreaExpensesKRW / usdKrwRate
	const koreaExpensesRUB = koreaExpensesUSD * usdRubRate

	const koreaParkingFeeKRW = 440000
	const koreaParkingFeeUSD = koreaParkingFeeKRW / usdKrwRate
	const koreaParkingFeeRUB = koreaParkingFeeUSD * usdRubRate

	return (
		<div className='container mx-auto mt-24 md:mt-30 p-4 md:p-6 bg-white shadow-lg rounded-lg'>
			<h1 className='text-3xl font-bold text-center mb-6'>
				{formattedCarName} {formattedModelGroup}{' '}
				{car?.category?.gradeEnglishName}
			</h1>

			{/* Слайдер с фото */}
			{sortedPhotos.length > 0 && (
				<div className='max-w-2xl mx-auto mb-'>
					<Swiper
						modules={[Navigation, Pagination]}
						spaceBetween={10}
						slidesPerView={1}
						navigation
						pagination={{ clickable: true }}
						className='rounded-lg shadow-lg'
					>
						{uniquePhotos.map((photo, index) => (
							<SwiperSlide key={index}>
								<img
									src={getPhotoUrl(photo.path)}
									alt={`Car image ${index + 1}`}
									className='w-full h-auto rounded-lg'
								/>
							</SwiperSlide>
						))}
					</Swiper>
				</div>
			)}

			<div className='flex justify-end mb-4'>
				<button
					onClick={handleAddToFavorites}
					className='bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700 transition cursor-pointer'
				>
					❤️ Добавить в избранное
				</button>
			</div>
			{/* Данные об автомобиле */}
			<div className='mt-6 p-5 bg-gray-50 shadow-md rounded-lg'>
				<p className='text-gray-600'>
					<strong>Дата регистрации:</strong> {formattedYearMonth}
				</p>
				<p className='text-gray-600'>
					<strong>Объём двигателя:</strong>{' '}
					{car?.spec?.displacement.toLocaleString()} см³
				</p>
				<p className='text-gray-600'>
					<strong>Пробег:</strong> {car?.spec?.mileage.toLocaleString()} км
				</p>
				<p className='text-gray-600'>
					<strong>Трансмиссия:</strong>{' '}
					{translations[car?.spec?.transmissionName]}
				</p>
				{drivetrain && (
					<p className='text-gray-600'>
						<strong>Привод:</strong> {drivetrain}
					</p>
				)}
				<p className='text-gray-600'>
					<strong>Тип топлива:</strong>{' '}
					{translations[car?.spec?.fuelName] || car?.spec?.fuelName}
				</p>
				<p className='text-gray-600'>
					<strong>Цвет:</strong>{' '}
					{colorTranslations[car?.spec?.colorName] || car?.spec?.colorName}
				</p>
				<>
					<CarInspection car={car} />
				</>

				<p className='mt-10 mb-2'>
					<span>Текущие курсы:</span>
					<br />
					<span className='text-gray-500 text-sm'>
						&nbsp; USDT - KRW: ₩{Math.floor(usdKrwRate - 15).toLocaleString()}
					</span>
					<br />
					<span className='text-gray-500 text-sm'>
						&nbsp; USDT - RUB: {meanUsdtRubRate.toFixed(2)} ₽
					</span>
				</p>
				<p className='text-gray-800 font-bold text-lg'>
					<strong>
						Цена в Корее: <br />
					</strong>{' '}
					₩{carPriceKorea.toLocaleString()} | ${carPriceUsd.toLocaleString()} |{' '}
					{Math.round(carPriceRub).toLocaleString()} ₽
				</p>
			</div>

			{/* Контакты менеджеров */}
			<div className='mt-6 p-5 bg-white shadow-md rounded-lg text-center flex justify-center gap-20'>
				<div>
					<h2 className='text-xl font-semibold mb-4'>Контакты</h2>
					<p className='text-gray-700 mb-2'>
						<strong>Вячеслав:</strong>{' '}
						<a
							href='tel:821032728558'
							className='text-blue-600 hover:underline'
						>
							+82 10-3272-8558
						</a>
					</p>
					<p className='text-gray-700 mb-2'>
						<strong>Виктор:</strong>{' '}
						<a
							href='tel:821099802858'
							className='text-blue-600 hover:underline'
						>
							+82 10-9980-2858
						</a>
					</p>
					<p className='text-gray-700 mb-2'>
						<a
							target='_blank'
							href='https://wa.me/821032728558'
							className='text-blue-600 hover:underline flex justify-center items-center'
						>
							<FaWhatsapp className='text-green-600 text-xl mr-1' />
							WhatsApp (Вячеслав)
						</a>
					</p>
					<p className='text-gray-700 mb-2'>
						<a
							target='_blank'
							href='https://wa.me/821099802858'
							className='text-blue-600 hover:underline flex justify-center items-center'
						>
							<FaWhatsapp className='text-green-600 text-xl mr-1' />
							WhatsApp (Виктор)
						</a>
					</p>
					<p className='text-gray-700 mb-2'>
						<a
							target='_blank'
							href='https://www.instagram.com/koreaexcar/'
							className='text-blue-600 hover:underline flex justify-center items-center'
						>
							<FaInstagram className='text-pink-600 text-xl mr-1' />
							@koreaexcar
						</a>
					</p>
					<p className='text-gray-700'>
						<a
							target='_blank'
							href='https://t.me/koreaexcar23'
							className='text-blue-600 hover:underline flex justify-center items-center'
						>
							<FaTelegram className='text-blue-500 text-xl mr-1' />
							@koreaexcar
						</a>
					</p>
				</div>
			</div>

			{/* Выбор страны для расчёта */}
			<div className='mt-6 p-6 bg-white shadow-lg rounded-lg text-center border border-gray-200'>
				<h2 className='text-2xl font-semibold mb-6 text-gray-800'>
					Рассчитать стоимость до:
				</h2>
				<div className='flex justify-center gap-6 flex-wrap'>
					<button
						onClick={() => setSelectedCountry('russia')}
						className={`px-6 py-3 rounded-lg shadow-md text-lg font-semibold transition duration-300 border-2 cursor-pointer
				${
					selectedCountry === 'russia'
						? 'bg-blue-700 text-white border-blue-700'
						: 'bg-white text-blue-700 border-blue-500 hover:bg-blue-100'
				}`}
					>
						🇷🇺 Россия
					</button>
					<button
						onClick={() => setSelectedCountry('kazakhstan')}
						className={`px-6 py-3 rounded-lg shadow-md text-lg font-semibold transition duration-300 border-2 cursor-pointer
				${
					selectedCountry === 'kazakhstan'
						? 'bg-green-700 text-white border-green-700'
						: 'bg-white text-green-700 border-green-500 hover:bg-green-100'
				}`}
					>
						🇰🇿 Казахстан
					</button>
				</div>
			</div>

			{/* РФ */}
			{selectedCountry === 'russia' && (
				<div className='mt-8 flex justify-center'>
					<button
						className={`cursor-pointer relative py-3 px-10 rounded-lg shadow-xl text-lg font-semibold transition-all duration-300 border-2 flex items-center gap-2
			${
				loadingCalc
					? 'bg-gray-600 border-gray-700 text-gray-300 opacity-60 cursor-not-allowed'
					: 'bg-gradient-to-r from-red-600 to-red-700 border-red-800 text-white hover:from-red-700 hover:to-red-800 hover:border-red-900 hover:scale-105'
			}`}
						onClick={handleCalculate}
						disabled={loadingCalc}
					>
						{loadingCalc ? (
							<>
								<span className='animate-spin border-t-2 border-white border-solid rounded-full w-5 h-5'></span>
								<span>Расчёт...</span>
							</>
						) : (
							<>
								📊 <span>Рассчитать стоимость</span>
							</>
						)}
					</button>
				</div>
			)}

			{calculatedResult && selectedCountry === 'russia' && (
				<div className='mt-6 bg-white shadow-lg rounded-lg text-center border border-gray-200'>
					<h2 className='text-2xl font-bold text-gray-900 mb-6'>
						Расчёт стоимости под ключ
					</h2>

					<div className='grid grid-cols-1 md:grid-cols-2 gap-6 text-lg text-gray-700'>
						{/* Стоимость автомобиля */}
						<div className='p-4 bg-gray-100 rounded-lg shadow-sm flex flex-col justify-center'>
							<h3 className='text-xl font-semibold text-gray-800'>
								Стоимость автомобиля
							</h3>
							<p className='mt-2 font-bold text-gray-900'>
								₩{carPriceKorea.toLocaleString('ru-RU')} | $
								{carPriceUsd.toLocaleString('ru-RU')} |{' '}
								{Math.round(carPriceRub).toLocaleString('ru-RU')} ₽
							</p>
						</div>

						{/* Таможенные платежи */}
						<div className='p-4 bg-gray-100 rounded-lg shadow-sm'>
							<h3 className='text-xl font-semibold text-gray-800'>
								Таможенные платежи
							</h3>
							<p className='mt-2'>
								📌 Таможенная пошлина:{' '}
								<strong>{calculatedResult?.tax?.toLocaleString()} ₽</strong>
							</p>
							<p>
								📌 Таможенный сбор:{' '}
								<strong>{calculatedResult?.sbor?.toLocaleString()} ₽</strong>
							</p>
							<p>
								📌 Утилизационный сбор:{' '}
								<strong>{calculatedResult?.util?.toLocaleString()} ₽</strong>
							</p>
						</div>

						{/* Брокерские услуги */}
						<div className='p-4 bg-gray-100 rounded-lg shadow-sm flex flex-col justify-center'>
							<h3 className='text-xl font-semibold text-gray-800'>
								Дополнительные расходы
							</h3>
							<p className='mt-2'>
								💼 Брокерские услуги: <strong>120,000 ₽</strong>
							</p>
							<p className='mt-2'>
								Логистика (
								<span className='text-xs text-gray-500'>₩1 800 000</span>):{' '}
								<strong>
									{Math.round(koreaExpensesRUB).toLocaleString('ru-RU')} ₽
								</strong>
							</p>
							<p className='mt-2'>
								Стояночные (
								<span className='text-xs text-gray-500'>₩440 000</span>):{' '}
								<strong>
									{Math.round(koreaParkingFeeRUB).toLocaleString('ru-RU')} ₽
								</strong>
							</p>
						</div>

						{/* Доставка */}
						<div className='p-4 bg-gray-100 rounded-lg shadow-sm'>
							<h3 className='text-xl font-semibold text-gray-800'>Доставка</h3>
							<p className='mt-2'>
								🚛 Автовоз: <strong>210 000 ₽</strong>
							</p>
							<p>
								🚚 Фура: <strong>240 000 ₽</strong>
							</p>
						</div>
					</div>

					{/* Итоговая стоимость */}
					<div className='mt-8 p-5 bg-gray-200 rounded-lg shadow-md text-lg font-semibold text-gray-900'>
						<p>
							✅ Итоговая стоимость с доставкой автовозом:{' '}
							<strong>
								{Math.floor(calculatedResult?.totalWithTruck).toLocaleString(
									'ru-RU',
								)}{' '}
								₽
							</strong>
						</p>
						<p className='mt-2'>
							✅ Итоговая стоимость с доставкой фурой:{' '}
							<strong>
								{Math.floor(calculatedResult?.totalWithLorry).toLocaleString(
									'ru-RU',
								)}{' '}
								₽
							</strong>
						</p>
					</div>

					{/* Кнопка заказа */}
					<div className='mt-8 mb-6 flex justify-center'>
						<button
							onClick={() => setIsOrderModalOpen(true)}
							className='btn-order py-4 px-10 bg-gradient-to-r from-red-500 to-red-600 text-white text-xl font-bold rounded-lg shadow-lg flex items-center'
						>
							<FaShoppingCart className='mr-2' /> Заказать автомобиль
						</button>
					</div>
				</div>
			)}

			{/* КЗ */}
			{selectedCountry === 'kazakhstan' && (
				<>
					<KazakhstanCalculator
						usdKztRate={usdKztRate}
						usdKrwRate={usdKrwRate}
						carPriceKRW={carPriceKorea}
					/>

					{/* Кнопка заказа для Казахстана */}
					<div className='mt-8 mb-6 flex justify-center'>
						<button
							onClick={() => setIsOrderModalOpen(true)}
							className='btn-order py-4 px-10 bg-gradient-to-r from-green-500 to-green-600 text-white text-xl font-bold rounded-lg shadow-lg flex items-center'
						>
							<FaShoppingCart className='mr-2' /> Заказать автомобиль
						</button>
					</div>
				</>
			)}

			{errorCalc && <p className='text-center text-red-500'>{errorCalc}</p>}

			{/* Модальное окно заказа */}
			<OrderModal
				isOpen={isOrderModalOpen}
				onClose={() => setIsOrderModalOpen(false)}
				carName={
					car
						? `${formattedCarName} ${formattedModelGroup} ${car?.category?.gradeEnglishName}`
						: ''
				}
			/>

			<a
				href='https://t.me/+Ndi8rrAfpg00ZGJl'
				target='_blank'
				rel='noopener noreferrer'
				className='fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-full shadow-lg text-lg font-semibold z-50 transition duration-300 animate-bounce flex items-center justify-center w-16 h-16'
			>
				💬
			</a>
		</div>
	)
}

export default CarDetails
