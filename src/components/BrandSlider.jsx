import { useEffect, useRef } from 'react'

const brands = [
	'https://res.cloudinary.com/pomegranitedesign/image/upload/v1740470478/avtovita/brandslogos/bentley.png',
	'https://res.cloudinary.com/pomegranitedesign/image/upload/v1740470421/avtovita/brandslogos/mitsuoka.png',
	'https://res.cloudinary.com/pomegranitedesign/image/upload/v1740470352/avtovita/brandslogos/mitsubishi.png',
	'https://res.cloudinary.com/pomegranitedesign/image/upload/v1740470254/avtovita/brandslogos/mclaren.png',
	'https://res.cloudinary.com/pomegranitedesign/image/upload/v1740470218/avtovita/brandslogos/mazda.png',
	'https://res.cloudinary.com/pomegranitedesign/image/upload/v1740470152/avtovita/brandslogos/maybach.png',
	'https://res.cloudinary.com/pomegranitedesign/image/upload/v1740470116/avtovita/brandslogos/maserati.png',
	'https://res.cloudinary.com/pomegranitedesign/image/upload/v1740470044/avtovita/brandslogos/lincoln.png',
	'https://res.cloudinary.com/pomegranitedesign/image/upload/v1740469994/avtovita/brandslogos/renault.png',
	'https://res.cloudinary.com/pomegranitedesign/image/upload/v1740469938/avtovita/brandslogos/rolls-royce.png',
	'https://res.cloudinary.com/pomegranitedesign/image/upload/v1740469901/avtovita/brandslogos/lotus.png',
	'https://res.cloudinary.com/pomegranitedesign/image/upload/v1740469859/avtovita/brandslogos/rover.png',
	'https://res.cloudinary.com/pomegranitedesign/image/upload/v1740469824/avtovita/brandslogos/lexus.png',
	'https://res.cloudinary.com/pomegranitedesign/image/upload/v1740469766/avtovita/brandslogos/lamborghini.png',
	'https://res.cloudinary.com/pomegranitedesign/image/upload/v1740469714/avtovita/brandslogos/dodge.png',
	'https://res.cloudinary.com/pomegranitedesign/image/upload/v1740469678/avtovita/brandslogos/daihatsu.png',
	'https://res.cloudinary.com/pomegranitedesign/image/upload/v1740469634/avtovita/brandslogos/nissan.png',
	'https://res.cloudinary.com/pomegranitedesign/image/upload/v1740469530/avtovita/brandslogos/landrover.png',
	'https://res.cloudinary.com/pomegranitedesign/image/upload/v1740469491/avtovita/brandslogos/volvo.png',
	'https://res.cloudinary.com/pomegranitedesign/image/upload/v1740469453/avtovita/brandslogos/mini.png',
	'https://res.cloudinary.com/pomegranitedesign/image/upload/v1740442227/avtovita/brandslogos/volkswagen.png',
	'https://res.cloudinary.com/pomegranitedesign/image/upload/v1740442148/avtovita/brandslogos/audi.png',
	'https://res.cloudinary.com/pomegranitedesign/image/upload/v1740442084/avtovita/brandslogos/mercedes.png',
	'https://res.cloudinary.com/pomegranitedesign/image/upload/v1740441985/avtovita/brandslogos/bmw.png',
	'https://res.cloudinary.com/pomegranitedesign/image/upload/v1740440093/avtovita/brandslogos/hyundai.png',
	'https://res.cloudinary.com/pomegranitedesign/image/upload/v1740440478/avtovita/brandslogos/kia.png',
	'https://res.cloudinary.com/pomegranitedesign/image/upload/v1740440397/avtovita/brandslogos/genesis.png',
	'https://res.cloudinary.com/pomegranitedesign/image/upload/v1740441862/avtovita/brandslogos/chevrolet.png',
	'https://res.cloudinary.com/pomegranitedesign/image/upload/v1740441673/avtovita/brandslogos/renaultkorea.png',
	'https://res.cloudinary.com/pomegranitedesign/image/upload/v1740441782/avtovita/brandslogos/kg.png',
	'https://res.cloudinary.com/pomegranitedesign/image/upload/v1740441921/avtovita/brandslogos/daewoo.png',
	'https://res.cloudinary.com/pomegranitedesign/image/upload/v1740470527/avtovita/brandslogos/bugatti.png',
	'https://res.cloudinary.com/pomegranitedesign/image/upload/v1740470567/avtovita/brandslogos/buick.png',
	'https://res.cloudinary.com/pomegranitedesign/image/upload/v1740470618/avtovita/brandslogos/saab.png',
	'https://res.cloudinary.com/pomegranitedesign/image/upload/v1740470648/avtovita/brandslogos/scion.png',
	'https://res.cloudinary.com/pomegranitedesign/image/upload/v1740470719/avtovita/brandslogos/smart.png',
	'https://res.cloudinary.com/pomegranitedesign/image/upload/v1740470754/avtovita/brandslogos/subaru.png',
	'https://res.cloudinary.com/pomegranitedesign/image/upload/v1740470790/avtovita/brandslogos/suzuki.png',
	'https://res.cloudinary.com/pomegranitedesign/image/upload/v1740470824/avtovita/brandslogos/opel.png',
	'https://res.cloudinary.com/pomegranitedesign/image/upload/v1740470908/avtovita/brandslogos/oldsmobile.png',
	'https://res.cloudinary.com/pomegranitedesign/image/upload/v1740470942/avtovita/brandslogos/iveco.png',
	'https://res.cloudinary.com/pomegranitedesign/image/upload/v1740470974/avtovita/brandslogos/isuzu.png',
	'https://res.cloudinary.com/pomegranitedesign/image/upload/v1740471009/avtovita/brandslogos/infiniti.png',
	'https://res.cloudinary.com/pomegranitedesign/image/upload/v1740471069/avtovita/brandslogos/jaguar.png',
	'https://res.cloudinary.com/pomegranitedesign/image/upload/v1740471101/avtovita/brandslogos/jeep.png',
	'https://res.cloudinary.com/pomegranitedesign/image/upload/v1740471173/avtovita/brandslogos/zhidou.png',
	'https://res.cloudinary.com/pomegranitedesign/image/upload/v1740471208/avtovita/brandslogos/geely.png',
	'https://res.cloudinary.com/pomegranitedesign/image/upload/v1740471249/avtovita/brandslogos/cadillac.png',
	'https://res.cloudinary.com/pomegranitedesign/image/upload/v1740471287/avtovita/brandslogos/chrysler.png',
	'https://res.cloudinary.com/pomegranitedesign/image/upload/v1740471322/avtovita/brandslogos/tesla.png',
	'https://res.cloudinary.com/pomegranitedesign/image/upload/v1740471360/avtovita/brandslogos/toyota.png',
	'https://res.cloudinary.com/pomegranitedesign/image/upload/v1740471393/avtovita/brandslogos/ferrari.png',
	'https://res.cloudinary.com/pomegranitedesign/image/upload/v1740471424/avtovita/brandslogos/ford.png',
	'https://res.cloudinary.com/pomegranitedesign/image/upload/v1740471465/avtovita/brandslogos/foton.png',
	'https://res.cloudinary.com/pomegranitedesign/image/upload/v1740471496/avtovita/brandslogos/pontiac.png',
	'https://res.cloudinary.com/pomegranitedesign/image/upload/v1740471531/avtovita/brandslogos/peugeot.png',
	'https://res.cloudinary.com/pomegranitedesign/image/upload/v1740471564/avtovita/brandslogos/fiat.png',
	'https://res.cloudinary.com/pomegranitedesign/image/upload/v1740471597/avtovita/brandslogos/hummer.png',
	'https://res.cloudinary.com/pomegranitedesign/image/upload/v1740471630/avtovita/brandslogos/gmc.png',
	'https://res.cloudinary.com/pomegranitedesign/image/upload/v1740471734/avtovita/brandslogos/polestar.png',
	'https://res.cloudinary.com/pomegranitedesign/image/upload/v1740471769/avtovita/brandslogos/BYD.png',
	'https://res.cloudinary.com/pomegranitedesign/image/upload/v1740471866/avtovita/brandslogos/citroen.png',
	'https://res.cloudinary.com/pomegranitedesign/image/upload/v1740471902/avtovita/brandslogos/alfaromeo.png',
	'https://res.cloudinary.com/pomegranitedesign/image/upload/v1740471960/avtovita/brandslogos/astonmartin.png',
	'https://res.cloudinary.com/pomegranitedesign/image/upload/v1740472002/avtovita/brandslogos/acura.png',
	'https://res.cloudinary.com/pomegranitedesign/image/upload/v1740472069/avtovita/brandslogos/honda.png',
]

const BrandSlider = () => {
	const sliderRef = useRef(null)

	useEffect(() => {
		const slider = sliderRef.current
		let scrollAmount = 0

		const scroll = () => {
			if (slider) {
				scrollAmount += 1
				if (scrollAmount >= slider.scrollWidth / 2) {
					scrollAmount = 0 // Сброс в начало
				}
				slider.style.transform = `translateX(-${scrollAmount}px)`
			}
			requestAnimationFrame(scroll)
		}

		requestAnimationFrame(scroll)
	}, [])

	return (
		<div className='overflow-hidden relative bg-white py-4 shadow-lg'>
			<div
				ref={sliderRef}
				className='flex items-center space-x-8 w-max animate-scroll'
			>
				{[...brands, ...brands].map((brand, index) => (
					<img
						key={index}
						src={brand}
						alt='brand logo'
						className='h-5 md:h-7 object-contain'
					/>
				))}
			</div>
		</div>
	)
}

export default BrandSlider
