import { Routes, Route } from 'react-router-dom'
import { Home, Catalog, About, Contact } from '../pages'

const AppRoutes = () => {
	return (
		<Routes>
			<Route path='/' element={<Home />} />
			<Route path='/catalog' element={<Catalog />} />
			<Route path='/about' element={<About />} />
			<Route path='/contact' element={<Contact />} />
		</Routes>
	)
}

export default AppRoutes
