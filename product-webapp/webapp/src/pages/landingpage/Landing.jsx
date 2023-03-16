import Hero from "../../components/Hero"
import Homepageheader from "../../components/Homepageheader"
import Section from "../../components/Section"
import Testimonial from "../../components/Testimonial"
import ContactUs from "../../components/Contactus"
import Footer from "../../components/Footer"
import AboutUs from "../../components/Aboutus"
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider} from '@mui/material/styles';

const theme = createTheme({
  typography: {
    fontFamily: [
      'Poppins',
      'sans-serif',
    ].join(','),
  },});

function Landing() {
  return (
    <>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Homepageheader />
      <Hero />
      <Section />
      <AboutUs />
      <Testimonial />
      <ContactUs />
      <Footer />
      </ThemeProvider>
    </>

  );
}

export default Landing;