import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const loadScript = (src) => {
    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = src;
        script.async = true;
        script.onload = () => resolve(`Loaded: ${src}`);
        script.onerror = () => reject(new Error(`Failed to load script: ${src}`));
        document.body.appendChild(script);
    });
};

const ScriptLoader = ({ children }) => {
    const location = useLocation();

    useEffect(() => {
        const scriptPaths = [
            '/js/jquery-3.6.1.min.js',
            '/js/jquery.appear.js',
            '/js/popper/popper.min.js',
            '/js/bootstrap/bootstrap.min.js',
            '/js/owl-carousel/owl.carousel.min.js',
            '/js/magnific-popup/jquery.magnific-popup.min.js',
            '/js/swiper/swiper-bundle.min.js',
            '/js/swiperanimation/SwiperAnimation.min.js',
            '/js/easy-pie-chart/easy-pie-chart.js',
            '/js/custom.js',
            '/js/active.js',
        ];

        async function loadAllScripts() {
            try {
                for (const src of scriptPaths) {
                    await loadScript(src);
                }
            } catch (error) {
                console.error(error.message); 
            }
        }

        loadAllScripts();
    }, [location.pathname]);

    return children;
};

export default ScriptLoader;