import React, { useEffect, useState } from 'react'
import { motion, useAnimation } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const CompanyStats = () => {
	const controls = useAnimation()
	const [ref, inView] = useInView({
		triggerOnce: true,
		threshold: 0.2,
	})

	useEffect(() => {
		if (inView) {
			controls.start('visible')
		}
	}, [controls, inView])

	// Варианты анимации для разных элементов
	const containerVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				staggerChildren: 0.2,
			},
		},
	}

	const itemVariants = {
		hidden: { y: 20, opacity: 0 },
		visible: {
			y: 0,
			opacity: 1,
			transition: {
				duration: 0.6,
				ease: 'easeOut',
			},
		},
	}

	const numberVariants = {
		hidden: { scale: 0.8, opacity: 0 },
		visible: {
			scale: 1,
			opacity: 1,
			transition: {
				duration: 0.8,
				ease: [0.21, 1.11, 0.81, 0.99],
			},
		},
	}

	const listItemVariants = {
		hidden: { x: -20, opacity: 0 },
		visible: (custom) => ({
			x: 0,
			opacity: 1,
			transition: {
				delay: 0.2 + custom * 0.1,
				duration: 0.5,
			},
		}),
	}

	return (
		<section className='py-16 bg-gray-50'>
			<motion.div
				className='container mx-auto px-4'
				ref={ref}
				variants={containerVariants}
				initial='hidden'
				animate={controls}
			>
				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
					{/* Первый блок - Филиалы */}
					<motion.div
						className='flex flex-col lg:border-r lg:border-gray-300 pb-6 md:pb-0'
						variants={itemVariants}
					>
						<motion.h2
							className='text-5xl md:text-6xl font-bold text-black mb-3'
							variants={numberVariants}
						>
							20
						</motion.h2>
						<motion.p
							className='text-lg md:text-xl text-gray-700'
							variants={itemVariants}
						>
							успешно
							<br className='hidden md:block' /> функционирующих
							<br className='hidden md:block' /> филиалов в России
						</motion.p>
					</motion.div>

					{/* Второй блок - Автомобили */}
					<motion.div
						className='flex flex-col lg:border-r lg:border-gray-300 pb-6 md:pb-0'
						variants={itemVariants}
					>
						<motion.h2
							className='text-5xl md:text-6xl font-bold text-black mb-3'
							variants={numberVariants}
						>
							3000+
						</motion.h2>
						<motion.p
							className='text-lg md:text-xl text-gray-700'
							variants={itemVariants}
						>
							привезенных
							<br className='hidden md:block' /> автомобилей в РФ
							<br className='hidden md:block' /> и СНГ за 2024 год
						</motion.p>
					</motion.div>

					{/* Третий блок - Опыт */}
					<motion.div
						className='flex flex-col lg:border-r lg:border-gray-300 pb-6 md:pb-0'
						variants={itemVariants}
					>
						<motion.h2
							className='text-5xl md:text-6xl font-bold text-black mb-3'
							variants={numberVariants}
						>
							5 лет
						</motion.h2>
						<motion.p
							className='text-lg md:text-xl text-gray-700'
							variants={itemVariants}
						>
							импортируем
							<br className='hidden md:block' /> автомобили в разные
							<br className='hidden md:block' /> страны мира
						</motion.p>
					</motion.div>

					{/* Четвертый блок - Преимущества */}
					<motion.div className='flex flex-col' variants={itemVariants}>
						<ul className='space-y-4 text-lg text-gray-800'>
							<motion.li
								className='flex items-start'
								variants={listItemVariants}
								custom={0}
							>
								<motion.span
									className='inline-block w-2 h-2 bg-red-600 rounded-full mt-2.5 mr-3 flex-shrink-0'
									initial={{ scale: 0 }}
									animate={{ scale: 1 }}
									transition={{ delay: 0.3, duration: 0.3 }}
								></motion.span>
								<span>Полное сопровождение</span>
							</motion.li>
							<motion.li
								className='flex items-start'
								variants={listItemVariants}
								custom={1}
							>
								<motion.span
									className='inline-block w-2 h-2 bg-red-600 rounded-full mt-2.5 mr-3 flex-shrink-0'
									initial={{ scale: 0 }}
									animate={{ scale: 1 }}
									transition={{ delay: 0.4, duration: 0.3 }}
								></motion.span>
								<span>Никаких скрытых платежей</span>
							</motion.li>
							<motion.li
								className='flex items-start'
								variants={listItemVariants}
								custom={2}
							>
								<motion.span
									className='inline-block w-2 h-2 bg-red-600 rounded-full mt-2.5 mr-3 flex-shrink-0'
									initial={{ scale: 0 }}
									animate={{ scale: 1 }}
									transition={{ delay: 0.5, duration: 0.3 }}
								></motion.span>
								<span>Помощь с логистикой</span>
							</motion.li>
							<motion.li
								className='flex items-start'
								variants={listItemVariants}
								custom={3}
							>
								<motion.span
									className='inline-block w-2 h-2 bg-red-600 rounded-full mt-2.5 mr-3 flex-shrink-0'
									initial={{ scale: 0 }}
									animate={{ scale: 1 }}
									transition={{ delay: 0.6, duration: 0.3 }}
								></motion.span>
								<span>Растаможка на территории РФ</span>
							</motion.li>
						</ul>
					</motion.div>
				</div>
			</motion.div>
		</section>
	)
}

export default CompanyStats
