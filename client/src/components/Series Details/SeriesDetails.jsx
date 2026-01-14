// import { Link, useLocation, useParams } from "react-router-dom";
// import { useEffect, useState } from "react";
// import * as seriesService from '../../services/seriesService'
// import * as reviewsService from '../../services/reviewsService'
// import { useLoading } from '../../contexts/LoadingContext';

// // Helper function to convert genre display name to database name
// const getGenreParam = (genreName) => {
//     if (genreName === 'Sci-Fi') return 'Science Fiction';
//     if (genreName === 'Sci-Fi & Fantasy') return 'Science Fiction';
//     return genreName;
// };

// // Helper function to render star rating (rating is 0-10, convert to 0-5 stars)
// const renderStars = (rating) => {
//     const starRating = rating ? Math.round(rating / 2) : 0;
//     const stars = [];

//     for (let i = 1; i <= 5; i++) {
//         if (i <= starRating) {
//             stars.push(<i key={i} className="fas fa-star" />);
//         } else if (i === starRating + 0.5) {
//             stars.push(<i key={i} className="fas fa-star-half-alt" />);
//         } else {
//             stars.push(<i key={i} className="far fa-star" />);
//         }
//     }

//     return stars;
// };

// // Helper function to truncate review content
// const truncateReview = (text, maxLength = 350) => {
//     if (text.length <= maxLength) return text;
//     return text.substring(0, maxLength).trim() + '...';
// };

// export default function SeriesDetails() {
//     const [series, setSeries] = useState([]);
//     const [reviews, setReviews] = useState([]);
//     const [showAllReviews, setShowAllReviews] = useState(false);
//     const [currentPage, setCurrentPage] = useState(1);
//     const [expandedReviews, setExpandedReviews] = useState(new Set());
//     const [episodes, setEpisodes] = useState([]);
//     const [selectedSeason, setSelectedSeason] = useState(null); // Track selected season
//     const [showMoviePlayer, setShowMoviePlayer] = useState(false);
//     const [playingEpisode, setPlayingEpisode] = useState({ season: null, episode: null });
//     const [selectedPlayer, setSelectedPlayer] = useState(() => {
//         return localStorage.getItem('preferredPlayer') || 'vidsrc';
//     });
//     const reviewsPerPage = 20;
//     const { seriesId } = useParams();
//     const location = useLocation();
//     const { setLoading } = useLoading();

//     const players = {
//         vidsrc: {
//             name: 'VidSrc',
//             url: series.series?.api_id && playingEpisode.season && playingEpisode.episode
//                 ? `https://vidsrc.net/embed/tv?tmdb=${series.series.api_id}&season=${playingEpisode.season}&episode=${playingEpisode.episode}`
//                 : `https://vidsrc.net/embed/tv?tmdb=${series.series?.api_id || ''}`
//         },
//         vidlink: {
//             name: 'VidLink',
//             url: series.series?.api_id && playingEpisode.season && playingEpisode.episode
//                 ? `https://vidlink.pro/tv/${series.series.api_id}/${playingEpisode.season}/${playingEpisode.episode}?primaryColor=f6be00&secondaryColor=f6be00&iconColor=f6be00&icons=default&player=default&title=true&poster=true&autoplay=true&nextbutton=true`
//                 : `https://vidlink.pro/tv/${series.series?.api_id || ''}/1/1?primaryColor=f6be00&secondaryColor=f6be00&iconColor=f6be00&icons=default&player=default&title=true&poster=true&autoplay=true&nextbutton=true`
//         }
//     };

//     const handlePlayerChange = (playerId) => {
//         setSelectedPlayer(playerId);
//         localStorage.setItem('preferredPlayer', playerId);
//     };

//     useEffect(() => {
//         setLoading(true);
//         seriesService.getSeriesDetails(seriesId)
//             .then(result => {
//                 setSeries(result);
//                 // Always fetch page 1 initially - contains up to 20 reviews
//                 return reviewsService.getReviews(seriesId, 'series', 1);
//             })
//             .then(reviewsResult => {
//                 if (reviewsResult) {
//                     setReviews(reviewsResult);
//                 }
//             })
//             .catch(err => {
//                 console.log(err);
//             })
//             .finally(() => {
//                 setLoading(false);
//             });

//         return () => {
//             setSeries('series');
//             setReviews([]);
//             setShowAllReviews(false);
//             setCurrentPage(1);
//             setExpandedReviews(new Set());
//         };
//     }, [location.pathname, setLoading, seriesId]);

//     const handleSeasonClick = (seasonId, seasonNumber) => {
//         setSelectedSeason(seasonNumber);

//         seriesService.getEpisodes(seasonId).then(fetchedEpisodes => {
//             setEpisodes(fetchedEpisodes);
//         });
//     };
//     console.log(series);

//     useEffect(() => {
//         if (showAllReviews && currentPage > 1) {
//             const seriesContent = document.querySelector('#movie-content');
//             if (seriesContent) {
//                 seriesContent.scrollIntoView({
//                     behavior: 'smooth',
//                     block: 'start'
//                 });
//             }
//         }
//     }, [currentPage, showAllReviews]);

//     // Fetch all reviews when showAllReviews becomes true
//     useEffect(() => {
//         if (showAllReviews) {
//             const fetchAllReviews = async () => {
//                 const firstPage = await reviewsService.getReviews(seriesId, 'series', 1);
//                 if (firstPage.total_pages <= 1) {
//                     setReviews(firstPage);
//                     return;
//                 }

//                 const allPromises = [];
//                 for (let page = 2; page <= firstPage.total_pages; page++) {
//                     allPromises.push(reviewsService.getReviews(seriesId, 'series', page));
//                 }

//                 const otherPages = await Promise.all(allPromises);
//                 const allReviews = [firstPage, ...otherPages].flatMap(page => page.reviews);

//                 setReviews({
//                     ...firstPage,
//                     reviews: allReviews
//                 });
//             };

//             fetchAllReviews();
//         }
//     }, [showAllReviews, seriesId]);

//     useEffect(() => {
//         // Wait for all images to load before initializing carousel
//         const images = document.querySelectorAll('.owl-carousel img');
//         let loadedCount = 0;
//         const totalImages = images.length;

//         const initCarousel = () => {
//             const existingScript = document.querySelector('script[src="/js/custom.js"]');
//             if (existingScript) {
//                 document.body.removeChild(existingScript);
//             }

//             const script = document.createElement('script');
//             script.src = '/js/custom.js';
//             script.async = true;
//             document.body.appendChild(script);
//         };

//         if (totalImages === 0) {
//             // No images, initialize immediately
//             initCarousel();
//         } else {
//             // Wait for all images to load
//             images.forEach((img) => {
//                 if (img.complete) {
//                     loadedCount++;
//                 } else {
//                     img.addEventListener('load', () => {
//                         loadedCount++;
//                         if (loadedCount === totalImages) {
//                             initCarousel();
//                         }
//                     });
//                     img.addEventListener('error', () => {
//                         loadedCount++;
//                         if (loadedCount === totalImages) {
//                             initCarousel();
//                         }
//                     });
//                 }
//             });

//             // If all images were already loaded
//             if (loadedCount === totalImages) {
//                 initCarousel();
//             }
//         }

//         return () => {
//             const script = document.querySelector('script[src="/js/custom.js"]');
//             if (script && document.body.contains(script)) {
//                 document.body.removeChild(script);
//             }
//         };
//     }, [series.series, series.series?.seasons, episodes, selectedSeason]);

//     // Reinitialize popup functionality when movie player closes
//     useEffect(() => {
//         if (!showMoviePlayer && series.series) {
//             // Wait a bit for DOM to update, then reinitialize Magnific Popup
//             const timer = setTimeout(() => {
//                 if (window.jQuery && window.jQuery.magnificPopup && window.jQuery('.popup-youtube').length > 0) {
//                     // Destroy existing popup bindings and reinitialize
//                     window.jQuery('.popup-youtube').off('click').magnificPopup({
//                         type: 'iframe',
//                         mainClass: 'mfp-fade',
//                         removalDelay: 160,
//                         preloader: false,
//                         fixedContentPos: false
//                     });
//                 }
//             }, 100);
//             return () => clearTimeout(timer);
//         }
//     }, [showMoviePlayer, series.series]);

//     const handleScroll = (event) => {
//         event.preventDefault();
//         const episodesSection = document.getElementById('episodes');
//         const seasonsSection = document.getElementById('seasons');

//         if (episodesSection) {
//             const offset = 500;
//             const elementPosition = episodesSection.getBoundingClientRect().top + window.pageYOffset;
//             const offsetPosition = elementPosition - offset;

//             window.scrollTo({
//                 top: offsetPosition,
//                 behavior: 'smooth'
//             });
//         } else if (seasonsSection) {
//             const offset = 500;
//             const elementPosition = seasonsSection.getBoundingClientRect().top + window.pageYOffset;
//             const offsetPosition = elementPosition - offset;

