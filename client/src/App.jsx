import Footer from './components/Footer/Footer'
import Header from './components/Header/Header'
import Home from './components/Home/Home'
import MostPopular from './components/Most Popular/MostPopular'
import Search from './components/Search/Search'
import Movies from './components/Movies/Movies'
import MovieDetails from './components/Movie Details/MovieDetails'
import Series from './components/Series/Series'
import SeriesDetails from './components/Series Details/SeriesDetails'
import About from './components/About/About'
import Pricing from './components/Pricing/Pricing'
import Contact from './components/Contact/Contact'
import LoginRegister from './components/Login Register/LoginRegister'
import Account from './components/Account/Account'
import Error from './components/Error/Error'
import PrivacyPolicy from './components/Privacy Policy/PrivacyPolicy'
import TermsConditions from './components/Terms Conditions/TermsConditions'

function App() {
  return (
    <body className='bg-dark'>
      <Header />
      <Search />

      <Home />
      {/* <MostPopular /> */}
      {/* <Movies /> */}
      {/* <MovieDetails /> */}
      {/* <Series /> */}
      {/* <SeriesDetails /> */}
      {/* <About /> */}
      {/* <Pricing /> */}
      {/* <Contact /> */}
      {/* <LoginRegister /> */}
      {/* <Account /> */}
      {/* <Error /> */}
      {/* <PrivacyPolicy /> */}
      {/* <TermsConditions /> */}

      <Footer />
    </body>
  )
}

export default App
