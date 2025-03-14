import { Link } from 'react-router-dom'

const HeroSection = () => {
	return (
		<section
			className='relative w-full h-[80vh] flex items-center justify-center bg-cover bg-center text-white px-5 mt-10 md:mt-0'
			style={{
				backgroundImage:
					"url('https://static.vecteezy.com/system/resources/previews/027/533/475/non_2x/car-or-bike-smokie-background-realistic-ai-generative-free-photo.jpg')",
			}}
		>
			{/* Затемнение для контраста */}
			<div className='absolute inset-0 bg-black opacity-70'></div>

			<div className='relative z-10 flex flex-col md:flex-row items-center max-w-6xl w-full'>
				{/* Текстовая часть */}
				<div className='w-full md:w-2/3 space-y-6'>
					<h1 className='text-4xl md:text-5xl font-bold uppercase leading-tight'>
						Автомобили из <br /> Южной Кореи под ключ
					</h1>

					<ul className='space-y-3 text-lg'>
						<li className='flex items-start'>
							<span className='text-red-500 text-xl mr-3'>●</span>
							Полное сопровождение сделки от заключения договора <br />
							до вручения автомобиля.
						</li>
						<li className='flex items-start'>
							<span className='text-red-500 text-xl mr-3'>●</span>
							Профессиональные брокеры в России и странах СНГ
						</li>
					</ul>

					{/* Кнопки */}
					<div className='md:flex md:space-x-4 grid grid-cols-1 gap-2'>
						<Link
							to='/calculator'
							className='bg-red-600 hover:bg-red-800 text-white py-3 px-6 text-lg font-semibold rounded-md transition-colors duration-300 text-center'
						>
							Рассчитать стоимость
						</Link>
						<Link
							to='/catalog'
							className='bg-white text-red-600 hover:text-red-800 py-3 px-6 text-lg font-semibold rounded-md border border-red-600 hover:border-red-800 transition-colors duration-300 text-center'
						>
							Перейти в каталог
						</Link>
					</div>
				</div>

				{/* Видео (YouTube Embed) */}
				<div className='hidden md:block w-full md:w-1/3'>
					<div className='relative w-full h-48 md:h-56'>
						<iframe
							className='w-full h-full rounded-md shadow-lg'
							src='https://www.youtube.com/embed/your-video-id?rel=0&showinfo=0&autoplay=0'
							title='Как заказать автомобиль'
							allowFullScreen
						></iframe>
					</div>
				</div>
			</div>
		</section>
	)
}

export default HeroSection
