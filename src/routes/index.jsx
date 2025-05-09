import { Routes, Route } from 'react-router-dom'
import {
	Home,
	Catalog,
	Contact,
	CarDetails,
	ForPartners,
	SignUp,
	Login,
	Favorites,
} from '../pages'

const AppRoutes = () => {
	return (
		<Routes>
			<Route path='/' element={<Home />} />
			<Route path='/catalog' element={<Catalog />} />
			<Route path='/catalog/:carId' element={<CarDetails />} />
			<Route path='/contact' element={<Contact />} />
			<Route path='/for-partners' element={<ForPartners />} />
			<Route path='/signup' element={<SignUp />} />
			<Route path='/login' element={<Login />} />
			<Route path='/favorites' element={<Favorites />} />
		</Routes>
	)
}

export default AppRoutes
