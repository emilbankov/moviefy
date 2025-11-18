import { useState, useEffect, useRef } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import { search, getGenres, getPopularMovies, getTrendingMovies, getLatestMovies, getPopularCollections } from '../../services/moviesService';
import { getPopularSeries, getTrendingSeries, getLatestSeries } from '../../services/seriesService';
import { useLoading } from '../../contexts/LoadingContext';

export default function Results() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const { setLoading } = useLoading();

  const [apiData, setApiData] = useState(null);
  
  // Read page from URL params, default to 1
  const urlPage = searchParams.get('page');
  const [currentPage, setCurrentPage] = useState(urlPage ? parseInt(urlPage, 10) : 1);
  
  const [pageInput, setPageInput] = useState('');
  const sectionRef = useRef(null);
  const didMountRef = useRef(false);

  const query = searchParams.get('q');
  const genre = searchParams.get('genre');
  const media = searchParams.get('media') || 'all';
  const category = searchParams.get('category'); // catalog category: popular | trending | latest
  
  const mode = query ? 'search' : genre ? 'genre' : category ? 'catalog' : null;

  const [selectedGenres, setSelectedGenres] = useState([]);
  const [genreChanged, setGenreChanged] = useState(false);
  const [forceRefetch, setForceRefetch] = useState(0); // New state for forcing refetch

  const hardcodedGenres = [
    { id: 28, name: 'Action' },
    { id: 12, name: 'Adventure' },
    { id: 16, name: 'Animation' },
    { id: 35, name: 'Comedy' },
    { id: 80, name: 'Crime' },
    { id: 99, name: 'Documentary' },
    { id: 18, name: 'Drama' },
    { id: 10751, name: 'Family' },
    { id: 14, name: 'Fantasy' },
    { id: 36, name: 'History' },
    { id: 27, name: 'Horror' },
    { id: 10402, name: 'Music' },
    { id: 9648, name: 'Mystery' },
    { id: 10749, name: 'Romance' },
    { id: 878, name: 'Sci-Fi' },
    { id: 10770, name: 'TV Movie' },
    { id: 53, name: 'Thriller' },
    { id: 10752, name: 'War' },
    { id: 37, name: 'Western' }
  ];

  const handleGenreToggle = (genreId) => {
    setSelectedGenres(prev => 
      prev.includes(genreId)
        ? prev.filter(id => id !== genreId)
        : [...prev, genreId]
    );
    // Removed the forceRefetch trigger from here
  };

  const handleSearch = () => {
    setForceRefetch(prev => prev + 1);
  };

  const handleResetFilters = () => {
    setSelectedGenres([]);
    setForceRefetch(prev => prev + 1);
  };

  useEffect(() => {
    const fetchResults = async () => {
      if (!mode) return;
      setLoading(true);
      try {
        let data;
        if (mode === 'search') {
          // Note: current moviesService.search may ignore page/size; backend can be updated later.
          data = await search(media, query, currentPage, 30);
          console.log('Search results:', data);
        } else if (mode === 'genre') {
          data = await getGenres(media, genre, 30, currentPage);
          console.log('Genre results:', data);
        } else if (mode === 'catalog') {
          // Catalog mode: fetch by media/category with pagination
          if (media === 'movies' || media === 'all') {
            const size = 30;
            switch (category.toLowerCase()) {
              case 'trending':
                data = await getTrendingMovies(currentPage, size);
                break;
              case 'latest':
                // Pass selected genres as array of names
                const genreNames = selectedGenres.length > 0 
                  ? selectedGenres.map(id => hardcodedGenres.find(g => g.id === id)?.name).filter(Boolean)
                  : [];
                data = await getLatestMovies(currentPage, size, genreNames);
                break;
              case 'popular':
              default:
                data = await getPopularMovies(currentPage, size);
                break;
            }
            console.log('Catalog movies:', media, category, data);
          } else if (media === 'collections') {
            const size = 20; // collections: 20 per page
            data = await getPopularCollections(currentPage, size);
            console.log('Catalog collections:', category, data);
          } else if (media === 'series') {
            // Series endpoints now support pagination; request 30 per page
            const size = 30;
            switch (category.toLowerCase()) {
              case 'trending':
              case 'latest':
                data = await getLatestSeries(currentPage, size);
                break;
              case 'popular':
              default:
                data = await getPopularSeries(currentPage, size);
                break;
            }
            console.log('Catalog series:', category, data);
          }
        }
        setApiData(data);
      } catch (error) {
        console.error('Results fetch error:', error);
        setApiData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [mode, query, genre, media, category, currentPage, setLoading, forceRefetch]); // Changed genreChanged to forceRefetch

  // Update URL when page changes (remove replace: true to add history entries)
  useEffect(() => {
    const newSearchParams = new URLSearchParams(searchParams);
    
    if (currentPage > 1) {
      newSearchParams.set('page', currentPage.toString());
    } else {
      newSearchParams.delete('page');
    }
    
    // Only update URL if it's different to avoid infinite loops
    const currentSearch = searchParams.toString();
    const newSearch = newSearchParams.toString();
    
    if (currentSearch !== newSearch) {
      // Remove { replace: true } to add new history entries instead of replacing
      setSearchParams(newSearchParams);
    }
  }, [currentPage, searchParams, setSearchParams]);

  // Listen for browser back/forward navigation
  useEffect(() => {
    const handlePopState = () => {
      const newUrlPage = new URLSearchParams(window.location.search).get('page');
      const newPage = newUrlPage ? parseInt(newUrlPage, 10) : 1;
      if (newPage !== currentPage) {
        setCurrentPage(newPage);
      }
    };

    window.addEventListener('popstate', handlePopState);
    
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [currentPage]);

  // Reset to first page when primary criteria changes (but don't reset URL here)
  useEffect(() => {
    setCurrentPage(1);
  }, [mode, query, genre, media, category]);

  // Separate effect to reset page when genres change
  useEffect(() => {
    if (selectedGenres.length > 0) {
      setCurrentPage(1);
    }
  }, [selectedGenres]);

  const selectResults = () => {
    if (!apiData) return [];
    if (mode === 'search') {
      return apiData.results || apiData.movies || apiData.series || [];
    }
    if (mode === 'genre') {
      return apiData[media] || apiData.results || [];
    }
    // catalog
    if (media === 'movies' || media === 'all') return apiData.movies || [];
    if (media === 'series') return apiData.series || [];
    if (media === 'collections') return apiData.popular || apiData.collections || [];
    return apiData.results || [];
  };

  const results = selectResults();
  const totalPages = apiData?.total_pages || 1;
  const itemsPerPage = apiData?.items_on_page || (Array.isArray(results) ? results.length : 30);

  const handleTabChange = (newMedia) => {
    if (mode === 'search') {
      navigate(`/search?q=${query}&media=${newMedia}`);
    } else if (mode === 'genre') {
      navigate(`/genre?genre=${genre}&media=${newMedia}`);
    } else if (mode === 'catalog') {
      navigate(`/catalog?media=${newMedia}&category=${category}`);
    }
  };

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const goToPage = () => {
    const parsed = parseInt(pageInput, 10);
    if (!isNaN(parsed)) {
      const target = Math.max(1, Math.min(totalPages || 1, parsed));
      setCurrentPage(target);
      setPageInput('');
    }
  };

  useEffect(() => {
    if (didMountRef.current && sectionRef.current) {
      sectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    didMountRef.current = true;
  }, [currentPage]);

  const getPageNumbers = () => {
    const pageNumbers = [];
    if (totalPages <= 3) {
      for (let i = 1; i <= totalPages; i++) pageNumbers.push(i);
    } else {
      let start = Math.max(1, currentPage - 1);
      let end = Math.min(totalPages, start + 2);
      if (end - start < 2) start = Math.max(1, end - 2);
      for (let i = start; i <= end; i++) pageNumbers.push(i);
    }
    return pageNumbers;
  };

  const isSeriesItem = (item) => {
    if (item?.type === 'series') return true;
    if (item?.media_type === 'tv') return true;
    if (media === 'series') return true;
    return false;
  };

  const isCollectionItem = () => mode === 'catalog' && media === 'collections';

  const title = (() => {
    if (mode === 'search') return `Search Results for "${query}"`;
    if (mode === 'genre') return genre || 'Results';
    if (mode === 'catalog') {
      const catLabel = (category || 'popular').replace(/\b\w/g, c => c.toUpperCase());
      const mediaLabel = media.replace(/\b\w/g, c => c.toUpperCase());
      return `${catLabel} ${mediaLabel}`;
    }
    return 'Results';
  })();

  if (!mode) {
    return (
      <section className="space-ptb">
        <div className="container">
          <div className="row">
            <div className="col-12 text-center">
              <p className="text-white">No query or genre provided.</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      <section>
        <div className="container">
          <div className="row genres-container">
            {mode === 'catalog' && media === 'movies' && category === 'latest' && (
              <div className="row">
                <div className="col-12">
                  <div className="genre-filters-container">
                    <h6>Filter by Genres:</h6>
                    <div className="genre-buttons">
                      {hardcodedGenres.map(genre => (
                        <label
                          key={genre.id}
                          className={`genre-checkbox ${selectedGenres.includes(genre.id) ? 'selected' : ''}`}
                        >
                          <input
                            type="checkbox"
                            checked={selectedGenres.includes(genre.id)}
                            onChange={() => handleGenreToggle(genre.id)}
                          />
                          <span>{genre.name}</span>
                        </label>
                      ))}
                    </div>
                    <div className="genre-actions" style={{
                      display: 'flex',
                      justifyContent: 'center',
                      gap: '15px',
                      marginTop: '20px',
                      flexWrap: 'wrap'
                    }}>
                      <button 
                        className="genre-search-btn"
                        onClick={handleSearch}
                      >
                        Filter
                      </button>
                      {selectedGenres.length > 0 && (
                        <button 
                          className="genre-reset-btn"
                          onClick={handleResetFilters}
                        >
                          Reset Filters
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
      <section ref={sectionRef}>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="categories-tabs">
                <div className="section-title d-flex align-items-center justify-content-between flex-wrap" style={{ gap: '12px' }}>
                  <h2 className="title mb-0">{title}</h2>
                  {totalPages > 1 && (mode === 'catalog' && media === 'movies' && category === 'latest') && (
                    <nav aria-label="Page navigation" className="ms-auto top-pagination">
                      <ul className="pagination justify-content-end flex-wrap mb-0" style={{ gap: '8px' }}>
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
                  )}
                </div>
                {(mode === 'search' || mode === 'genre' || (mode === 'catalog' && media === 'all')) && (
                  <div className="tabs">
                    <ul className="nav nav-tabs nav-pills" id="pills-tab" role="tablist">
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
                )}
              </div>
            </div>
          </div>

          <div className="row">
            {results && results.length > 0 ? (
              results.map((item) => (
                <div
                  key={item.api_id}
                  className={isCollectionItem()
                    ? 'col-xl-2-3 col-lg-4 col-md-6 col-sm-6 col-6 mb-4'
                    : 'col-xl-2 col-lg-4 col-md-6 col-sm-6 col-6 mb-4'}
                >
                  <Link
                    to={isCollectionItem() ? `/collection/${item.api_id}` : (isSeriesItem(item) ? `/series/details/${item.api_id}` : `/movie/details/${item.api_id}`)}
                    style={{ textDecoration: 'none', color: 'inherit' }}
                  >
                    {isCollectionItem() ? (
                      <div className="movies-categories-style-2">
                        <div className="movie-image">
                          <img
                            className="img-fluid br-20"
                            src={item.poster_path ? `https://image.tmdb.org/t/p/w500${item.poster_path}` : 'images/movie/movie-01.jpg'}
                            alt={item.name || item.title}
                          />
                          <div className="info-top">
                            <a href="javascript:void(0)" className="like" onClick={(e) => e.preventDefault()} />
                            <a className="views" href="#" onClick={(e) => e.preventDefault()}>
                              <i className="fa-solid fa-star" /> {item.vote_average ? (typeof item.vote_average === 'number' ? item.vote_average.toFixed(1) : item.vote_average) : 'N/A'}
                            </a>
                          </div>
                          <div className="movie-info-content">
                            <a className="time" href="#" onClick={(e) => e.preventDefault()}>
                              <i className="far fa-clock me-2" />
                              {item.runtime ? `${Math.floor(item.runtime / 60)}hr : ${item.runtime % 60}min` : 'N/A'}
                            </a>
                            <h5>
                              <span className="title">{item.name || item.title}</span>
                            </h5>
                            <p>
                              {item.overview || ''}
                            </p>
                            <span
                              className="btn btn-link btn-link-1"
                              style={{ color: 'white', textDecoration: "none" }}
                              onMouseEnter={(e) => { e.currentTarget.style.color = '#ffc107'; }}
                              onMouseLeave={(e) => { e.currentTarget.style.color = 'white'; }}
                              onClick={(e) => e.stopPropagation()}
                            >
                              <i className="fa-solid fa-play" />Play Now
                            </span>
                          </div>
                        </div>
                      </div>
                    ) : (
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
                            <span className="title">{item.title || item.name}</span>
                          </h6>
                          <div className="movie-info smaller-text">
                            <span className="year">
                              {item.release_date ? new Date(item.release_date).getFullYear() :
                                item.first_air_date ? new Date(item.first_air_date).getFullYear() :
                                  item.year || 'N/A'}
                            </span>
                            <a className="time" href="#" onClick={(e) => e.preventDefault()}>
                              {isSeriesItem(item) ? (
                                <>
                                  <i className="far fa-clock me-2" />
                                  SS {item?.seasons ?? 'N/A'} <span className="dot"></span> EPS {item?.episodes ?? 'N/A'}
                                </>
                              ) : (
                                <>
                                  <i className="far fa-clock me-2" />
                                  {typeof item.runtime === 'number' && !isNaN(item.runtime)
                                    ? `${Math.floor(item.runtime / 60)}hr : ${item.runtime % 60}min`
                                    : 'N/A'}
                                </>
                              )}
                            </a>
                            <div className="info-tag">
                              <a className="views" href="#" onClick={(e) => e.preventDefault()}>
                                <i className="far fa-eye" />
                              </a>
                              <a href="#" className="like" onClick={(e) => e.preventDefault()} />
                              <a className="rating" href="#" onClick={(e) => e.preventDefault()}>
                                <i className="fa-solid fa-star" /> {item.vote_average ? (typeof item.vote_average === 'number' ? item.vote_average.toFixed(1) : item.vote_average) : 'N/A'}/10
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </Link>
                </div>
              ))
            ) : (
              <div className="col-12 text-center">
                <p className="text-white">
                  {mode === 'search' ? `No results found for "${query}"` : `No results found for ${genre}`}
                </p>
              </div>
            )}
          </div>

          {totalPages > 1 && (
            <div className="row mt-5">
              <div className="col-12">
                <nav aria-label="Page navigation">
                  <ul className="pagination justify-content-center flex-wrap" style={{ gap: '8px' }}>
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
                {/* Centered page jump under pagination */}
                <div className="page-jump d-flex justify-content-center align-items-center mt-3" style={{ gap: '8px' }}>
                  <input
                    className="page-jump-input"
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    min={1}
                    max={totalPages}
                    value={pageInput}
                    onChange={(e) => {
                      const digitsOnly = e.target.value.replace(/[^0-9]/g, '');
                      setPageInput(digitsOnly);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        goToPage();
                      }
                    }}
                    placeholder={`Page 1-${totalPages}`}
                    style={{
                      width: '113px',
                      padding: '10px',
                      borderRadius: '5px',
                      border: '1px solid #f6be00',
                      backgroundColor: '#0a0a0a',
                      color: '#f6be00',
                      outline: 'none',
                      fontSize: '14px',
                      textAlign: 'center'
                    }}
                    aria-label="Page number"
                  />
                  <button
                    className="page-link"
                    onClick={goToPage}
                    style={{
                      backgroundColor: '#f6be00',
                      border: '1px solid #f6be00',
                      color: '#0a0a0a',
                      padding: '10px 16px',
                      borderRadius: '5px',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      fontSize: '14px',
                      fontWeight: '500',
                      minWidth: '45px'
                    }}
                    aria-label="Go to page"
                  >
                    <i className="fas fa-search"></i>
                  </button>
                </div>
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