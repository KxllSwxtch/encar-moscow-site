import { useEffect, useState } from 'react'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { db } from '../firebase'
import { Loader } from '../components'

const fuelTranslations = {
	가솔린: 'Бензин',
	휘발유: 'Бензин',
	디젤: 'Дизель',
	전기: 'Электро',
	'가솔린+전기': 'Гибрид',
	하이브리드: 'Гибрид',
}

const Favorites = () => {
	const { user } = useAuth()
	const [favorites, setFavorites] = useState([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState('')
	const [updateTrigger, setUpdateTrigger] = useState(false)

	useEffect(() => {
		const fetchFavorites = async () => {
			if (!user) return

			try {
				const userRef = doc(db, 'users', user.uid)
				const docSnap = await getDoc(userRef)
				const favIds = docSnap.exists() ? docSnap.data().favorites : []

				if (!favIds.length) {
					setFavorites([])
					setLoading(false)
					return
				}

				const requests = favIds.map((id) =>
					axios.get(`https://api.encar.com/v1/readside/vehicle/${id}`),
				)
				const results = await Promise.all(requests)
				const cars = results.map((res) => res.data)
				setFavorites(cars)
			} catch (err) {
				console.error(err)
				setError('Ошибка при загрузке избранного: ' + err.message)
			} finally {
				setLoading(false)
			}
		}

		fetchFavorites()
	}, [user, updateTrigger])

	const handleRemove = async (vehicleId) => {
		try {
			const userRef = doc(db, 'users', user.uid)
			const docSnap = await getDoc(userRef)
			const favIds = docSnap.exists() ? docSnap.data().favorites : []
			const updatedFavs = favIds.filter((id) => id !== String(vehicleId))

			await setDoc(userRef, { favorites: updatedFavs }, { merge: true })
			setFavorites((prev) => prev.filter((car) => car.vehicleId !== vehicleId))
		} catch (err) {
			console.error('Ошибка при удалении из избранного:', err)
		}
	}

	if (loading) return <Loader />
	if (error) return <p className='text-center text-red-500'>{error}</p>
	if (favorites.length === 0)
		return (
			<p className='text-center mt-30 md:mt-50'>
				У вас пока нет избранных автомобилей.
			</p>
		)

	return (
		<div className='mt-25 md:mt-35'>
			<h1 className='text-2xl font-bold text-center mb-5'>
				Список понравившихся автомобилей
			</h1>
			<div className='container mx-auto p-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
				{favorites.map((car) => {
					const name = `${car.category.manufacturerEnglishName || ''} ${
						car.category.modelGroupEnglishName || ''
					} ${car.category.gradeDetailEnglishName || ''}`
					const yearMonth = `${car.category.yearMonth.slice(
						4,
					)}/${car.category.yearMonth.slice(0, 4)}`
					const displacement = car.spec.displacement.toLocaleString()
					const mileage = car.spec.mileage.toLocaleString()
					const fuel = fuelTranslations[car.spec.fuelName] || car.spec.fuelName
					const price = (car.category.originPrice * 10000).toLocaleString()
					const photoObj =
						car.photos?.find((p) => p.code === '001') || car.photos?.[0]
					const photo = photoObj?.path

					return (
						<div
							key={car.vehicleId}
							className='bg-white shadow-md rounded-lg p-4 flex flex-col items-center'
						>
							{photo && (
								<div className='w-full h-52 overflow-hidden rounded-lg mb-4'>
									<img
										src={`https://ci.encar.com/carpicture${photo}`}
										alt={name}
										className='w-full h-full object-contain'
									/>
								</div>
							)}
							<h3 className='font-bold text-lg mb-2 text-center'>{name}</h3>
							<p className='text-md text-gray-600'>📅 {yearMonth}</p>
							<p className='text-md text-gray-600'>⚙️ {displacement} см³</p>
							<p className='text-md text-gray-600'>⛽ {fuel}</p>
							<p className='text-md text-gray-600'>📍 {mileage} км</p>
							<p className='font-bold text-black mt-2 text-center text-lg'>
								Стоимость автомобиля в Корее
								<br />₩{price}
							</p>
							<Link
								to={`/catalog/${car.vehicleId}`}
								className='mt-2 bg-blue-600 hover:bg-blue-700 text-white text-md py-2 px-4 rounded transition text-center'
							>
								Подробнее
							</Link>
							<button
								onClick={() => handleRemove(car.vehicleId)}
								className='mt-4 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded transition cursor-pointer'
							>
								Удалить из избранного
							</button>
						</div>
					)
				})}
			</div>
		</div>
	)
}

export default Favorites
