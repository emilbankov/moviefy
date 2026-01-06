import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

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
import EmailVerification from './components/Email Verification/EmailVerification';
import PasswordReset from './components/Password Reset/PasswordReset';
import Account from './components/Account/Account';
import Error from './components/Error/Error';
import PrivacyPolicy from './components/Privacy Policy/PrivacyPolicy';
import TermsConditions from './components/Terms Conditions/TermsConditions';
import Loader from './components/Loader/Loader';
import Footer from './components/Footer/Footer';
import CollectionDetails from './components/Collection Details/CollectionDetails';
import ScrollToTop from './components/ScrollToTop/ScrollToTop';
import Results from './components/Results/Results';
import { LoadingProvider, useLoading } from './contexts/LoadingContext';
import AuthGuard from './guards/AuthGuard';
import GuestGuard from './guards/GuestGuard';

function AppContent() {
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const { loading } = useLoading();

    return (
        <div className='bg-dark' style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <ScrollToTop />
            <Header onSearchOpen={() => setIsSearchOpen(true)} />
            <Search isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />

            {loading && (
                <div style={{
                    flex: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#0a0a0a',
                    minHeight: 'calc(100vh - 200px)'
                }}>
                    <Loader />
                </div>
            )}

            <div style={{ display: loading ? 'none' : 'block', flex: 1 }}>
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/most-popular' element={<MostPopular />} />
                    <Route path='/movies' element={<Movies />} />
                    <Route path='/movie/details/:movieId' element={<MovieDetails />} />
                    <Route path='/series' element={<Series />} />
                    <Route path='/series/details/:seriesId' element={<SeriesDetails />} />
                    <Route path='/about' element={<About />} />
                    <Route path='/pricing' element={<Pricing />} />
                    <Route path='/contact' element={<Contact />} />
                    <Route path='/login-register' element={
                        <GuestGuard>
                            <LoginRegister />
                        </GuestGuard>
                    } />
                    <Route path='/verify-email' element={<EmailVerification />} />
                    <Route path='/password-reset' element={<PasswordReset />} />
                    <Route path='/account' element={
                        <AuthGuard>
                            <Account />
                        </AuthGuard>
                    } />
                    <Route path='/error' element={<Error />} />
                    <Route path='/privacy-policy' element={<PrivacyPolicy />} />
                    <Route path='/terms-and-conditions' element={<TermsConditions />} />
                    <Route path='/search' element={<Results />} />
                    <Route path='/genre' element={<Results />} />
                    <Route path='/catalog' element={<Results />} />
                    <Route path='/actor-media' element={<Results />} />
                    <Route path='/crew-media' element={<Results />} />
                    <Route path='/production-company-media' element={<Results />} />
                    <Route path='/collection/:movieId' element={<CollectionDetails />} />

                    <Route path="/404" element={<Navigate to="*" replace />} />
                    <Route path="*" element={<Error />} />
                </Routes>
            </div>

            <div id="snow-container"></div>
            <Footer />
        </div>
    );
}

function App() {
    return (
        <LoadingProvider>
            <AppContent />
        </LoadingProvider>
    );
}

export default App;
