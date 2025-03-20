import { Routes, Route } from 'react-router-dom'
import {
	Home,
	Catalog,
	About,
	Contact,
	CarDetails,
	WhyChooseUs,
} from '../pages'

const AppRoutes = () => {
	return (
		<Routes>
			<Route path='/' element={<Home />} />
			<Route path='/catalog' element={<Catalog />} />
			<Route path='/catalog/:carId' element={<CarDetails />} />
			<Route path='/about' element={<About />} />
			<Route path='/contact' element={<Contact />} />
			<Route path='/why-us' element={<WhyChooseUs />} />
		</Routes>
	)
}

export default AppRoutes
