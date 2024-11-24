import { Routes, Route } from 'react-router-dom'

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

            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/most-popular' element={<MostPopular />} />
                <Route path='/movies' element={<Movies />} />
                <Route path='/movie-details' element={<MovieDetails />} />
                <Route path='/series' element={<Series />} />
                <Route path='/series-details' element={<SeriesDetails />} />
                <Route path='/about' element={<About />} />
                <Route path='/pricing' element={<Pricing />} />
                <Route path='/contact' element={<Contact />} />
                <Route path='/login-register' element={<LoginRegister />} />
                <Route path='/account' element={<Account />} />
                <Route path='/error' element={<Error />} />
                <Route path='/privacy-policy' element={<PrivacyPolicy />} />
                <Route path='/terms-and-conditions' element={<TermsConditions />} />
            </Routes>

            <Footer />
        </body>
    )
}

export default App
