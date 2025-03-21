import { motion } from 'framer-motion'

const reasons = [
	{
		id: '01',
		title: 'От договора до ключей',
		text: 'Обеспечиваем полное сопровождение сделки от момента заключения договора до вручения автомобиля.',
	},
	{
		id: '02',
		title: 'Надёжные партнёры',
		text: 'Работаем только с проверенными логистическими компаниями, гарантируя быструю, безопасную и оптимальную доставку автомобиля.',
	},
	{
		id: '03',
		title: 'Оперативное обслуживание',
		text: 'Представительства в Москве, Краснодаре, Владивостоке, Бишкеке и Алматы для оперативного обслуживания.',
	},
	{
		id: '04',
		title: '3 года на рынке',
		text: 'Более 3 лет успешной работы на рынке с накопленным опытом и доверием клиентов.',
	},
	{
		id: '05',
		title: 'Доставим',
		text: 'Можем просчитать и привезти автомобиль в любой город СНГ под ключ.',
	},
	{
		id: '06',
		title: 'Цены без посредников',
		text: 'Работаем без посредников, что позволяет нам предложить прямые цены без накруток.',
	},
	{
		id: '07',
		title: 'Индивидуальный подход',
		text: 'Подбираем автомобили под ваши требования, учитывая бюджет, предпочтения и цели эксплуатации.',
	},
]

const WhyChooseUs = () => {
	return (
		<motion.section
			className='py-16 bg-white text-center'
			initial={{ opacity: 0, y: 50 }}
			whileInView={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.8, ease: 'easeOut' }}
			viewport={{ once: true }}
		>
			{/* Заголовок */}
			<motion.h2
				className='text-3xl md:text-4xl font-bold uppercase'
				initial={{ opacity: 0, y: -20 }}
				whileInView={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.8, delay: 0.2 }}
				viewport={{ once: true }}
			>
				7 ПРИЧИН ВЫБРАТЬ НАС
			</motion.h2>
			<motion.p
				className='text-gray-600 max-w-3xl mx-auto mt-4'
				initial={{ opacity: 0, y: -10 }}
				whileInView={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.8, delay: 0.3 }}
				viewport={{ once: true }}
			>
				Мы - официальная экспортная компания, специализируемся на прямых
				поставках автомобилей без посредников. Наша цель - предложить клиентам
				прозрачные цены без накруток и скрытых платежей.
			</motion.p>

			{/* Сетка с причинами */}
			<div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-10 mt-12 max-w-5xl mx-auto'>
				{reasons.map((reason, index) => (
					<motion.div
						key={reason.id}
						className='relative text-center'
						initial={{ opacity: 0, scale: 0.9 }}
						whileInView={{ opacity: 1, scale: 1 }}
						transition={{ duration: 0.6, delay: index * 0.1 }}
						viewport={{ once: true }}
					>
						{/* Большой серый номер */}
						<span className='absolute -top-6 left-1/2 transform -translate-x-1/2 text-6xl md:text-7xl font-bold text-gray-200'>
							{reason.id}
						</span>
						{/* Заголовок и описание */}
						<h3 className='text-xl font-bold mt-8'>{reason.title}</h3>
						<p className='text-gray-600 mt-2'>{reason.text}</p>
					</motion.div>
				))}
			</div>
		</motion.section>
	)
}

export default WhyChooseUs
