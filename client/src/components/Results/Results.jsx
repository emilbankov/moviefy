import { useState, useEffect } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import { search, getGenres, getPopularMovies, getTrendingMovies, getLatestMovies, getPopularCollections } from '../../services/moviesService';
import { getPopularSeries, getTrendingSeries, getLatestSeries } from '../../services/seriesService';
import { useLoading } from '../../contexts/LoadingContext';

export default function Results() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { setLoading } = useLoading();

  const [apiData, setApiData] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const query = searchParams.get('q');
  const genre = searchParams.get('genre');
  const media = searchParams.get('media') || 'all';
  const category = searchParams.get('category'); // catalog category: popular | trending | latest

  const mode = query ? 'search' : genre ? 'genre' : category ? 'catalog' : null;

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
                data = await getLatestMovies(currentPage, size);
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
            // Series endpoints currently do not support page param; fallback to non-paginated.
            switch ((category || 'popular').toLowerCase()) {
              case 'trending':
                data = await getTrendingSeries();
                break;
              case 'latest':
                data = await getLatestSeries();
                break;
              case 'popular':
              default:
                data = await getPopularSeries();
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
  }, [mode, query, genre, media, category, currentPage, setLoading]);

  // Reset to first page when primary criteria changes
  useEffect(() => {
    setCurrentPage(1);
  }, [mode, query, genre, media, category]);

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
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

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
      <section className="space-ptb">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="categories-tabs">
                <div className="section-title">
                  <h2 className="title">{title}</h2>
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
                    : 'col-xl-2 col-lg-3 col-md-4 col-sm-6 mb-4'}
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
                            {isSeriesItem(item) && !item.runtime ? (
                              <a className="time" href="#" onClick={(e) => e.preventDefault()}>
                                SS {item.seasons || item.number_of_seasons || 'N/A'} <span className="dot"></span> EPS {item.episodes || item.number_of_episodes || 'N/A'}
                              </a>
                            ) : (
                              <a className="time" href="#" onClick={(e) => e.preventDefault()}>
                                <i className="far fa-clock me-2" />
                                {item.runtime ? `${Math.floor(item.runtime / 60)}hr : ${item.runtime % 60}min` : 'N/A'}
                              </a>
                            )}
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