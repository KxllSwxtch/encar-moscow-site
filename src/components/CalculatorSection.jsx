import axios from 'axios'
import { useState } from 'react'

const CalculatorSection = () => {
	const [carPrice, setCarPrice] = useState('')
	const [formattedCarPrice, setFormattedCarPrice] = useState('')
	const [engineVolume, setEngineVolume] = useState('')
	const [carYear, setCarYear] = useState('')
	const [carMonth, setCarMonth] = useState('1')
	const [engineType, setEngineType] = useState('1')
	const [result, setResult] = useState(null)
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState('')
	const [errors, setErrors] = useState({})

	const months = [
		'Январь',
		'Февраль',
		'Март',
		'Апрель',
		'Май',
		'Июнь',
		'Июль',
		'Август',
		'Сентябрь',
		'Октябрь',
		'Ноябрь',
		'Декабрь',
	]

	const handleCalculate = async () => {
		setLoading(true)
		setError('')

		try {
			const response = await axios.post(
				'https://corsproxy.io/?key=28174bc7&url=https://calcus.ru/calculate/Customs',
				new URLSearchParams({
					owner: 1,
					age: calculateAge(carYear, carMonth),
					engine: engineType,
					power: 1,
					power_unit: 1,
					value: engineVolume,
					price: carPrice,
					curr: 'USD',
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
			setResult(data)
		} catch (err) {
			setError(err.message)
		} finally {
			setLoading(false)
		}
	}

	const calculateAge = (year, month) => {
		const currentDate = new Date()
		const carDate = new Date(year, month - 1, 1) // Указываем 1-е число месяца

		// Вычисляем возраст в месяцах
		const ageInMonths =
			(currentDate.getFullYear() - carDate.getFullYear()) * 12 +
			(currentDate.getMonth() - carDate.getMonth())

		if (ageInMonths < 36) {
			return '0-3'
		} else if (ageInMonths < 60) {
			return '3-5'
		} else if (ageInMonths < 84) {
			return '5-7'
		} else {
			return '7-0'
		}
	}

	const handleCarPriceChange = (e) => {
		let rawValue = e.target.value.replace(/[^0-9]/g, '') // Убираем всё, кроме цифр
		let formattedValue = new Intl.NumberFormat('en-US').format(rawValue) // Форматируем число с запятыми
		setCarPrice(rawValue) // Сохраняем чистое число
		setFormattedCarPrice(formattedValue) // Отображаем отформатированное

		if (rawValue < 0) {
			setErrors((prev) => ({
				...prev,
				carPrice: 'Цена не может быть отрицательной',
			}))
		} else if (rawValue > 1000000000) {
			setErrors((prev) => ({
				...prev,
				carPrice: 'Слишком высокая цена, проверьте ввод',
			}))
		} else {
			setErrors((prev) => ({ ...prev, carPrice: '' }))
		}
	}

	const handleEngineVolumeChange = (e) => {
		let value = e.target.value
		setEngineVolume(value)

		if (value < 100) {
			setErrors((prev) => ({ ...prev, engineVolume: 'Объём слишком мал' }))
		} else if (value > 20000) {
			setErrors((prev) => ({ ...prev, engineVolume: 'Объём слишком большой' }))
		} else {
			setErrors((prev) => ({ ...prev, engineVolume: '' }))
		}
	}

	const handleCarYearChange = (e) => {
		let value = e.target.value
		const currentYear = new Date().getFullYear()
		setCarYear(value)

		if (value < 1900) {
			setErrors((prev) => ({ ...prev, carYear: 'Слишком старый год выпуска' }))
		} else if (value > currentYear) {
			setErrors((prev) => ({
				...prev,
				carYear: 'Год выпуска не может быть больше текущего',
			}))
		} else {
			setErrors((prev) => ({ ...prev, carYear: '' }))
		}
	}

	const handleCarMonthChange = (e) => {
		let value = e.target.value
		setCarMonth(value)

		if (!value) {
			setErrors((prev) => ({ ...prev, carMonth: 'Выберите месяц' }))
		} else {
			setErrors((prev) => ({ ...prev, carMonth: '' }))
		}
	}

	const handleEngineTypeChange = (e) => {
		setEngineType(e.target.value)
	}

	const handleClose = () => {
		setResult(null)
		setCarPrice('')
		setFormattedCarPrice('')
		setEngineVolume('')
		setCarYear('')
		setCarMonth('')
		setEngineType('')
	}

	return (
		<div className='bg-white container m-auto max-w-300' id='calculator'>
			{/* <h2 className='text-center text-2xl font-bold mb-10' id='calculator'>
				Калькулятор таможенных платежей во Владивостоке
			</h2> */}

			<div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
				<div>
					<label className='block text-sm font-medium text-gray-700 mb-1'>
						Цена (USD)
					</label>
					<input
						type='text'
						placeholder='Введите цену'
						className='w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
						value={formattedCarPrice}
						required
						onChange={handleCarPriceChange}
					/>
					{errors.carPrice && (
						<p className='text-red-500 text-sm mt-1'>{errors.carPrice}</p>
					)}
				</div>

				<div>
					<label className='block text-sm font-medium text-gray-700 mb-1'>
						Объем двигателя (см³)
					</label>

					{/* Популярные объёмы */}
					<div className='flex flex-wrap gap-2 mb-2'>
						{[1500, 1600, 1800, 2000, 2200, 2500, 3000, 3500, 4400].map(
							(val) => (
								<button
									type='button'
									key={val}
									className='px-3 py-1 bg-gray-200 hover:bg-gray-300 text-sm rounded-md transition'
									onClick={() =>
										handleEngineVolumeChange({ target: { value: val } })
									}
								>
									{val.toLocaleString()}
								</button>
							),
						)}
					</div>

					{/* Ручной ввод */}
					<input
						type='number'
						placeholder='Введите объем'
						className='w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
						value={engineVolume}
						required
						onChange={handleEngineVolumeChange}
					/>

					{errors.engineVolume && (
						<p className='text-red-500 text-sm mt-1'>{errors.engineVolume}</p>
					)}
				</div>

				<div>
					<label className='block text-sm font-medium text-gray-700 mb-1'>
						Год выпуска
					</label>
					<input
						type='number'
						placeholder='Введите год'
						className='w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
						value={carYear}
						required
						onChange={handleCarYearChange}
					/>
					{errors.carYear && (
						<p className='text-red-500 text-sm mt-1'>{errors.carYear}</p>
					)}
				</div>

				<div>
					<label className='block text-sm font-medium text-gray-700 mb-1'>
						Месяц выпуска
					</label>
					<select
						required
						className='w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
						value={carMonth}
						onChange={handleCarMonthChange}
					>
						{months.map((month, index) => (
							<option key={index + 1} value={index + 1}>
								{month}
							</option>
						))}
					</select>
					{errors.carMonth && (
						<p className='text-red-500 text-sm mt-1'>{errors.carMonth}</p>
					)}
				</div>

				<div>
					<label className='block text-sm font-medium text-gray-700 mb-1'>
						Тип двигателя
					</label>
					<select
						className='w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
						value={engineType}
						onChange={handleEngineTypeChange}
					>
						<option value='1'>Бензин</option>
						<option value='2'>Дизель</option>
						<option value='3'>Гибрид</option>
						<option value='4'>Электро</option>
					</select>
				</div>
			</div>

			<button
				className='bg-black hover:text-yellow-500 transition-all  text-white px-4 py-2 rounded mt-4 cursor-pointer w-full lg:w-[20%] m-auto block'
				onClick={handleCalculate}
				disabled={Object.values(errors).some((error) => error) || loading}
			>
				{loading ? 'Считаем...' : 'Рассчитать'}
			</button>

			{error && <p className='text-red-500 mt-2'>{error}</p>}

			{result && (
				<div className='mt-4 p-4 border rounded bg-gray-100 relative'>
					<button
						className='absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-md text-sm hover:bg-red-700 transition'
						onClick={handleClose}
					>
						Закрыть
					</button>
					<p>
						Таможенный Сбор <br />
						<strong>{result?.sbor || 'Ошибка в расчёте'} ₽</strong>
					</p>
					<br />
					<p>
						Таможенная Пошлина
						<br />
						<strong>{result?.tax || 'Ошибка в расчёте'} ₽</strong>
					</p>
					<br />
					<p>
						Утилизационный Сбор
						<br />
						<strong>{result?.util || 'Ошибка в расчёте'} ₽</strong>
					</p>
					<br />
					<p>
						Услуги брокера
						<br />
						<strong>120 000,00 ₽</strong>
					</p>
					<br />
					<p>
						Итого
						<br />
						<strong>
							{(
								parseFloat(result?.total.replace(/\s/g, '').replace(',', '.')) +
								120000
							).toLocaleString() || 'Ошибка в расчёте'}{' '}
							₽
						</strong>
					</p>
					<br />
					<p>
						Стоимость Автомобиля + Таможенные платежи
						<br />
						<strong>
							{(
								parseFloat(
									result?.total2.replace(/\s/g, '').replace(',', '.'),
								) + 120000
							).toLocaleString() || 'Ошибка в расчёте'}{' '}
							₽
						</strong>
					</p>
				</div>
			)}
		</div>
	)
}

export default CalculatorSection
