import {
	HeroSection,
	BrandSlider,
	StepsSection,
	PartnersSection,
	WhyChooseUs,
	About,
	CatalogSection,
	ContactForm,
	CompanyStats,
} from '../components'

const Home = () => {
	return (
		<>
			<HeroSection />
			<BrandSlider />
			<CompanyStats />
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