//             window.scrollTo({
//                 top: offsetPosition,
//                 behavior: 'smooth'
//             });
//         }
//     };

//     return (
//         <>
//             {series.series && (
//                 <section className="single-movie-details space-pb bg-holder bg-overlay-dark-99 overflow-hidden" style={{ backgroundImage: "url(/images/bg/03.jpg)" }}>
//                     <div className="container position-relative">
//                         <div className="row">
//                             <div className="col-12 ">
//                                 <div className="movie-details-bg bg-overlay-dark-5" style={{ backgroundImage: showMoviePlayer ? 'none' : `url(https://image.tmdb.org/t/p/original${series.series.backdrop_path || ''})`, padding: showMoviePlayer ? 0 : undefined }}>
//                                     {showMoviePlayer ? (
//                                         <div style={{
//                                             width: '100%',
//                                             position: 'relative',
//                                             background: 'transparent',
//                                             margin: 0,
//                                             padding: 0
//                                         }}>
//                                             <button
//                                                 className="btn btn-sm btn-light"
//                                                 style={{ position: 'absolute', top: 20, right: 20, zIndex: 10 }}
//                                                 onClick={() => {
//                                                     setShowMoviePlayer(false);
//                                                     setPlayingEpisode({ season: null, episode: null });
//                                                 }}
//                                             >
//                                                 Back to Details
//                                             </button>
//                                             <iframe
//                                                 src={players[selectedPlayer]?.url}
//                                                 frameBorder="0"
//                                                 allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//                                                 allowFullScreen
//                                                 title="Series Player"
//                                                 style={{
//                                                     width: '100%',
//                                                     height: '70vh',
//                                                     background: 'transparent',
//                                                     margin: 0,
//                                                     padding: 0,
//                                                     display: 'block'
//                                                 }}
//                                             />
//                                             <div className="d-flex justify-content-center mt-3 mb-3">
//                                                 <div className="player-selector" style={{
//                                                     display: 'flex',
//                                                     border: '1px solid #444',
//                                                     borderRadius: '6px',
//                                                     overflow: 'hidden',
//                                                     backgroundColor: '#1a1a1a'
//                                                 }}>
//                                                     {Object.entries(players).map(([playerId, player]) => (
//                                                         <button
//                                                             key={playerId}
//                                                             type="button"
//                                                             style={{
//                                                                 backgroundColor: selectedPlayer === playerId ? '#f6be00' : 'transparent',
//                                                                 color: selectedPlayer === playerId ? '#000' : '#fff',
//                                                                 border: 'none',
//                                                                 padding: '10px 20px',
//                                                                 cursor: 'pointer',
//                                                                 fontSize: '16px',
//                                                                 fontWeight: '500',
//                                                                 transition: 'none',
//                                                                 borderRadius: '0'
//                                                             }}
//                                                             onClick={() => handlePlayerChange(playerId)}
//                                                             onMouseEnter={(e) => {
//                                                                 if (selectedPlayer !== playerId) {
//                                                                     e.target.style.backgroundColor = '#333';
//                                                                 }
//                                                             }}
//                                                             onMouseLeave={(e) => {
//                                                                 if (selectedPlayer !== playerId) {
//                                                                     e.target.style.backgroundColor = 'transparent';
//                                                                 }
//                                                             }}
//                                                         >
//                                                             {player.name}
//                                                         </button>
//                                                     ))}
//                                                 </div>
//                                             </div>
//                                         </div>
//                                     ) : (
//                                         <div className="row position-relative">
//                                             <div className="col-xxl-6 col-xl-7 col-lg-6 col-md-8 col-sm-12 order-md-1 order-2">
//                                                 <div className="movie-details">
//                                                     <div className="movie-info">
//                                                         <h2 className="title">{series.series.name}</h2>
//                                                         <div className="movie-details-info movies-info">
//                                                             <div className="features">
//                                                                 <span className="imdb">
//                                                                     <a className="logo-align" href={`https://www.imdb.com/title/${series.series.imdb_id}`} target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>
//                                                                         <img className="img-fluid" src="/images/imdb-logo.png" alt="#" />{series.series.vote_average}
//                                                                     </a>
//                                                                 </span>
//                                                                 <span className="imdb">
//                                                                     <a className="logo-align" href={`https://www.themoviedb.org/tv/${series.series.api_id}`} target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>
//                                                                         <img className="img-fluid" src="/images/tmdb-logo.svg" alt="#" />{series.series.vote_average}
//                                                                     </a>
//                                                                 </span>
//                                                             </div>
//                                                         </div>
//                                                         <div className="movies-language">Language:{" "} English{" "}</div>
//                                                         <div className="movies-genre">
//                                                             Genre:{" "}
//                                                             {series.series.genres.map((genre, index) => (
//                                                                 <Link key={index} to={`/genre?genre=${getGenreParam(genre.name)}&media=series`}>
//                                                                     {genre.name}
//                                                                     {index < series.series.genres.length - 1 && ", "}
//                                                                 </Link>
//                                                             ))}
//                                                         </div>
//                                                         <div className="d-sm-flex">
//                                                             <div className="movies-genre">
//                                                                 Status: {series.series.status}
//                                                             </div>
//                                                             <div className="movies-genre ms-3">
//                                                                 Type: {series.series.type}
//                                                             </div>
//                                                         </div>
//                                                         <div className="movies-genre">
//                                                             Studio:{" "}
//                                                             {series.series.production_companies.map((company, index) => (
//                                                                 <span key={index}>
//                                                                     <Link
//                                                                         to={`/production-company-media?prodId=${company.id}&prodName=${encodeURIComponent(company.name)}&prodImage=${encodeURIComponent(company.logo_path || '')}&mediaType=all`}
//                                                                         style={{ textDecoration: 'none' }}
//                                                                     >
//                                                                         {company.name}
//                                                                     </Link>
//                                                                     {index < series.series.production_companies.length - 1 && ", "}
//                                                                 </span>
//                                                             ))}
//                                                         </div>
//                                                         <div className="d-sm-flex">
//                                                             <span className="year">{new Date(series.series.first_air_date).toLocaleDateString('en-GB')}</span>
//                                                             <a className="time" href="#">
//                                                                 SS {series.series.seasons[series.series.seasons.length - 1].season_number}
//                                                                 <span className="dot"></span>
//                                                                 EPS {series.series.seasons[series.series.seasons.length - 1].episode_count}
//                                                             </a>
//                                                             <span className="quality">
//                                                                 Quality: <a href="#">720P, 1080P</a>
//                                                             </span>
//                                                         </div>
//                                                         <p className="mb-4">
//                                                             {series.series.overview}
//                                                         </p>
//                                                         <a className="btn btn-primary popup-youtube" href={`https://www.youtube.com/watch?v=${series.series.trailer}`}><i className="fa-solid fa-play" />
//                                                             Watch Trailer
//                                                         </a>
//                                                     </div>
//                                                 </div>
//                                             </div>
//                                             <div className="col-xxl-6 col-xl-5 col-lg-6  col-md-4 col-sm-12 align-self-center order-md-2 order-1">
//                                                 <div className="video movie-video-btn mb-4 mb-md-0">
//                                                     <button className="video-btn btn-animation" onClick={handleScroll}><i className="fa-solid fa-play" /></button>
//                                                 </div>
//                                             </div>
//                                         </div>
//                                     )}
//                                 </div>
//                             </div>
//                         </div>
//                         {series.series.seasons && !selectedSeason && (
//                             <div className="row mt-4 mt-lg-5" id="seasons">
//                                 <div className="col-md-12">
//                                     <div className="section-title">
//                                         <h2 className="title">Seasons</h2>
//                                     </div>
//                                 </div>
//                                 <div className="col-md-12">
//                                     <div
//                                         className="owl-carousel owl-nav-center"
//                                         data-nav-dots="false"
//                                         data-nav-arrow="true"
//                                         data-items={5}
//                                         data-xl-items={5}
//                                         data-lg-items={5}
//                                         data-md-items={4}
//                                         data-sm-items={3}
//                                         data-xs-items={2}
//                                         data-space={30}
//                                         data-autoheight="true"
//                                         data-autoplay="false"
//                                         data-loop="false"
//                                     >
//                                         {series.series.seasons && series.series.seasons.map((season) => (
//                                             <Link key={season.id} onClick={() => handleSeasonClick(season.id, season.season_number)}>
//                                                 <div className="item">
//                                                     <div className="episode-item">
//                                                         <a
//                                                             href={series?.series?.trailer ? `https://www.youtube.com/watch?v=${series.series.trailer}` : '#'}
//                                                             className={`tv-episode ${series?.series?.trailer ? 'popup-youtube' : ''}`}
//                                                             onClick={(e) => {
//                                                                 // Prevent triggering season selection when playing trailer
//                                                                 e.stopPropagation();
//                                                                 // If no trailer, prevent default navigation to '#'
//                                                                 if (!series?.series?.trailer) {
//                                                                     e.preventDefault();
//                                                                 }
//                                                             }}
//                                                         >
//                                                             <img
//                                                                 className="img-fluid"
//                                                                 src={season.poster_path
//                                                                     ? `https://image.tmdb.org/t/p/w500${season.poster_path}`
//                                                                     : '/images/no-image-seasons.png'}
//                                                                 alt="#"
//                                                                 onError={(e) => { e.target.src = '/images/no-image-seasons.png'; }}
//                                                             />
//                                                             <div className="episode-info">
//                                                                 <span className="play-btn"><i className="fa-solid fa-play" /></span>
//                                                                 <h6 className="title">
//                                                                     SS {season.season_number}
//                                                                     <span className="dot"></span>
//                                                                     EPS {season.episode_count}
//                                                                 </h6>
//                                                                 <h6 className="title">/ {new Date(season.air_date).getFullYear()}</h6>
//                                                             </div>
//                                                         </a>
//                                                     </div>
//                                                 </div>
//                                             </Link>
//                                         ))}
//                                     </div>
//                                 </div>
//                             </div>
//                         )}
//                         {episodes[selectedSeason] && selectedSeason && (
//                             <div className="row mt-4 mt-lg-5" id="episodes">
//                                 <div className="col-md-12">
//                                     <div className="section-title">
//                                         <h2 className="title">Episodes</h2>
//                                         <button href="" className="btn-link link-yellow" onClick={() => setSelectedSeason(null)}>
//                                             Seasons
//                                         </button>
//                                     </div>
//                                 </div>
//                                 <div className="col-md-12">
//                                     <div
//                                         className="owl-carousel owl-nav-center"
//                                         data-nav-dots="false"
//                                         data-nav-arrow="true"
//                                         data-items={3}
//                                         data-xl-items={3}
//                                         data-lg-items={3}
//                                         data-md-items={3}
//                                         data-sm-items={2}
//                                         data-xs-items={1}
//                                         data-space={30}
//                                         data-autoheight="true"
//                                         data-autoplay="false"
//                                         data-loop="false"
//                                     >
//                                         {episodes[selectedSeason].map((episode) => {
//                                             return (
//                                                 <div className="item" key={episode.episode_number}>
//                                                     <div className="episode-item">
//                                                         <a
//                                                             href="#"
//                                                             className="play-btn-episodes"
//                                                             onClick={(e) => {
//                                                                 e.preventDefault();
//                                                                 setPlayingEpisode({ season: selectedSeason, episode: episode.episode_number });
//                                                                 setShowMoviePlayer(true);
//                                                             }}
//                                                         >
//                                                             <i className="fa-solid fa-play" />
//                                                         </a>
//                                                         <img
//                                                             className="img-fluid"
//                                                             src={episode.still_path
//                                                                 ? `https://image.tmdb.org/t/p/w500${episode.still_path}`
//                                                                 : '/images/no-image-episodes.png'}
//                                                             alt="#"
//                                                             onError={(e) => { e.target.src = '/images/no-image-episodes.png'; }}
//                                                         />
//                                                         <div className="episode-info">
//                                                             <h6 className="title">
//                                                                 {episode.episode_number}. {episode.name}
//                                                             </h6>
//                                                         </div>
//                                                     </div>
//                                                 </div>
//                                             );
//                                         })}
//                                     </div>
//                                 </div>
//                             </div>
//                         )}
//                         <div className="row mt-4 mt-lg-5">
//                             <div className="col-md-12">
//                                 <div className="section-title">
//                                     <h2 className="title">Cast &amp; Crew</h2>
//                                 </div>
//                             </div>
//                         </div>
//                         <div className="row">
//                             <div className="col-lg-3-4 col-md-6 order-lg-1 mb-4 mb-md-0">
//                                 <h6 className="author-title">Director, Writers & Producers</h6>
//                                 {series.series.crew &&
//                                     series.series.crew
//                                         .filter((crew) =>
//                                             crew.job === "Director" ||
//                                             crew.job === "Creator" ||
//                                             crew.job === "Writer" ||
//                                             crew.job === "Screenplay" ||
//                                             crew.job === "Producer"
//                                         )
//                                         .slice(0, 3)  // Limit to the first three entries
//                                         .map((crew, index) => (
//                                             <Link to={`/crew-media?crewId=${crew.id}&crewName=${encodeURIComponent(crew.name)}&crewImage=${encodeURIComponent(crew.profilePath || '')}`} className="movie-author" key={`crew-${crew.id}-${index}`}>
//                                                 <div className="author-img">
//                                                     <img
//                                                         className="crew img-fluid"
//                                                         src={crew.profilePath
//                                                             ? `https://image.tmdb.org/t/p/w138_and_h175_face${crew.profilePath}`
//                                                             : '/images/no-image.jpg'}
//                                                         alt={crew.name}
//                                                         onError={(e) => { e.target.src = '/images/no-image.jpg'; }}
//                                                     />
//                                                 </div>
//                                                 <div className="author-details">
//                                                     <h6 className="author-name">{crew.name}</h6>
//                                                     <span className="author-designation">{crew.job}</span>
//                                                 </div>
//                                             </Link>
//                                         ))}
//                             </div>
//                             <div className="col-lg-9 col-md-12 order-lg-2 mb-4 mb-lg-0">
//                                 <h6 className="author-title">Cast</h6>
//                                 <div className="row">
//                                     {series.series.cast &&
//                                         series.series.cast.slice(0, 9).map((actor) => (
//                                             <div className="col-md-4" key={`cast-${actor.id}`}>
//                                                 <Link to={`/actor-media?actorId=${actor.id}&actorName=${encodeURIComponent(actor.name)}&actorImage=${encodeURIComponent(actor.profilePath || '')}`} className="movie-author">
//                                                     <div className="author-img">
//                                                         <img
//                                                             className="actor img-fluid"
//                                                             src={actor.profilePath
//                                                                 ? `https://media.themoviedb.org/t/p/w138_and_h175_face${actor.profilePath}`
//                                                                 : '/images/no-image.jpg'}
//                                                             alt={actor.name}
//                                                             onError={(e) => { e.target.src = '/images/no-image.jpg'; }}
//                                                         />
//                                                     </div>
//                                                     <div className="author-details">
//                                                         <h6 className="author-name">{actor.name}</h6>
//                                                         <span className="author-designation">{actor.character}</span>
//                                                     </div>
//                                                 </Link>
//                                             </div>
//                                         ))}
//                                 </div>
//                             </div>
//                         </div>
//                         <div id="movie-content" className="row">
//                             <div className="col-md-12">
//                                 <hr />
//                             </div>
//                         </div>
//                         <div className="row">
//                             <div className="col-md-12">
//                                 <div className="movie-details-tabs tabs">
//                                     <ul
//                                         className="nav nav-tabs nav-pills mb-3"
//                                         id="pills-tab"
//                                         role="tablist"
//                                     >
//                                         <li className="nav-item" role="presentation">
//                                             <button
//                                                 className="nav-link active"
//                                                 id="pills-description-tab"
//                                                 data-bs-toggle="pill"
//                                                 data-bs-target="#pills-description"
//                                                 type="button"
//                                                 role="tab"
//                                                 aria-controls="pills-description"
//                                                 aria-selected="true"
//                                             >
//                                                 Overview
//                                             </button>
//                                         </li>
//                                         <li className="nav-item" role="presentation">
//                                             <button
//                                                 className="nav-link"
//                                                 id="pills-information-tab"
//                                                 data-bs-toggle="pill"
//                                                 data-bs-target="#pills-information"
//                                                 type="button"
//                                                 role="tab"
//                                                 aria-controls="pills-information"
//                                                 aria-selected="false"
//                                             >
//                                                 Production Companies
//                                             </button>
//                                         </li>
//                                         <li className="nav-item" role="presentation">
//                                             <button
//                                                 className="nav-link"
//                                                 id="pills-reviews-tab"
//                                                 data-bs-toggle="pill"
//                                                 data-bs-target="#pills-reviews"
//                                                 type="button"
//                                                 role="tab"
//                                                 aria-controls="pills-reviews"
//                                                 aria-selected="false"
//                                             >
//                                                 Reviews ({reviews?.total_items || 0})
//                                             </button>
//                                         </li>
//                                     </ul>
//                                     <div className="tab-content" id="pills-tabContent">
//                                         <div
//                                             className="tab-pane fade show active"
//                                             id="pills-description"
//                                             role="tabpanel"
//                                             aria-labelledby="pills-description-tab"
//                                             tabIndex={0}
//                                         >
//                                             <p>{series.series.overview}</p>
//                                         </div>
//                                         <div
//                                             className="tab-pane fade"
//                                             id="pills-information"
//                                             role="tabpanel"
//                                             aria-labelledby="pills-information-tab"
//                                             tabIndex={0}
//                                         >
//                                             {series.series.production_companies && series.series.production_companies.length > 0 ? (
//                                                 <div className="row">
//                                                     {series.series.production_companies.map((company, index) => (
//                                                         <div className="col-lg-3 col-md-4 col-sm-6 mb-4" key={`prod-${company.id}`}>
//                                                             <Link
//                                                                 to={`/production-company-media?prodId=${company.id}&prodName=${encodeURIComponent(company.name)}&prodImage=${encodeURIComponent(company.logo_path || '')}&mediaType=all`}
//                                                                 className="movie-author"
//                                                                 style={{ textDecoration: 'none', color: 'inherit' }}
//                                                             >
//                                                                 <div className="author-img" style={{
//                                                                     display: "flex",
//                                                                     alignItems: "center",
//                                                                     justifyContent: "center",
//                                                                     width: company.logo_path ? "auto" : "120px",
//                                                                     height: "50px",
//                                                                     borderRadius: "0"
//                                                                 }}>
//                                                                     <img
//                                                                         src={company.logo_path ? `https://image.tmdb.org/t/p/w300${company.logo_path}` : '/images/no-image-episodes.png'}
//                                                                         alt={company.name}
//                                                                         className="img-fluid"
//                                                                         style={{
//                                                                             width: company.logo_path ? "auto" : "120px",
//                                                                             height: "50px",
//                                                                             objectFit: 'contain',
//                                                                             borderRadius: "0"
//                                                                         }}
//                                                                         onError={(e) => { e.target.src = '/images/no-image.jpg'; }}
//                                                                     />
//                                                                 </div>
//                                                                 <div className="author-details">
//                                                                     <h6 className="author-name" style={{ fontSize: '14px', textAlign: 'center', marginTop: '8px' }}>
//                                                                         {company.name}
//                                                                     </h6>
//                                                                 </div>
//                                                             </Link>
//                                                         </div>
//                                                     ))}
//                                                 </div>
//                                             ) : (
//                                                 <p>No production companies available.</p>
//                                             )}
//                                         </div>
//                                         <div
//                                             className="tab-pane fade"
//                                             id="pills-reviews"
//                                             role="tabpanel"
//                                             aria-labelledby="pills-reviews-tab"
//                                             tabIndex={0}
//                                         >
//                                             <div className="row">
//                                                 <div className="col-12">
//                                                     {reviews?.reviews && reviews.reviews.length > 0 ? (
//                                                         <>
//                                                             {/* Display reviews - show 6 initially, or paginated reviews if showAllReviews */}
//                                                             {(showAllReviews ? reviews.reviews.slice((currentPage - 1) * reviewsPerPage, currentPage * reviewsPerPage) : reviews.reviews.slice(0, 6)).map((review, index) => {
//                                                                 // Create a stable key for tracking expanded reviews
//                                                                 const reviewKey = review.id || `${review.author}- ${review.created_at}-${index}`;
//                                                                 const globalIndex = showAllReviews ? ((currentPage - 1) * reviewsPerPage) + index : index;
//                                                                 return (
//                                                                     <div key={`review-${globalIndex}-${review.author}-${Date.parse(review.created_at)}`} className="commentlist">
//                                                                         <div className="comment-author">
//                                                                             <img
//                                                                                 className="img-fluid"
//                                                                                 src={review.author_path ? `https://image.tmdb.org/t/p/w45${review.author_path}` : '/images/no-image.jpg'}
//                                                                                 alt={review.author}
//                                                                                 onError={(e) => { e.target.src = '/images/no-image.jpg'; }}
//                                                                                 style={{ minWidth: '70px', minHeight: '70px', width: '70px', height: '70px', objectFit: 'cover' }}
//                                                                             />
//                                                                         </div>
//                                                                         <div className="comment-content">
//                                                                             <div className="reviews">
//                                                                                 <p className="meta">
//                                                                                     <strong>{review.author}</strong> {new Date(review.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
//                                                                                 </p>
//                                                                                 <div className="rating" style={{ color: '#FFD700' }}>
//                                                                                     {renderStars(review.rating)}
//                                                                                 </div>
//                                                                             </div>
//                                                                             <p>
//                                                                                 {expandedReviews.has(reviewKey) ? review.content : truncateReview(review.content)}
//                                                                                 {review.content.length > 350 && (
//                                                                                     <button
//                                                                                         type="button"
//                                                                                         className="btn btn-link p-0 ms-2 text-primary"
//                                                                                         style={{ textDecoration: 'none', fontSize: '0.9em' }}
//                                                                                         onClick={() => {
//                                                                                             const newExpanded = new Set(expandedReviews);
//                                                                                             if (newExpanded.has(reviewKey)) {
//                                                                                                 newExpanded.delete(reviewKey);
//                                                                                             } else {
//                                                                                                 newExpanded.add(reviewKey);
//                                                                                             }
//                                                                                             setExpandedReviews(newExpanded);
//                                                                                         }}
//                                                                                     >
//                                                                                         {expandedReviews.has(reviewKey) ? 'Read Less' : 'Read More'}
//                                                                                     </button>
//                                                                                 )}
//                                                                             </p>
//                                                                         </div>
//                                                                     </div>
//                                                                 );
//                                                             })}

