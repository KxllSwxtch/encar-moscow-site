import { Routes, Route } from 'react-router-dom'
import {
	Home,
	Catalog,
	About,
	Contact,
	CarDetails,
	WhyChooseUs,
	ForPartners,
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
			<Route path='/for-partners' element={<ForPartners />} />
		</Routes>
	)
}

export default AppRoutes
