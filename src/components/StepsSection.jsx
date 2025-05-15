import { motion } from 'framer-motion'

const steps = [
	{
		id: '1',
		title: 'Выбор автомобиля',
		text: 'Проводим осмотр выбранного вами автомобиля, а также консультируем и помогаем в подборе.',
		img: 'https://induseasywheels.indusind.com/media/magefan_blog/Used-Car-Best-Choice.jpg',
	},
	{
		id: '2',
		title: 'Подписание документов',
		text: 'После согласования с клиентом заключаем договор, осуществляется перевод средств и внесение залога на автомобиль.',
		img: 'https://cdn.pixabay.com/photo/2021/10/09/10/37/virtual-meeting-6693816_1280.png',
	},
	{
		id: '3',
		title: 'Экспорт',
		text: 'Подготовка документов на экспорт автомобиля. Погрузка автомобилей для отправки в страны СНГ.',
		img: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZXhwb3J0fGVufDB8fDB8fHww',
	},
	{
		id: '4',
		title: 'Получение авто',
		text: 'После растаможки автомобиля мы отправляем данный автомобиль в ваш населённый пункт. Вы встречаете авто по месту назначения.',
		img: 'https://hips.hearstapps.com/hmg-prod/images/close-up-of-a-man-receiving-new-car-key-royalty-free-image-1670522537.jpg',
	},
]

const StepsSection = () => {
	return (
		<section className='py-16 bg-white text-center' id='support'>
			{/* Заголовок */}
			<motion.h2
				className='text-3xl md:text-4xl font-bold uppercase'
				initial={{ opacity: 0, y: -20 }}
				whileInView={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.8, delay: 0.2 }}
				viewport={{ once: true }}
			>
				ПОМОЩЬ НА ВСЕХ ЭТАПАХ
			</motion.h2>

			{/* Сетка с этапами */}
			<div className='mt-12 max-w-6xl mx-auto flex flex-col space-y-12'>
				{steps.map((step, index) => (
					<motion.div
						key={step.id}
						className={`flex flex-col md:flex-row items-center ${
							index % 2 === 0 ? 'md:flex-row-reverse' : ''
						}`}
						initial={{ opacity: 0 }}
						whileInView={{ opacity: 1 }}
						transition={{ duration: 0.8, delay: index * 0.2 }}
						viewport={{ once: true }}
					>
						{/* Изображение */}
						<img
							src={step.img}
							alt={step.title}
							className='w-full md:w-1/2 h-64 object-cover rounded-md shadow-lg'
						/>

						{/* Текстовый блок */}
						<div className='w-full md:w-1/2 p-6 text-left'>
							<h3 className='text-lg md:text-xl font-bold text-red-600'>
								{step.id}. {step.title}
							</h3>
							<p className='text-gray-600 mt-2'>{step.text}</p>
						</div>
					</motion.div>
				))}
			</div>
		</section>
	)
}

export default StepsSection
