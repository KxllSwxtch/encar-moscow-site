import { FaInstagram, FaTelegramPlane, FaYoutube } from 'react-icons/fa'

const PartnersSection = () => {
	return (
		<section className='py-12 bg-gray-50 text-center'>
			<h2 className='text-4xl font-bold mb-10 text-gray-900 uppercase tracking-wide'>
				Официальные партнёры Encar
			</h2>

			{/* Логотипы партнёров */}
			<div className='flex justify-center items-center gap-12 mb-10'>
				<img
					src='https://res.cloudinary.com/pomegranitedesign/image/upload/v1742461723/EncarMoscow/logo.png'
					alt='KoreaExCar Logo'
					className='h-24 w-auto object-contain'
				/>
				{/* <img
					src='https://res.cloudinary.com/pomegranitedesign/image/upload/v1742462590/EncarMoscow/vimotorslogo.jpg'
					alt='ViMotors Logo'
					className='h-24 w-auto object-contain rounded-md'
				/> */}
			</div>

			{/* Разделительная линия */}
			<div className='w-3/4 mx-auto border-t-2 border-gray-300 mb-10'></div>

			{/* Список соцсетей */}
			<div className='flex justify-center gap-6 flex-wrap'>
				<a
					href='https://www.instagram.com/koreaexcar'
					target='_blank'
					rel='noopener noreferrer'
					className='bg-gradient-to-r from-[#E1306C] to-[#833AB4] shadow-md p-5 rounded-full text-white text-xl flex items-center gap-3 hover:scale-105 transition-transform duration-300 hover:shadow-lg'
				>
					<FaInstagram className='text-3xl text-white' /> KoreaExCar
				</a>
				{/* <a
					href='https://www.instagram.com/vi_motors'
					target='_blank'
					rel='noopener noreferrer'
					className='bg-gradient-to-r from-[#E1306C] to-[#833AB4] shadow-md p-5 rounded-full text-white text-xl flex items-center gap-3 hover:scale-105 transition-transform duration-300 hover:shadow-lg'
				>
					<FaInstagram className='text-3xl text-white' /> ViMotors
				</a> */}
				<a
					href='https://t.me/koreaexcar23'
					target='_blank'
					rel='noopener noreferrer'
					className='bg-gradient-to-r from-[#0088CC] to-[#005F9E] shadow-md p-5 rounded-full text-white text-xl flex items-center gap-3 hover:scale-105 transition-transform duration-300 hover:shadow-lg'
				>
					<FaTelegramPlane className='text-3xl text-white' /> KoreaExCar
				</a>
				<a
					href='https://youtube.com/@koreaexcar'
					target='_blank'
					rel='noopener noreferrer'
					className='bg-gradient-to-r from-[#FF0000] to-[#C00] shadow-md p-5 rounded-full text-white text-xl flex items-center gap-3 hover:scale-105 transition-transform duration-300 hover:shadow-lg'
				>
					<FaYoutube className='text-3xl text-white' /> KoreaExCar YouTube-канал
				</a>
			</div>
		</section>
	)
}

export default PartnersSection
