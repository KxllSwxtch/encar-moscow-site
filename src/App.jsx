import AppRoutes from './routes'
import { Footer, Header } from './components'

const App = () => {
	return (
		<>
			<Header />
			<main className=''>
				<AppRoutes />
			</main>
			<Footer />
		</>
	)
}

export default App
