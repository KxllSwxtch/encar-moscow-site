import {
	HeroSection,
	BrandSlider,
	StepsSection,
	PartnersSection,
	WhyChooseUs,
	About,
	CatalogSection,
	ContactForm,
} from '../components'

const Home = () => {
	return (
		<>
			<HeroSection />
			<BrandSlider />
			<About />
			<PartnersSection />
			<CatalogSection />
			<WhyChooseUs />
			<StepsSection />
			<ContactForm />
		</>
	)
}

export default Home
