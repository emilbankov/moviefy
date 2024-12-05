import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';

import Header from './components/Header/Header';
import Search from './components/Search/Search';
import Home from './components/Home/Home';
import MostPopular from './components/Most Popular/MostPopular';
import Movies from './components/Movies/Movies';
import MovieDetails from './components/Movie Details/MovieDetails';
import Series from './components/Series/Series';
import SeriesDetails from './components/Series Details/SeriesDetails';
import About from './components/About/About';
import Pricing from './components/Pricing/Pricing';
import Contact from './components/Contact/Contact';
import LoginRegister from './components/Login Register/LoginRegister';
import Account from './components/Account/Account';
import Error from './components/Error/Error';
import PrivacyPolicy from './components/Privacy Policy/PrivacyPolicy';
import TermsConditions from './components/Terms Conditions/TermsConditions';
import Loader from './components/Loader/Loader';
import Footer from './components/Footer/Footer';

function App() {
    const [loading, setLoading] = useState(false);
    const location = useLocation();

    useEffect(() => {
        setLoading(true);
        const randomDelay = Math.random() * 0.4 + 0.2;
        const timer = setTimeout(() => {
            setLoading(false);
        }, randomDelay * 1000);

        return () => clearTimeout(timer);
    }, [location]);



    return (
        <body className='bg-dark'>
            <Header />
            <Search />

            {loading && <Loader />}

            <div style={{ display: loading ? 'none' : 'block' }}>
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
            </div>

            <div id="snow-container"></div>
            <Footer />
        </body>
    );
}

export default App;