//                                                             {/* View More Button */}
//                                                             {!showAllReviews && reviews.reviews.length > 6 && (
//                                                                 <div className="text-center mt-4">
//                                                                     <button
//                                                                         type="button"
//                                                                         className="btn btn-primary"
//                                                                         onClick={() => setShowAllReviews(true)}
//                                                                     >
//                                                                         View More Reviews
//                                                                     </button>
//                                                                 </div>
//                                                             )}

//                                                             {/* Pagination - only show when showAllReviews is true and there are more than 20 reviews total */}
//                                                             {showAllReviews && reviews.total_items > 20 && (
//                                                                 <div className="row mt-4">
//                                                                     <div className="col-12">
//                                                                         <nav aria-label="Reviews pagination">
//                                                                             <ul className="pagination justify-content-center">
//                                                                                 <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
//                                                                                     <button
//                                                                                         type="button"
//                                                                                         className="page-link"
//                                                                                         onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
//                                                                                         disabled={currentPage === 1}
//                                                                                     >
//                                                                                         Previous
//                                                                                     </button>
//                                                                                 </li>
//                                                                                 {Array.from({ length: Math.ceil(reviews.total_items / reviewsPerPage) }, (_, i) => i + 1).map(page => (
//                                                                                     <li key={page} className={`page-item ${currentPage === page ? 'active' : ''}`}>
//                                                                                         <button
//                                                                                             type="button"
//                                                                                             className="page-link"
//                                                                                             onClick={() => setCurrentPage(page)}
//                                                                                         >
//                                                                                             {page}
//                                                                                         </button>
//                                                                                     </li>
//                                                                                 ))}
//                                                                                 <li className={`page-item ${currentPage === Math.ceil(reviews.total_items / reviewsPerPage) ? 'disabled' : ''}`}>
//                                                                                     <button
//                                                                                         type="button"
//                                                                                         className="page-link"
//                                                                                         onClick={() => setCurrentPage(prev => Math.min(Math.ceil(reviews.total_items / reviewsPerPage), prev + 1))}
//                                                                                         disabled={currentPage === Math.ceil(reviews.total_items / reviewsPerPage)}
//                                                                                     >
//                                                                                         Next
//                                                                                     </button>
//                                                                                 </li>
//                                                                             </ul>
//                                                                         </nav>
//                                                                     </div>
//                                                                 </div>
//                                                             )}
//                                                         </>
//                                                     ) : (
//                                                         <p>No reviews available yet.</p>
//                                                     )}
//                                                 </div>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </section>
//             )}
//         </>
//     );
// }

