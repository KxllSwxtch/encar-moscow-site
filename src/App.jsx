import AppRoutes from './routes'
import { Footer, Header } from './components'

const App = () => {
	return (
		<div className='min-h-screen flex flex-col'>
			<Header />
			<main className='flex-grow'>
				<AppRoutes />
			</main>
			<Footer />
		</div>
	)
}

export default App
