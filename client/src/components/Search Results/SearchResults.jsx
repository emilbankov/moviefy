import { useState, useEffect } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import { search } from '../../services/moviesService';
import { useLoading } from '../../contexts/LoadingContext';

export default function SearchResults() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [apiData, setApiData] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const query = searchParams.get('q');
    const media = searchParams.get('media') || 'all';
    const { setLoading } = useLoading();

    useEffect(() => {
        const fetchSearchResults = async () => {
            if (query) {
                setLoading(true);
                try {
                    // Use media in the URL path, same as GenreResults
                    const data = await search(media, query, currentPage, 30);
                    console.log('Search results:', data);
                    setApiData(data);
                } catch (error) {
                    console.error('Search fetch error:', error);
                    setApiData(null);
                } finally {
                    setLoading(false);
                }
            }
        };

        fetchSearchResults();
    }, [query, media, currentPage, setLoading]);

    // Reset to first page when query or media changes
    useEffect(() => {
        setCurrentPage(1);
    }, [query, media]);

    // Get results and pagination info from API response
    const results = apiData ? (apiData.results || apiData.movies || apiData.series || []) : [];
    
    const totalPages = apiData?.total_pages || 1;
    const itemsPerPage = apiData?.items_on_page || 30;

    // Handle tab change
    const handleTabChange = (newMedia) => {
        navigate(`/search?q=${query}&media=${newMedia}`);
    };

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // Get 3 page numbers centered around current page
    const getPageNumbers = () => {
        const pageNumbers = [];
        
        if (totalPages <= 3) {
            // If 3 or fewer pages, show them all
            for (let i = 1; i <= totalPages; i++) {
                pageNumbers.push(i);
            }
        } else {
            // Show 3 pages centered around current page
            let start = Math.max(1, currentPage - 1);
            let end = Math.min(totalPages, start + 2);
            
            // Adjust if we're near the end
            if (end - start < 2) {
                start = Math.max(1, end - 2);
            }
            
            for (let i = start; i <= end; i++) {
                pageNumbers.push(i);
            }
        }
        
        return pageNumbers;
    };

    return (
        <>
            <section className="space-ptb">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="categories-tabs">
                                <div className="section-title">
                                    <h2 className="title">Search Results for "{query}"</h2>
                                </div>
                                <div className="tabs">
                                    <ul
                                        className="nav nav-tabs nav-pills"
                                        id="pills-tab"
                                        role="tablist"
                                    >
                                        <li className="nav-item" role="presentation">
                                            <button
                                                className={`nav-link ${media === 'all' ? 'active' : ''}`}
                                                id="all-content"
                                                data-bs-toggle="pill"
                                                data-bs-target="#pills-all"
                                                type="button"
                                                role="tab"
                                                aria-controls="pills-all"
                                                aria-selected={media === 'all'}
                                                onClick={() => handleTabChange('all')}
                                            >
                                                All
                                            </button>
                                        </li>
                                        <li className="nav-item" role="presentation">
                                            <button
                                                className={`nav-link ${media === 'movies' ? 'active' : ''}`}
                                                id="movies-only"
                                                data-bs-toggle="pill"
                                                data-bs-target="#pills-movies"
                                                type="button"
                                                role="tab"
                                                aria-controls="pills-movies"
                                                aria-selected={media === 'movies'}
                                                onClick={() => handleTabChange('movies')}
                                            >
                                                Movies
                                            </button>
                                        </li>
                                        <li className="nav-item" role="presentation">
                                            <button
                                                className={`nav-link ${media === 'series' ? 'active' : ''}`}
                                                id="series-only"
                                                data-bs-toggle="pill"
                                                data-bs-target="#pills-series"
                                                type="button"
                                                role="tab"
                                                aria-controls="pills-series"
                                                aria-selected={media === 'series'}
                                                onClick={() => handleTabChange('series')}
                                            >
                                                Series
                                            </button>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        {results && results.length > 0 ? (
                            results.map((item) => (
                                <div key={item.id || item._id} className="col-xl-2 col-lg-3 col-md-4 col-sm-6 mb-4">
                                    <Link 
                                        to={(item.type === 'series' || item.media_type === 'tv' || media === 'series') ? `/series/details/${item.id}` : `/movie/details/${item.id}`}
                                        style={{ textDecoration: 'none', color: 'inherit' }}
                                    >
                                        <div className="movies-categories-style-3">
                                            <div className="movie-image">
                                                <img
                                                    className="img-fluid"
                                                    src={item.poster_path ? `https://image.tmdb.org/t/p/w500${item.poster_path}` : 'images/movie/movie-01.jpg'}
                                                    alt={item.title || item.name}
                                                />
                                            </div>
                                            <div className="movie-info-content">
                                                <h6>
                                                    <span className="title">
                                                        {item.title || item.name}
                                                    </span>
                                                </h6>
                                                <div className="movie-info smaller-text">
                                                    <span className="year">
                                                        {item.release_date ? new Date(item.release_date).getFullYear() : 
                                                         item.first_air_date ? new Date(item.first_air_date).getFullYear() : 
                                                         item.year || 'N/A'}
                                                    </span>
                                                    {(item.type === 'series' || item.media_type === 'tv' || item.name || item.seasons || item.number_of_seasons) && !item.runtime ? (
                                                        <a className="time" href="#">
                                                            SS {item.seasons || item.number_of_seasons || 'N/A'} <span className="dot"></span> EPS {item.episodes || item.number_of_episodes || 'N/A'}
                                                        </a>
                                                    ) : (
                                                        <a className="time" href="#">
                                                            <i className="far fa-clock me-2" />
                                                            {item.runtime ? `${Math.floor(item.runtime / 60)}hr : ${item.runtime % 60}min` : 'N/A'}
                                                        </a>
                                                    )}
                                                    <div className="info-tag">
                                                        <a className="views" href="#">
                                                            <i className="far fa-eye" />
                                                        </a>
                                                        <a href="javascript:void(0)" className="like" />
                                                        <a className="rating" href="#">
                                                            <i className="fa-solid fa-star" /> {item.vote_average ? item.vote_average.toFixed(1) : 'N/A'}/10
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            ))
                        ) : (
                            <div className="col-12 text-center">
                                <p className="text-white">No results found for "{query}"</p>
                            </div>
                        )}
                    </div>

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="row mt-5">
                            <div className="col-12">
                                <nav aria-label="Page navigation">
                                    <ul className="pagination justify-content-center flex-wrap" style={{ gap: '8px' }}>
                                        {/* First Page Button */}
                                        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                                            <button
                                                className="page-link"
                                                onClick={() => currentPage > 1 && paginate(1)}
                                                disabled={currentPage === 1}
                                                style={{
                                                    backgroundColor: currentPage === 1 ? '#333' : '#0a0a0a',
                                                    border: '1px solid #f6be00',
                                                    color: currentPage === 1 ? '#666' : '#f6be00',
                                                    padding: '10px 16px',
                                                    borderRadius: '5px',
                                                    cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
                                                    transition: 'all 0.3s ease',
                                                    fontSize: '14px',
                                                    fontWeight: '500'
                                                }}
                                                onMouseEnter={(e) => {
                                                    if (currentPage !== 1) {
                                                        e.target.style.backgroundColor = '#f6be00';
                                                        e.target.style.color = '#0a0a0a';
                                                    }
                                                }}
                                                onMouseLeave={(e) => {
                                                    if (currentPage !== 1) {
                                                        e.target.style.backgroundColor = '#0a0a0a';
                                                        e.target.style.color = '#f6be00';
                                                    }
                                                }}
                                            >
                                                <i className="fas fa-angles-left me-1"></i>
                                            </button>
                                        </li>

                                        {/* Previous Button */}
                                        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                                            <button
                                                className="page-link"
                                                onClick={() => currentPage > 1 && paginate(currentPage - 1)}
                                                disabled={currentPage === 1}
                                                style={{
                                                    backgroundColor: currentPage === 1 ? '#333' : '#0a0a0a',
                                                    border: '1px solid #f6be00',
                                                    color: currentPage === 1 ? '#666' : '#f6be00',
                                                    padding: '10px 16px',
                                                    borderRadius: '5px',
                                                    cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
                                                    transition: 'all 0.3s ease',
                                                    fontSize: '14px',
                                                    fontWeight: '500'
                                                }}
                                                onMouseEnter={(e) => {
                                                    if (currentPage !== 1) {
                                                        e.target.style.backgroundColor = '#f6be00';
                                                        e.target.style.color = '#0a0a0a';
                                                    }
                                                }}
                                                onMouseLeave={(e) => {
                                                    if (currentPage !== 1) {
                                                        e.target.style.backgroundColor = '#0a0a0a';
                                                        e.target.style.color = '#f6be00';
                                                    }
                                                }}
                                            >
                                                <i className="fas fa-chevron-left me-1"></i>
                                            </button>
                                        </li>

                                        {/* Page Numbers (3 at a time) */}
                                        {getPageNumbers().map((number) => (
                                            <li key={number} className={`page-item ${currentPage === number ? 'active' : ''}`}>
                                                <button
                                                    className="page-link"
                                                    onClick={() => paginate(number)}
                                                    style={{
                                                        backgroundColor: currentPage === number ? '#f6be00' : '#0a0a0a',
                                                        border: '1px solid #f6be00',
                                                        color: currentPage === number ? '#0a0a0a' : '#f6be00',
                                                        padding: '10px 16px',
                                                        borderRadius: '5px',
                                                        cursor: 'pointer',
                                                        transition: 'all 0.3s ease',
                                                        minWidth: '45px',
                                                        fontSize: '14px',
                                                        fontWeight: currentPage === number ? '600' : '500'
                                                    }}
                                                    onMouseEnter={(e) => {
                                                        if (currentPage !== number) {
                                                            e.target.style.backgroundColor = '#f6be00';
                                                            e.target.style.color = '#0a0a0a';
                                                        }
                                                    }}
                                                    onMouseLeave={(e) => {
                                                        if (currentPage !== number) {
                                                            e.target.style.backgroundColor = '#0a0a0a';
                                                            e.target.style.color = '#f6be00';
                                                        }
                                                    }}
                                                >
                                                    {number}
                                                </button>
                                            </li>
                                        ))}

                                        {/* Next Button */}
                                        <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                                            <button
                                                className="page-link"
                                                onClick={() => currentPage < totalPages && paginate(currentPage + 1)}
                                                disabled={currentPage === totalPages}
                                                style={{
                                                    backgroundColor: currentPage === totalPages ? '#333' : '#0a0a0a',
                                                    border: '1px solid #f6be00',
                                                    color: currentPage === totalPages ? '#666' : '#f6be00',
                                                    padding: '10px 16px',
                                                    borderRadius: '5px',
                                                    cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
                                                    transition: 'all 0.3s ease',
                                                    fontSize: '14px',
                                                    fontWeight: '500'
                                                }}
                                                onMouseEnter={(e) => {
                                                    if (currentPage !== totalPages) {
                                                        e.target.style.backgroundColor = '#f6be00';
                                                        e.target.style.color = '#0a0a0a';
                                                    }
                                                }}
                                                onMouseLeave={(e) => {
                                                    if (currentPage !== totalPages) {
                                                        e.target.style.backgroundColor = '#0a0a0a';
                                                        e.target.style.color = '#f6be00';
                                                    }
                                                }}
                                            >
                                                <i className="fas fa-chevron-right ms-1"></i>
                                            </button>
                                        </li>

                                        {/* Last Page Button */}
                                        <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                                            <button
                                                className="page-link"
                                                onClick={() => currentPage < totalPages && paginate(totalPages)}
                                                disabled={currentPage === totalPages}
                                                style={{
                                                    backgroundColor: currentPage === totalPages ? '#333' : '#0a0a0a',
                                                    border: '1px solid #f6be00',
                                                    color: currentPage === totalPages ? '#666' : '#f6be00',
                                                    padding: '10px 16px',
                                                    borderRadius: '5px',
                                                    cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
                                                    transition: 'all 0.3s ease',
                                                    fontSize: '14px',
                                                    fontWeight: '500'
                                                }}
                                                onMouseEnter={(e) => {
                                                    if (currentPage !== totalPages) {
                                                        e.target.style.backgroundColor = '#f6be00';
                                                        e.target.style.color = '#0a0a0a';
                                                    }
                                                }}
                                                onMouseLeave={(e) => {
                                                    if (currentPage !== totalPages) {
                                                        e.target.style.backgroundColor = '#0a0a0a';
                                                        e.target.style.color = '#f6be00';
                                                    }
                                                }}
                                            >
                                                <i className="fas fa-angles-right ms-1"></i>
                                            </button>
                                        </li>
                                    </ul>
                                </nav>
                                
                                {/* Page Info */}
                                <div className="text-center mt-3">
                                    <p className="text-white-50" style={{ fontSize: '14px' }}>
                                        Page {currentPage} of {totalPages} ({itemsPerPage} items per page)
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </section>
        </>
    );
}

