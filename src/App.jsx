import AppRoutes from './routes'
import { Footer, Header } from './components'

const App = () => {
	return (
		<>
			<Header />
			<main className='mt-15 md:mt-20'>
				<AppRoutes />
			</main>
			<Footer />
		</>
	)
}

export default App
