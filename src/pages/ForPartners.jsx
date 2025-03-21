const ForPartners = () => {
	return (
		<div className='flex flex-col items-center justify-center h-screen text-center bg-gray-100 px-6'>
			<h1 className='text-4xl md:text-5xl font-bold text-gray-800 mb-4'>
				Раздел для партнёров
			</h1>
			<p className='text-lg md:text-xl text-gray-600 mb-6'>
				Эта страница находится в разработке. Совсем скоро здесь появится важная
				информация для наших партнёров.
			</p>
			<div className='flex items-center space-x-4'>
				<span className='text-red-500 text-3xl animate-spin'>⏳</span>
				<p className='text-lg text-gray-700'>Ожидайте обновлений!</p>
			</div>
		</div>
	)
}

export default ForPartners
