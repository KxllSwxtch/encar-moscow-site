import { useState, useEffect } from 'react'
import axios from 'axios'

const KazakhstanCalculator = ({ usdKztRate, usdKrwRate, carPriceKRW }) => {
	const [carList, setCarList] = useState([])
	const [loading, setLoading] = useState(true)

	const [data, setData] = useState([]) // Все данные из API
	const [brands, setBrands] = useState([]) // Уникальные марки
	const [models, setModels] = useState([]) // Уникальные модели для выбранной марки
	const [years, setYears] = useState([]) // Уникальные года
	const [volumes, setVolumes] = useState([]) // Уникальные объёмы двигателя

	const [selectedBrand, setSelectedBrand] = useState('') // Выбранная марка
	const [selectedModel, setSelectedModel] = useState('') // Выбранная модель
	const [selectedYear, setSelectedYear] = useState('') // Выбранный год
	const [selectedVolume, setSelectedVolume] = useState('') // Выбранный объём двигателя
	const [price, setPrice] = useState(null) // Цена из инвойса

	const [exchangeRate, setExchangeRate] = useState(usdKztRate) // 1 USD → KZT
	const [calculation, setCalculation] = useState(null)

	useEffect(() => {
		// Проверяем, есть ли кэшированные данные
		const cachedData = localStorage.getItem('kazakhstanCars')

		if (cachedData) {
			// Если есть, загружаем из localStorage
			const parsedData = JSON.parse(cachedData)
			setData(parsedData)

			// Получаем список уникальных марок
			const uniqueBrands = [...new Set(parsedData.map((item) => item.brand))]
			setBrands(uniqueBrands)
			setLoading(false)
		} else {
			// Если данных нет, делаем запрос к API
			axios
				.get(
					`https://corsproxy.io/?url=${encodeURIComponent(
						'https://calculator.ida.kz/data.php',
					)}`,
				)
				.then((response) => {
					setData(response.data)
					localStorage.setItem('kazakhstanCars', JSON.stringify(response.data)) // Кэшируем

					// Получаем список уникальных марок
					const uniqueBrands = [
						...new Set(response.data.map((item) => item.brand)),
					]
					setBrands(uniqueBrands)
					setLoading(false)
				})
				.catch((error) => console.error('Ошибка при загрузке данных:', error))
		}
	}, [])

	// Обновляем список моделей при выборе марки
	useEffect(() => {
		if (selectedBrand) {
			const filteredModels = [
				...new Set(
					data
						.filter((item) => item.brand === selectedBrand)
						.map((item) => item.model),
				),
			]
			setModels(filteredModels)
			setSelectedModel('') // Сбрасываем выбранную модель
			setSelectedYear('')
			setYears([])
			setSelectedVolume('')
			setVolumes([])
			setPrice(null)
			setCalculation(null)
		}
	}, [selectedBrand, data])

	// Обновляем список годов при выборе модели
	useEffect(() => {
		if (selectedModel) {
			const filteredYears = [
				...new Set(
					data
						.filter(
							(item) =>
								item.brand === selectedBrand && item.model === selectedModel,
						)
						.map((item) => item.year),
				),
			].sort((a, b) => b - a) // Сортируем от нового к старому
			setYears(filteredYears)
			setSelectedYear('')
			setSelectedVolume('')
			setVolumes([])
			setPrice(null)
			setCalculation(null)
		}
	}, [selectedBrand, selectedModel, data])

	// Обновляем список объёмов двигателя при выборе года
	useEffect(() => {
		if (selectedYear) {
			const filteredVolumes = [
				...new Set(
					data
						.filter(
							(item) =>
								item.brand === selectedBrand &&
								item.model === selectedModel &&
								item.year === selectedYear,
						)
						.map((item) => item.volume),
				),
			].sort((a, b) => a - b) // Сортируем от меньшего к большему
			setVolumes(filteredVolumes)
			setSelectedVolume('')
			setPrice(null)
			setCalculation(null)
		}
	}, [selectedBrand, selectedModel, selectedYear, data])

	useEffect(() => {
		if (selectedVolume) {
			const selectedCar = data.find(
				(item) =>
					item.brand === selectedBrand &&
					item.model === selectedModel &&
					item.year === selectedYear &&
					item.volume === selectedVolume,
			)
			setPrice(selectedCar ? selectedCar.price : null)
		}
	}, [selectedVolume, data, selectedBrand, selectedModel, selectedYear])

	const formatNumber = (num) => Math.round(num).toLocaleString('ru-RU')

	const calculateCosts = () => {
		if (!price || !selectedVolume || !selectedYear) return

		const koreaContainerUSD = 1800
		const koreaContainerKZT = koreaContainerUSD * usdKztRate

		const koreaTransferUSD = 500000 / usdKrwRate
		const koreaTransferKZT = koreaTransferUSD * usdKztRate

		const koreaDocumentationUSD = 0
		const koreaDocumentationKZT = 0

		const priceKZT = price * usdKztRate

		const customs = priceKZT * 0.15
		const excise = selectedVolume >= 3000 ? selectedVolume * 100 : 0
		const vat = (priceKZT + 20000 + excise) * 0.12

		let utilFee = 0
		if (selectedVolume >= 1001 && selectedVolume <= 2000) {
			utilFee = 603750
		} else if (selectedVolume >= 2001 && selectedVolume <= 3000) {
			utilFee = 862500
		} else {
			utilFee = 1983750
		}

		const currentYear = new Date().getFullYear()
		const regFee =
			currentYear - selectedYear > 3
				? 1725000
				: currentYear - selectedYear < 2
				? 863
				: 172500

		const totalKoreaKZT =
			koreaContainerKZT + koreaTransferKZT + koreaDocumentationKZT

		const totalCustoms = customs + vat + excise
		const totalExpenses = totalCustoms + utilFee + regFee

		const carPriceUSD = carPriceKRW / usdKrwRate
		const carPriceKZT = carPriceUSD * usdKztRate

		const finalCostKZT = carPriceKZT + totalExpenses + totalKoreaKZT
		const finalCostUSD = finalCostKZT / usdKztRate

		setCalculation({
			koreaContainerKZT,
			koreaTransferKZT,
			koreaDocumentationKZT,
			priceKZT,
			customs,
			vat,
			excise,
			utilFee,
			regFee,
			totalCustoms,
			totalExpenses,
			finalCostKZT,
			finalCostUSD,
			carPriceKRW,
			carPriceUSD,
		})
	}

	if (loading) return <p>Загрузка...</p>

	return (
		<div className='bg-white shadow-md rounded-lg mt-6'>
			<h2 className='text-xl font-semibold mb-4 text-center'>
				Калькулятор для Казахстана 🇰🇿
			</h2>

			{/* Выбор марки */}
			<div className='mb-4'>
				<label
					htmlFor='brandSelect'
					className='block text-gray-700 font-semibold mb-2'
				>
					Марка автомобиля
				</label>
				<select
					id='brandSelect'
					value={selectedBrand}
					onChange={(e) => setSelectedBrand(e.target.value)}
					className='w-full border p-3 rounded-lg shadow-sm text-gray-800'
				>
					<option value=''>Выберите марку</option>
					{brands.map((brand, index) => (
						<option key={index} value={brand}>
							{brand}
						</option>
					))}
				</select>
			</div>

			{/* Выбор модели */}
			{selectedBrand && (
				<div className='mb-4'>
					<label
						htmlFor='modelSelect'
						className='block text-gray-700 font-semibold mb-2'
					>
						Модель автомобиля
					</label>
					<select
						id='modelSelect'
						value={selectedModel}
						onChange={(e) => setSelectedModel(e.target.value)}
						className='w-full border p-3 rounded-lg shadow-sm text-gray-800'
					>
						<option value=''>Выберите модель</option>
						{models
							.sort((a, b) => (a > b ? 1 : -1))
							.map((model, index) => (
								<option key={index} value={model}>
									{model}
								</option>
							))}
					</select>
				</div>
			)}

			{/* Выбор года */}
			{selectedModel && (
				<div className='mb-4'>
					<label
						htmlFor='yearSelect'
						className='block text-gray-700 font-semibold mb-2'
					>
						Год выпуска
					</label>
					<select
						id='yearSelect'
						value={selectedYear}
						onChange={(e) => setSelectedYear(e.target.value)}
						className='w-full border p-3 rounded-lg shadow-sm text-gray-800'
					>
						<option value=''>Выберите год</option>
						{years.map((year, index) => (
							<option key={index} value={year}>
								{year}
							</option>
						))}
					</select>
				</div>
			)}

			{/* Выбор объёма двигателя */}
			{selectedYear && (
				<div className='mb-4'>
					<label
						htmlFor='volumeSelect'
						className='block text-gray-700 font-semibold mb-2'
					>
						Объём двигателя (см³)
					</label>
					<select
						id='volumeSelect'
						value={selectedVolume}
						onChange={(e) => setSelectedVolume(e.target.value)}
						className='w-full border p-3 rounded-lg shadow-sm text-gray-800'
					>
						<option value=''>Выберите объём</option>
						{volumes.map((volume, index) => (
							<option key={index} value={volume}>
								{volume} см³
							</option>
						))}
					</select>
				</div>
			)}

			{/* Отображение цены */}
			{selectedVolume && price && (
				<div className='mt-6 p-5 bg-gray-50 shadow-md rounded-lg text-center'>
					<h3 className='text-lg font-semibold text-gray-800'>
						Стоимость из инвойса ($)
					</h3>
					<p className='text-2xl font-bold text-blue-600'>
						{formatNumber(price * usdKztRate)} ₸ / ${formatNumber(price)}
					</p>
				</div>
			)}

			{selectedVolume && (
				<div className='mt-6 text-center'>
					<button
						onClick={calculateCosts}
						className='bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg shadow-lg transition-all cursor-pointer'
					>
						📊 Рассчитать стоимость
					</button>
				</div>
			)}

			{/* Блок расчётов */}
			{calculation && (
				<div className='mt-6 bg-white text-gray-800 p-6 rounded-xl shadow-xl border border-gray-200'>
					<h3 className='text-2xl font-bold mb-6 text-center text-blue-700'>
						📊 Детализация расходов
					</h3>

					<div className='overflow-x-auto'>
						<table className='min-w-full border-collapse text-sm md:text-base'>
							<thead>
								<tr className='bg-blue-100 text-left'>
									<th className='p-3 w-2/3'>Наименование</th>
									<th className='p-3 text-right'>KZT</th>
									<th className='p-3 text-right'>USD</th>
								</tr>
							</thead>
							<tbody className='divide-y divide-gray-200'>
								<tr>
									<td className='p-3'>Контейнер (Корея)</td>
									<td className='p-3 text-right whitespace-nowrap break-words'>
										{formatNumber(calculation.koreaContainerKZT)} ₸
									</td>
									<td className='p-3 text-right whitespace-nowrap break-words'>
										{formatNumber(calculation.koreaContainerKZT / usdKztRate)} $
									</td>
								</tr>
								<tr>
									<td className='p-3'>Расходы (Корея)</td>
									<td className='p-3 text-right whitespace-nowrap break-words'>
										{formatNumber(calculation.koreaTransferKZT)} ₸
									</td>
									<td className='p-3 text-right whitespace-nowrap break-words'>
										{formatNumber(calculation.koreaTransferKZT / usdKztRate)} $
									</td>
								</tr>
								<tr>
									<td className='p-3'>Таможенная пошлина</td>
									<td className='p-3 text-right whitespace-nowrap break-words'>
										{formatNumber(calculation.customs)} ₸
									</td>
									<td className='p-3 text-right whitespace-nowrap break-words'>
										{formatNumber(calculation.customs / exchangeRate)} $
									</td>
								</tr>
								<tr>
									<td className='p-3'>НДС</td>
									<td className='p-3 text-right whitespace-nowrap break-words'>
										{formatNumber(calculation.vat)} ₸
									</td>
									<td className='p-3 text-right whitespace-nowrap break-words'>
										{formatNumber(calculation.vat / exchangeRate)} $
									</td>
								</tr>
								<tr>
									<td className='p-3'>Акциз</td>
									<td className='p-3 text-right whitespace-nowrap break-words'>
										{formatNumber(calculation.excise)} ₸
									</td>
									<td className='p-3 text-right whitespace-nowrap break-words'>
										{formatNumber(calculation.excise / exchangeRate)} $
									</td>
								</tr>
								<tr>
									<td className='p-3'>Утильсбор</td>
									<td className='p-3 text-right whitespace-nowrap break-words'>
										{formatNumber(calculation.utilFee)} ₸
									</td>
									<td className='p-3 text-right whitespace-nowrap break-words'>
										{formatNumber(calculation.utilFee / exchangeRate)} $
									</td>
								</tr>
								<tr>
									<td className='p-3'>Регистрация</td>
									<td className='p-3 text-right whitespace-nowrap break-words'>
										{formatNumber(calculation.regFee)} ₸
									</td>
									<td className='p-3 text-right whitespace-nowrap break-words'>
										{formatNumber(calculation.regFee / exchangeRate)} $
									</td>
								</tr>
							</tbody>
						</table>

						<div className='mt-6 p-4 bg-blue-100 rounded-lg text-lg font-semibold space-y-3'>
							<div className='flex justify-between'>
								<span>💰 Общая растаможка:</span>
								<span className='text-right'>
									{formatNumber(calculation.totalExpenses)} ₸ /{' '}
									{formatNumber(calculation.totalExpenses / exchangeRate)} $
								</span>
							</div>
							<div className='flex justify-between'>
								<span>🚗 Под ключ до Алматы:</span>
								<span className='text-right'>
									{formatNumber(calculation.finalCostKZT)} ₸ /{' '}
									{formatNumber(calculation.finalCostKZT / usdKztRate)} $
								</span>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	)
}

export default KazakhstanCalculator