import { Link, useLocation, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import * as seriesService from '../../services/seriesService';
import * as reviewsService from '../../services/reviewsService';
import * as userService from '../../services/userService';
import { useLoading } from '../../contexts/LoadingContext';
import { useNotifications } from '../../contexts/NotificationContext';
import MetaTags from '../Meta Tags/MetaTags';

// Helper function to convert genre display name to database name
const getGenreParam = (genreName) => {
    if (genreName === 'Sci-Fi') return 'Science Fiction';
    if (genreName === 'Sci-Fi & Fantasy') return 'Science Fiction';
    return genreName;
};

// Helper function to render star rating (rating is 0-10, convert to 0-5 stars)
const renderStars = (rating) => {
    const starRating = rating ? Math.round(rating / 2) : 0;
    const stars = [];

    for (let i = 1; i <= 5; i++) {
        if (i <= starRating) {
            stars.push(<i key={i} className="fas fa-star" />);
        } else if (i === starRating + 0.5) {
            stars.push(<i key={i} className="fas fa-star-half-alt" />);
        } else {
            stars.push(<i key={i} className="far fa-star" />);
        }
    }

    return stars;
};

// Helper function to truncate review content
const truncateReview = (text, maxLength = 350) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength).trim() + '...';
};

export default function SeriesDetails() {
    const { seriesId } = useParams();
    const location = useLocation();
    const { setLoading } = useLoading();

    // Get season and episode from URL query parameters
    const searchParams = new URLSearchParams(location.search);
    const urlSeason = searchParams.get('season');
    const urlEpisode = searchParams.get('episode');

    const [series, setSeries] = useState([]);
    const [reviews, setReviews] = useState([]);
    const [showAllReviews, setShowAllReviews] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [expandedReviews, setExpandedReviews] = useState(new Set());
    const [episodes, setEpisodes] = useState([]);
    const [selectedSeason, setSelectedSeason] = useState(urlSeason ? parseInt(urlSeason) : null); // Track selected season
    const [seasonSelectedByUrl, setSeasonSelectedByUrl] = useState(!!urlSeason); // Track if season was selected via URL
    const [showMoviePlayer, setShowMoviePlayer] = useState(!!urlEpisode); // Initialize to true if episode param exists
    const [playingEpisode, setPlayingEpisode] = useState({
        season: urlSeason ? parseInt(urlSeason) : null,
        episode: urlEpisode ? parseInt(urlEpisode) : null
    });
    const [selectedPlayer, setSelectedPlayer] = useState(() => {
        return localStorage.getItem('preferredPlayer') || 'vidsrc';
    });
    const [favoriteSeriesIds, setFavoriteSeriesIds] = useState(new Set());
    const { addNotification } = useNotifications();

    const reviewsPerPage = 20;

    const players = {
        vidsrc: {
            name: 'VidSrc',
            url: series.series?.api_id && playingEpisode.season && playingEpisode.episode
                ? `https://vidsrc.net/embed/tv?tmdb=${series.series.api_id}&season=${playingEpisode.season}&episode=${playingEpisode.episode}`
                : `https://vidsrc.net/embed/tv?tmdb=${series.series?.api_id || ''}`
        },
        vidlink: {
            name: 'VidLink',
            url: series.series?.api_id && playingEpisode.season && playingEpisode.episode
                ? `https://vidlink.pro/tv/${series.series.api_id}/${playingEpisode.season}/${playingEpisode.episode}?primaryColor=f6be00&secondaryColor=f6be00&iconColor=f6be00&icons=default&player=default&title=true&poster=true&autoplay=true&nextbutton=true`
                : `https://vidlink.pro/tv/${series.series?.api_id || ''}/1/1?primaryColor=f6be00&secondaryColor=f6be00&iconColor=f6be00&icons=default&player=default&title=true&poster=true&autoplay=true&nextbutton=true`
        }
    };

    const handlePlayerChange = (playerId) => {
        setSelectedPlayer(playerId);
        localStorage.setItem('preferredPlayer', playerId);
    };

    const toggleFavorite = async (id, e) => {
        e.preventDefault();
        e.stopPropagation();

        const isFavorited = favoriteSeriesIds.has(id);

        try {
            if (isFavorited) {
                // Remove from favorites - wait for API success
                const response = await userService.removeSeriesFromFavorites(id);
                setFavoriteSeriesIds(prev => {
                    const newSet = new Set(prev);
                    newSet.delete(id);
                    return newSet;
                });
            } else {
                // Add to favorites - wait for API success
                const response = await userService.addSeriesToFavorites(id);
                setFavoriteSeriesIds(prev => new Set([...prev, id]));

                // Header dropdown notification
                if (series?.series) {
                    const year = series.series.first_air_date ? new Date(series.series.first_air_date).getFullYear() : 'N/A';
                    const seasonCount = series.series.seasons?.length ?? series.series.number_of_seasons ?? 'N/A';
                    const episodeCount = series.series.number_of_episodes ?? 'N/A';
                    
                    addNotification({
                        type: 'favorite_add',
                        mediaType: 'series',
                        title: series.series.name,
                        subtitle: 'Added to favorites',
                        meta: `${year} | SS ${seasonCount} • EPS ${episodeCount}`,
                        imageUrl: series.series.poster_path ? `https://image.tmdb.org/t/p/w92${series.series.poster_path}` : '/images/no-image.jpg',
                        thumbnail: series.series.backdrop_path ? `https://image.tmdb.org/t/p/w185${series.series.backdrop_path}` : undefined,
                    });
                }
            }
        } catch (error) {
            console.error('Error toggling favorite series:', error);

            // Handle authentication errors (including redirects to login)
            if (error.status === 401 || error.status === 403 || error.status === 302) {
                addNotification({
                    type: 'error',
                    mediaType: 'series',
                    title: 'Authentication Required',
                    subtitle: 'You need to be logged in to add favorites',
                    meta: '',
                    imageUrl: '/images/no-image.jpg',
                });
            }

            // Don't update UI on error - heart stays in current state
        }
    };

    useEffect(() => {
        setLoading(true);
        seriesService.getSeriesDetails(seriesId)
            .then(result => {
                setSeries(result);
                // Always fetch page 1 initially - contains up to 20 reviews
                return reviewsService.getReviews(seriesId, 'series', 1);
            })
            .then(reviewsResult => {
                if (reviewsResult) {
                    setReviews(reviewsResult);
                }
            })
            .catch(err => {
                console.log(err);
            })
            .finally(() => {
                setLoading(false);
            });

        return () => {
            setSeries('series');
            setReviews([]);
            setShowAllReviews(false);
            setCurrentPage(1);
            setExpandedReviews(new Set());
        };
    }, [location.pathname, setLoading, seriesId]);

    useEffect(() => {
        // Load user's favorite series IDs (best-effort)
        userService.getFavoriteSeriesIds()
            .then(favoriteSeries => {
                if (favoriteSeries?.data) {
                    setFavoriteSeriesIds(new Set(favoriteSeries.data));
                }
            })
            .catch(err => {
                console.error('Error loading favorite series IDs:', err);
            });
    }, []);

    const handleSeasonClick = (seasonId, seasonNumber) => {
        setSelectedSeason(seasonNumber);
        setSeasonSelectedByUrl(false); // Mark as clicked, not URL

        // Update URL with season parameter
        const newSearchParams = new URLSearchParams(location.search);
        newSearchParams.set('season', seasonNumber);
        newSearchParams.delete('episode'); // Remove episode when changing season
        const newUrl = `${location.pathname}?${newSearchParams.toString()}`;
        window.history.replaceState(null, '', newUrl);

        seriesService.getEpisodes(seasonId).then(fetchedEpisodes => {
            setEpisodes(fetchedEpisodes);
        });
    };
    console.log(series);

    // Handle URL parameter changes
    useEffect(() => {
        // Only process URL params if series data is loaded
        if (!series.series) return;

        const newUrlSeason = searchParams.get('season');
        const newUrlEpisode = searchParams.get('episode');

        const newSeasonNum = newUrlSeason ? parseInt(newUrlSeason) : null;
        const newEpisodeNum = newUrlEpisode ? parseInt(newUrlEpisode) : null;

        // Update state if URL params changed
        if (newSeasonNum !== selectedSeason) {
            setSelectedSeason(newSeasonNum);
            setSeasonSelectedByUrl(true); // Mark as URL-selected
            if (newSeasonNum && series.series?.seasons) {
                const seasonData = series.series.seasons.find(s => s.season_number === newSeasonNum);
                if (seasonData) {
                    seriesService.getEpisodes(seasonData.id).then(fetchedEpisodes => {
                        setEpisodes(fetchedEpisodes);
                    });
                }
            }
        }

        // Only update playing episode and open player if we have an episode parameter
        // Don't close the player if episode param is removed
        if (newUrlEpisode && newEpisodeNum !== playingEpisode.episode) {
            console.log('Setting playing episode to:', newEpisodeNum);
            setPlayingEpisode(prev => ({ ...prev, season: newSeasonNum, episode: newEpisodeNum }));
            setShowMoviePlayer(true); // Keep player open when navigating via URL
        }
    }, [location.search, series.series]); // Re-run when URL changes or series data loads

    useEffect(() => {
        if (showAllReviews && currentPage > 1) {
            const seriesContent = document.querySelector('#movie-content');
            if (seriesContent) {
                seriesContent.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    }, [currentPage, showAllReviews]);

    // Fetch all reviews when showAllReviews becomes true
    useEffect(() => {
        if (showAllReviews) {
            const fetchAllReviews = async () => {
                const firstPage = await reviewsService.getReviews(seriesId, 'series', 1);
                if (firstPage.total_pages <= 1) {
                    setReviews(firstPage);
                    return;
                }

                const allPromises = [];
                for (let page = 2; page <= firstPage.total_pages; page++) {
                    allPromises.push(reviewsService.getReviews(seriesId, 'series', page));
                }

                const otherPages = await Promise.all(allPromises);
                const allReviews = [firstPage, ...otherPages].flatMap(page => page.reviews);

                setReviews({
                    ...firstPage,
                    reviews: allReviews
                });
            };

            fetchAllReviews();
        }
    }, [showAllReviews, seriesId]);

    useEffect(() => {
        // Wait for all images to load before initializing carousel
        const images = document.querySelectorAll('.owl-carousel img');
        let loadedCount = 0;
        const totalImages = images.length;

        const initCarousel = () => {
            const existingScript = document.querySelector('script[src="/js/custom.js"]');
            if (existingScript) {
                document.body.removeChild(existingScript);
            }

            const script = document.createElement('script');
            script.src = '/js/custom.js';
            script.async = true;
            document.body.appendChild(script);
        };

        if (totalImages === 0) {
            // No images, initialize immediately
            initCarousel();
        } else {
            // Wait for all images to load
            images.forEach((img) => {
                if (img.complete) {
                    loadedCount++;
                } else {
                    img.addEventListener('load', () => {
                        loadedCount++;
                        if (loadedCount === totalImages) {
                            initCarousel();
                        }
                    });
                    img.addEventListener('error', () => {
                        loadedCount++;
                        if (loadedCount === totalImages) {
                            initCarousel();
                        }
                    });
                }
            });

            // If all images were already loaded
            if (loadedCount === totalImages) {
                initCarousel();
            }
        }

        return () => {
            const script = document.querySelector('script[src="/js/custom.js"]');
            if (script && document.body.contains(script)) {
                document.body.removeChild(script);
            }
        };
    }, [series.series, series.series?.seasons, episodes, selectedSeason]);

    // Reinitialize popup functionality when movie player closes
    useEffect(() => {
        if (!showMoviePlayer && series.series) {
            // Wait a bit for DOM to update, then reinitialize Magnific Popup
            const timer = setTimeout(() => {
                if (window.jQuery && window.jQuery.magnificPopup && window.jQuery('.popup-youtube').length > 0) {
                    // Destroy existing popup bindings and reinitialize
                    window.jQuery('.popup-youtube').off('click').magnificPopup({
                        type: 'iframe',
                        mainClass: 'mfp-fade',
                        removalDelay: 160,
                        preloader: false,
                        fixedContentPos: false
                    });
                }
            }, 100);
            return () => clearTimeout(timer);
        }
    }, [showMoviePlayer, series.series]);

    const handleScroll = (event) => {
        event.preventDefault();
        const episodesSection = document.getElementById('episodes');
        const seasonsSection = document.getElementById('seasons');

        if (episodesSection) {
            const offset = 500;
            const elementPosition = episodesSection.getBoundingClientRect().top + window.pageYOffset;
            const offsetPosition = elementPosition - offset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        } else if (seasonsSection) {
            const offset = 500;
            const elementPosition = seasonsSection.getBoundingClientRect().top + window.pageYOffset;
            const offsetPosition = elementPosition - offset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    };

    return (
        <>
            <MetaTags
                title={series.series ? `${series.series.name} | Moviefy` : 'Moviefy | Сериал'}
                description={series.series ? `${series.series.overview || ''} Разгледайте ${series.series.name} на Moviefy - вашият източник за сериали онлайн.` : 'Разгледайте сериали на Moviefy'}
                keywords={series.series ? `${series.series.name}, сериали, ${series.series.genres?.map(g => g.name).join(', ') || ''}, ${series.series.first_air_date ? new Date(series.series.first_air_date).getFullYear() : ''}, ревюта, рейтинг, гледане онлайн` : 'сериали, телевизия, онлайн'}
            />
            {series.series && (
                <section className="single-movie-details space-pb bg-holder bg-overlay-dark-99 overflow-hidden" style={{ backgroundImage: "url(/images/bg/03.jpg)" }}>
                    <div className="container position-relative">
                        <div className="row">
                            <div className="col-12 ">
                                <div className="movie-details-bg bg-overlay-dark-5" style={{ backgroundImage: showMoviePlayer ? 'none' : `url(https://image.tmdb.org/t/p/original${series.series.backdrop_path || ''})`, padding: showMoviePlayer ? 0 : undefined }}>
                                    {showMoviePlayer ? (
                                        <div style={{
                                            width: '100%',
                                            position: 'relative',
                                            background: 'transparent',
                                            margin: 0,
                                            padding: 0
                                        }}>
                                            <button
                                                className="btn btn-sm btn-light"
                                                style={{ position: 'absolute', top: 20, right: 20, zIndex: 10 }}
                                                onClick={() => {
                                                    setShowMoviePlayer(false);
                                                    setPlayingEpisode({ season: null, episode: null });
                                                }}
                                            >
                                                Back to Details
                                            </button>
                                            <iframe
                                                src={players[selectedPlayer]?.url}
                                                frameBorder="0"
                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                allowFullScreen
                                                title="Series Player"
                                                style={{
                                                    width: '100%',
                                                    height: '70vh',
                                                    background: 'transparent',
                                                    margin: 0,
                                                    padding: 0,
                                                    display: 'block'
                                                }}
                                            />
                                            <div className="d-flex justify-content-center mt-3 mb-3">
                                                <div className="player-selector" style={{
                                                    display: 'flex',
                                                    border: '1px solid #444',
                                                    borderRadius: '6px',
                                                    overflow: 'hidden',
                                                    backgroundColor: '#1a1a1a'
                                                }}>
                                                    {Object.entries(players).map(([playerId, player]) => (
                                                        <button
                                                            key={playerId}
                                                            type="button"
                                                            style={{
                                                                backgroundColor: selectedPlayer === playerId ? '#f6be00' : 'transparent',
                                                                color: selectedPlayer === playerId ? '#000' : '#fff',
                                                                border: 'none',
                                                                padding: '10px 20px',
                                                                cursor: 'pointer',
                                                                fontSize: '16px',
                                                                fontWeight: '500',
                                                                transition: 'none',
                                                                borderRadius: '0'
                                                            }}
                                                            onClick={() => handlePlayerChange(playerId)}
                                                            onMouseEnter={(e) => {
                                                                if (selectedPlayer !== playerId) {
                                                                    e.target.style.backgroundColor = '#333';
                                                                }
                                                            }}
                                                            onMouseLeave={(e) => {
                                                                if (selectedPlayer !== playerId) {
                                                                    e.target.style.backgroundColor = 'transparent';
                                                                }
                                                            }}
                                                        >
                                                            {player.name}
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="row position-relative">
                                            <div className="col-xxl-6 col-xl-7 col-lg-6 col-md-8 col-sm-12 order-md-1 order-2">
                                                <div className="movie-details">
                                                    <div className="movie-info">
                                                        <h2 className="title">{series.series.name}</h2>
                                                        <div className="movie-details-info movies-info">
                                                            <div className="features">
                                                                <span className="imdb">
                                                                    <a className="logo-align" href={`https://www.imdb.com/title/${series.series.imdb_id}`} target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>
                                                                        <img className="img-fluid" src="/images/imdb-logo.png" alt="#" />{series.series.vote_average}
                                                                    </a>
                                                                </span>
                                                                <span className="imdb">
                                                                    <a className="logo-align" href={`https://www.themoviedb.org/tv/${series.series.api_id}`} target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>
                                                                        <img className="img-fluid" src="/images/tmdb-logo.svg" alt="#" />{series.series.vote_average}
                                                                    </a>
                                                                </span>
                                                                <span
                                                                    className={`like ${favoriteSeriesIds.has(series.series.id) ? 'active' : ''}`}
                                                                    data-bs-toggle="tooltip"
                                                                    data-bs-placement="top"
                                                                    data-bs-title="Like"
                                                                    onClick={(e) => toggleFavorite(series.series.id, e)}
                                                                    style={{ cursor: 'pointer' }}
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="movies-language">Language:{" "} English{" "}</div>
                                                        <div className="movies-genre">
                                                            Genre:{" "}
                                                            {series.series.genres.map((genre, index) => (
                                                                <Link key={index} to={`/genre?genre=${getGenreParam(genre.name)}&media=series`}>
                                                                    {genre.name}
                                                                    {index < series.series.genres.length - 1 && ", "}
                                                                </Link>
                                                            ))}
                                                        </div>
                                                        <div className="d-sm-flex">
                                                            <div className="movies-genre">
                                                                Status: {series.series.status}
                                                            </div>
                                                            <div className="movies-genre ms-3">
                                                                Type: {series.series.type}
                                                            </div>
                                                        </div>
                                                        {series.series.production_companies.length > 0 && (
                                                            <div className="movies-genre">
                                                                Studio:{" "}
                                                                {series.series.production_companies.map((company, index) => (
                                                                    <span key={index}>
                                                                        <Link
                                                                            to={`/production-company-media?prodId=${company.id}&prodName=${encodeURIComponent(company.name)}&prodImage=${encodeURIComponent(company.logo_path || '')}&mediaType=all`}
                                                                            style={{ textDecoration: 'none' }}
                                                                        >
                                                                            {company.name}
                                                                        </Link>
                                                                        {index < series.series.production_companies.length - 1 && ", "}
                                                                    </span>
                                                                ))}
                                                            </div>
                                                        )}
                                                        <div className="d-sm-flex">
                                                            <span className="year">{new Date(series.series.first_air_date).toLocaleDateString('en-GB')}</span>
                                                            <a className="time" href="#">
                                                                SS {series.series.seasons[series.series.seasons.length - 1].season_number}
                                                                <span className="dot"></span>
                                                                EPS {series.series.seasons[series.series.seasons.length - 1].episode_count}
                                                            </a>
                                                            <span className="quality">
                                                                Quality: <a href="#">720P, 1080P</a>
                                                            </span>
                                                        </div>
                                                        <p className="mb-4">
                                                            {series.series.overview}
                                                        </p>
                                                        <a className="btn btn-primary popup-youtube" href={`https://www.youtube.com/watch?v=${series.series.trailer}`}><i className="fa-solid fa-play" />
                                                            Watch Trailer
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-xxl-6 col-xl-5 col-lg-6  col-md-4 col-sm-12 align-self-center order-md-2 order-1">
                                                <div className="video movie-video-btn mb-4 mb-md-0">
                                                    <button className="video-btn btn-animation" onClick={handleScroll}><i className="fa-solid fa-play" /></button>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                        {series.series.seasons && (
                            <div className="row mt-4 mt-lg-5" id="seasons">
                                <div className="col-md-12">
                                    <div className="section-title">
                                        <h2 className="title">Seasons</h2>
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <div
                                        className="owl-carousel owl-nav-center"
                                        data-nav-dots="false"
                                        data-nav-arrow="true"
                                        data-items={5}
                                        data-xl-items={5}
                                        data-lg-items={5}
                                        data-md-items={4}
                                        data-sm-items={3}
                                        data-xs-items={2}
                                        data-space={30}
                                        data-autoheight="true"
                                        data-autoplay="false"
                                        data-loop="false"
                                    >
                                        {series.series.seasons && series.series.seasons.map((season) => (
                                            <Link key={season.id} onClick={() => handleSeasonClick(season.id, season.season_number)}>
                                                <div className="item">
                                                    <div className="episode-item">
                                                        <a
                                                            href={series?.series?.trailer ? `https://www.youtube.com/watch?v=${series.series.trailer}` : '#'}
                                                            className={`tv-episode ${series?.series?.trailer ? 'popup-youtube' : ''}`}
                                                            onClick={(e) => {
                                                                // Prevent triggering season selection when playing trailer
                                                                e.stopPropagation();
                                                                // If no trailer, prevent default navigation to '#'
                                                                if (!series?.series?.trailer) {
                                                                    e.preventDefault();
                                                                }
                                                            }}
                                                        >
                                                            <img
                                                                className="img-fluid"
                                                                src={season.poster_path
                                                                    ? `https://image.tmdb.org/t/p/w500${season.poster_path}`
                                                                    : '/images/no-image-seasons.png'}
                                                                alt="#"
                                                                onError={(e) => { e.target.src = '/images/no-image-seasons.png'; }}
                                                            />
                                                            <div className="episode-info">
                                                                <span className="play-btn"><i className="fa-solid fa-play" /></span>
                                                                <h6 className="title">
                                                                    SS {season.season_number}
                                                                    <span className="dot"></span>
                                                                    EPS {season.episode_count}
                                                                </h6>
                                                                <h6 className="title">/ {new Date(season.air_date).getFullYear()}</h6>
                                                            </div>
                                                        </a>
                                                    </div>
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}
                        {episodes[selectedSeason] && selectedSeason && (
                            <div className="row mt-4 mt-lg-5" id="episodes">
                                <div className="col-md-12">
                                    <div className="section-title">
                                        <h2 className="title">Episodes</h2>
                                        <button href="" className="btn-link link-yellow" onClick={() => {
                                            setSelectedSeason(null);
                                            // Remove season and episode from URL
                                            const newSearchParams = new URLSearchParams(location.search);
                                            newSearchParams.delete('season');
                                            newSearchParams.delete('episode');
                                            const newUrl = `${location.pathname}?${newSearchParams.toString()}`;
                                            window.history.replaceState(null, '', newUrl);
                                        }}>
                                            Seasons
                                        </button>
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <div
                                        className="owl-carousel owl-nav-center"
                                        data-nav-dots="false"
                                        data-nav-arrow="true"
                                        data-items={3}
                                        data-xl-items={3}
                                        data-lg-items={3}
                                        data-md-items={3}
                                        data-sm-items={2}
                                        data-xs-items={1}
                                        data-space={30}
                                        data-autoheight="true"
                                        data-autoplay="false"
                                        data-loop="false"
                                    >
                                        {episodes[selectedSeason].map((episode) => {
                                            return (
                                                <div className="item" key={episode.episode_number}>
                                                    <div className="episode-item">
                                                        <a
                                                            href="#"
                                                            className="play-btn-episodes"
                                                            onClick={(e) => {
                                                                e.preventDefault();
                                                                setPlayingEpisode({ season: selectedSeason, episode: episode.episode_number });

                                                                // Update URL with episode parameter
                                                                const newSearchParams = new URLSearchParams(location.search);
                                                                newSearchParams.set('season', selectedSeason);
                                                                newSearchParams.set('episode', episode.episode_number);
                                                                const newUrl = `${location.pathname}?${newSearchParams.toString()}`;
                                                                window.history.replaceState(null, '', newUrl);

                                                                setShowMoviePlayer(true);
                                                            }}
                                                        >
                                                            <i className="fa-solid fa-play" />
                                                        </a>
                                                        <img
                                                            className="img-fluid"
                                                            src={episode.still_path
                                                                ? `https://image.tmdb.org/t/p/w500${episode.still_path}`
                                                                : '/images/no-image-episodes.png'}
                                                            alt="#"
                                                            onError={(e) => { e.target.src = '/images/no-image-episodes.png'; }}
                                                        />
                                                        <div className="episode-info">
                                                            <h6 className="title">
                                                                {episode.episode_number}. {episode.name}
                                                            </h6>
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                        )}
                        <div className="row mt-4 mt-lg-5">
                            <div className="col-md-12">
                                <div className="section-title">
                                    <h2 className="title">Cast &amp; Crew</h2>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-3-4 col-md-6 order-lg-1 mb-4 mb-md-0">
                                <h6 className="author-title">Director, Writers & Producers</h6>
                                {series.series.crew &&
                                    series.series.crew
                                        .filter((crew) =>
                                            crew.job === "Director" ||
                                            crew.job === "Creator" ||
                                            crew.job === "Writer" ||
                                            crew.job === "Screenplay" ||
                                            crew.job === "Producer"
                                        )
                                        .slice(0, 3)  // Limit to the first three entries
                                        .map((crew, index) => (
                                            <Link to={`/crew-media?crewId=${crew.id}&crewName=${encodeURIComponent(crew.name)}&crewImage=${encodeURIComponent(crew.profilePath || '')}`} className="movie-author" key={`crew-${crew.id}-${index}`}>
                                                <div className="author-img">
                                                    <img
                                                        className="crew img-fluid"
                                                        src={crew.profilePath
                                                            ? `https://image.tmdb.org/t/p/w138_and_h175_face${crew.profilePath}`
                                                            : '/images/no-image.jpg'}
                                                        alt={crew.name}
                                                        onError={(e) => { e.target.src = '/images/no-image.jpg'; }}
                                                    />
                                                </div>
                                                <div className="author-details">
                                                    <h6 className="author-name">{crew.name}</h6>
                                                    <span className="author-designation">{crew.job}</span>
                                                </div>
                                            </Link>
                                        ))}
                            </div>
                            <div className="col-lg-9 col-md-12 order-lg-2 mb-4 mb-lg-0">
                                <h6 className="author-title">Cast</h6>
                                <div className="row">
                                    {series.series.cast &&
                                        series.series.cast.slice(0, 9).map((actor) => (
                                            <div className="col-md-4" key={`cast-${actor.id}`}>
                                                <Link to={`/actor-media?actorId=${actor.id}&actorName=${encodeURIComponent(actor.name)}&actorImage=${encodeURIComponent(actor.profilePath || '')}`} className="movie-author">
                                                    <div className="author-img">
                                                        <img
                                                            className="actor img-fluid"
                                                            src={actor.profilePath
                                                                ? `https://media.themoviedb.org/t/p/w138_and_h175_face${actor.profilePath}`
                                                                : '/images/no-image.jpg'}
                                                            alt={actor.name}
                                                            onError={(e) => { e.target.src = '/images/no-image.jpg'; }}
                                                        />
                                                    </div>
                                                    <div className="author-details">
                                                        <h6 className="author-name">{actor.name}</h6>
                                                        <span className="author-designation">{actor.character}</span>
                                                    </div>
                                                </Link>
                                            </div>
                                        ))}
                                </div>
                            </div>
                        </div>
                        <div id="movie-content" className="row">
                            <div className="col-md-12">
                                <hr />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <div className="movie-details-tabs tabs">
                                    <ul
                                        className="nav nav-tabs nav-pills mb-3"
                                        id="pills-tab"
                                        role="tablist"
                                    >
                                        <li className="nav-item" role="presentation">
                                            <button
                                                className="nav-link active"
                                                id="pills-description-tab"
                                                data-bs-toggle="pill"
                                                data-bs-target="#pills-description"
                                                type="button"
                                                role="tab"
                                                aria-controls="pills-description"
                                                aria-selected="true"
                                            >
                                                Overview
                                            </button>
                                        </li>
                                        <li className="nav-item" role="presentation">
                                            <button
                                                className="nav-link"
                                                id="pills-information-tab"
                                                data-bs-toggle="pill"
                                                data-bs-target="#pills-information"
                                                type="button"
                                                role="tab"
                                                aria-controls="pills-information"
                                                aria-selected="false"
                                            >
                                                Production Companies
                                            </button>
                                        </li>
                                        <li className="nav-item" role="presentation">
                                            <button
                                                className="nav-link"
                                                id="pills-reviews-tab"
                                                data-bs-toggle="pill"
                                                data-bs-target="#pills-reviews"
                                                type="button"
                                                role="tab"
                                                aria-controls="pills-reviews"
                                                aria-selected="false"
                                            >
                                                Reviews ({reviews?.total_items || 0})
                                            </button>
                                        </li>
                                    </ul>
                                    <div className="tab-content" id="pills-tabContent">
                                        <div
                                            className="tab-pane fade show active"
                                            id="pills-description"
                                            role="tabpanel"
                                            aria-labelledby="pills-description-tab"
                                            tabIndex={0}
                                        >
                                            <p>{series.series.overview}</p>
                                        </div>
                                        <div
                                            className="tab-pane fade"
                                            id="pills-information"
                                            role="tabpanel"
                                            aria-labelledby="pills-information-tab"
                                            tabIndex={0}
                                        >
                                            {series.series.production_companies && series.series.production_companies.length > 0 ? (
                                                <div className="row">
                                                    {series.series.production_companies.map((company, index) => (
                                                        <div className="col-lg-3 col-md-4 col-sm-6 mb-4" key={`prod-${company.id}`}>
                                                            <Link
                                                                to={`/production-company-media?prodId=${company.id}&prodName=${encodeURIComponent(company.name)}&prodImage=${encodeURIComponent(company.logo_path || '')}&mediaType=all`}
                                                                className="movie-author"
                                                                style={{ textDecoration: 'none', color: 'inherit' }}
                                                            >
                                                                <div className="author-img" style={{
                                                                    display: "flex",
                                                                    alignItems: "center",
                                                                    justifyContent: "center",
                                                                    width: company.logo_path ? "auto" : "120px",
                                                                    height: "50px",
                                                                    borderRadius: "0"
                                                                }}>
                                                                    <img
                                                                        src={company.logo_path ? `https://image.tmdb.org/t/p/w300${company.logo_path}` : '/images/no-image-episodes.png'}
                                                                        alt={company.name}
                                                                        className="img-fluid"
                                                                        style={{
                                                                            width: company.logo_path ? "auto" : "120px",
                                                                            height: "50px",
                                                                            objectFit: 'contain',
                                                                            borderRadius: "0"
                                                                        }}
                                                                        onError={(e) => { e.target.src = '/images/no-image.jpg'; }}
                                                                    />
                                                                </div>
                                                                <div className="author-details">
                                                                    <h6 className="author-name" style={{ fontSize: '14px', textAlign: 'center', marginTop: '8px' }}>
                                                                        {company.name}
                                                                    </h6>
                                                                </div>
                                                            </Link>
                                                        </div>
                                                    ))}
                                                </div>
                                            ) : (
                                                <p>No production companies available.</p>
                                            )}
                                        </div>
                                        <div
                                            className="tab-pane fade"
                                            id="pills-reviews"
                                            role="tabpanel"
                                            aria-labelledby="pills-reviews-tab"
                                            tabIndex={0}
                                        >
                                            <div className="row">
                                                <div className="col-12">
                                                    {reviews?.reviews && reviews.reviews.length > 0 ? (
                                                        <>
                                                            {/* Display reviews - show 6 initially, or paginated reviews if showAllReviews */}
                                                            {(showAllReviews ? reviews.reviews.slice((currentPage - 1) * reviewsPerPage, currentPage * reviewsPerPage) : reviews.reviews.slice(0, 6)).map((review, index) => {
                                                                // Create a stable key for tracking expanded reviews
                                                                const reviewKey = review.id || `${review.author}- ${review.created_at}-${index}`;
                                                                const globalIndex = showAllReviews ? ((currentPage - 1) * reviewsPerPage) + index : index;
                                                                return (
                                                                    <div key={`review-${globalIndex}-${review.author}-${Date.parse(review.created_at)}`} className="commentlist">
                                                                        <div className="comment-author">
                                                                            <img
                                                                                className="img-fluid"
                                                                                src={review.author_path ? `https://image.tmdb.org/t/p/w45${review.author_path}` : '/images/no-image.jpg'}
                                                                                alt={review.author}
                                                                                onError={(e) => { e.target.src = '/images/no-image.jpg'; }}
                                                                                style={{ minWidth: '70px', minHeight: '70px', width: '70px', height: '70px', objectFit: 'cover' }}
                                                                            />
                                                                        </div>
                                                                        <div className="comment-content">
                                                                            <div className="reviews">
                                                                                <p className="meta">
                                                                                    <strong>{review.author}</strong> {new Date(review.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                                                                                </p>
                                                                                <div className="rating" style={{ color: '#FFD700' }}>
                                                                                    {renderStars(review.rating)}
                                                                                </div>
                                                                            </div>
                                                                            <p>
                                                                                {expandedReviews.has(reviewKey) ? review.content : truncateReview(review.content)}
                                                                                {review.content.length > 350 && (
                                                                                    <button
                                                                                        type="button"
                                                                                        className="btn btn-link p-0 ms-2 text-primary"
                                                                                        style={{ textDecoration: 'none', fontSize: '0.9em' }}
                                                                                        onClick={() => {
                                                                                            const newExpanded = new Set(expandedReviews);
                                                                                            if (newExpanded.has(reviewKey)) {
                                                                                                newExpanded.delete(reviewKey);
                                                                                            } else {
                                                                                                newExpanded.add(reviewKey);
                                                                                            }
                                                                                            setExpandedReviews(newExpanded);
                                                                                        }}
                                                                                    >
                                                                                        {expandedReviews.has(reviewKey) ? 'Read Less' : 'Read More'}
                                                                                    </button>
                                                                                )}
                                                                            </p>
                                                                        </div>
                                                                    </div>
                                                                );
                                                            })}

                                                            {/* View More Button */}
                                                            {!showAllReviews && reviews.reviews.length > 6 && (
                                                                <div className="text-center mt-4">
                                                                    <button
                                                                        type="button"
                                                                        className="btn btn-primary"
                                                                        onClick={() => setShowAllReviews(true)}
                                                                    >
                                                                        View More Reviews
                                                                    </button>
                                                                </div>
                                                            )}

                                                            {/* Pagination - only show when showAllReviews is true and there are more than 20 reviews total */}
                                                            {showAllReviews && reviews.total_items > 20 && (
                                                                <div className="row mt-4">
                                                                    <div className="col-12">
                                                                        <nav aria-label="Reviews pagination">
                                                                            <ul className="pagination justify-content-center">
                                                                                <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                                                                                    <button
                                                                                        type="button"
                                                                                        className="page-link"
                                                                                        onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                                                                                        disabled={currentPage === 1}
                                                                                    >
                                                                                        Previous
                                                                                    </button>
                                                                                </li>
                                                                                {Array.from({ length: Math.ceil(reviews.total_items / reviewsPerPage) }, (_, i) => i + 1).map(page => (
                                                                                    <li key={page} className={`page-item ${currentPage === page ? 'active' : ''}`}>
                                                                                        <button
                                                                                            type="button"
                                                                                            className="page-link"
                                                                                            onClick={() => setCurrentPage(page)}
                                                                                        >
                                                                                            {page}
                                                                                        </button>
                                                                                    </li>
                                                                                ))}
                                                                                <li className={`page-item ${currentPage === Math.ceil(reviews.total_items / reviewsPerPage) ? 'disabled' : ''}`}>
                                                                                    <button
                                                                                        type="button"
                                                                                        className="page-link"
                                                                                        onClick={() => setCurrentPage(prev => Math.min(Math.ceil(reviews.total_items / reviewsPerPage), prev + 1))}
                                                                                        disabled={currentPage === Math.ceil(reviews.total_items / reviewsPerPage)}
                                                                                    >
                                                                                        Next
                                                                                    </button>
                                                                                </li>
                                                                            </ul>
                                                                        </nav>
                                                                    </div>
                                                                </div>
                                                            )}
                                                        </>
                                                    ) : (
                                                        <p>No reviews available yet.</p>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            )}
        </>
    );
}
