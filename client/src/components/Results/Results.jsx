import { useState, useEffect, useRef, useCallback } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import { search, getGenres, getPopularMovies, getTrendingMovies, getLatestMovies, getTopRatedMovies, getPopularCollections, searchPopularCollections } from '../../services/moviesService';
import { getPopularSeries, getTrendingSeries, getLatestSeries, getTopRatedSeries } from '../../services/seriesService';
import { useLoading } from '../../contexts/LoadingContext';
import { getActorsMedia, getCrewMedia, getProductionCompanies } from '../../services/castService';
import { getUserProfile } from '../../services/authService';
import * as userService from '../../services/userService';
import { useContext } from 'react';
import AuthContext from '../../contexts/AuthProvider';

export default function Results() {
  // NOTE: we now get setSearchParams so we can read/write the page in the URL
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const { setLoading } = useLoading();
  const { user } = useContext(AuthContext);

  const [apiData, setApiData] = useState(null);

  // Notification state
  const [notification, setNotification] = useState({ show: false, message: '', type: 'success', id: null });

  // Notification function
  const showNotification = (message, type = 'add') => {
    const notificationId = Date.now();

    // If there's a notification currently showing, hide it first
    if (notification.show) {
      setNotification(prev => ({ ...prev, show: false }));
      // Wait for hide animation, then show new one
      setTimeout(() => {
        setNotification({ show: true, message, type, id: notificationId });
        setTimeout(() => {
          setNotification(prev => ({ ...prev, show: false }));
        }, 2000); // 2 seconds as requested
      }, 200);
    } else {
      // No current notification, show immediately
      setNotification({ show: true, message, type, id: notificationId });
      setTimeout(() => {
        setNotification(prev => ({ ...prev, show: false }));
      }, 2000);
    }
  };

  // page is *derived* from URL params — this keeps browser history correct
  const currentPage = searchParams.get('page') ? parseInt(searchParams.get('page'), 10) : 1;

  const [pageInput, setPageInput] = useState('');
  const sectionRef = useRef(null);
  const didMountRef = useRef(false);
  const pageResetRef = useRef(false);

  const query = searchParams.get('q');
  const genre = searchParams.get('genre');
  const media = searchParams.get('media') || 'all';
  const category = searchParams.get('category'); // catalog category: popular | trending | latest

  // Add types parameter for series filtering (plural to match genres)
  const types = searchParams.get('types') || '';

  // Add collection search query parameter
  const collectionQuery = searchParams.get('cq');

  // Add favorites parameter for user's favorites
  const favorites = searchParams.get('favorites');

  // Add actor ID parameter for actor media
  const actorId = searchParams.get('actorId');

  // Add actor media type parameter (all, movies, series)
  const actorMediaType = searchParams.get('mediaType') || 'all';

  // Add actor info parameters for display
  const actorName = searchParams.get('actorName');
  const actorImage = searchParams.get('actorImage');

  // Add crew info parameters for display
  const crewId = searchParams.get('crewId');
  const crewName = searchParams.get('crewName');
  const crewImage = searchParams.get('crewImage');

  // Add production company info parameters for display
  const prodId = searchParams.get('prodId');
  const prodName = searchParams.get('prodName');
  const prodImage = searchParams.get('prodImage');

  // Update mode detection to include collection search, actor media, crew media, and production company media
  // Check for valid non-empty values
  const mode = (prodId && prodId.trim()) ? 'production_company_media' :
               (crewId && crewId.trim()) ? 'crew_media' :
               (actorId && actorId.trim()) ? 'actor_media' :
               (favorites && favorites.trim()) ? 'favorites' :
               (query && query.trim()) ? 'search' :
               (genre && genre.trim()) ? 'genre' :
               (collectionQuery && collectionQuery.trim()) ? 'collection_search' :
               (category && category.trim()) ? 'catalog' : null;

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

  const hardcodedSeriesTypes = [
    { id: 'scripted', name: 'Scripted' },
    { id: 'miniseries', name: 'Mini-Series' },
    { id: 'reality', name: 'Reality' },
    { id: 'documentary', name: 'Documentary' }
  ];

  // Helper function to convert genre display name to backend format
  const convertGenreForBackend = (genreName) => {
    if (genreName === 'Sci-Fi') return 'Science Fiction';
    return genreName;
  };

  // Initialize selectedGenres from URL parameters (convert genre names back to IDs)
  const genresParam = searchParams.get('genres');
  const initialGenres = genresParam ? genresParam.split(',').map(genreName => {
    // Try to find genre by name (handle both display name and backend name)
    const genre = hardcodedGenres.find(g => g.name === genreName || convertGenreForBackend(g.name) === genreName);
    return genre ? genre.id : null;
  }).filter(id => id !== null) : [];
  const [selectedGenres, setSelectedGenres] = useState(initialGenres);

  // Update selectedGenres when URL genres parameter changes
  useEffect(() => {
    const currentGenresParam = searchParams.get('genres');
    const newGenres = currentGenresParam ? currentGenresParam.split(',').map(genreName => {
      // Try to find genre by name (handle both display name and backend name)
      const genre = hardcodedGenres.find(g => g.name === genreName || convertGenreForBackend(g.name) === genreName);
      return genre ? genre.id : null;
    }).filter(id => id !== null) : [];
    setSelectedGenres(newGenres);
  }, [searchParams]);

  // Initialize selectedTypes from URL parameters
  const typesParam = searchParams.get('types');
  const initialTypes = typesParam ? typesParam.split(',').filter(type => type.trim()) : [];
  const [selectedTypes, setSelectedTypes] = useState(initialTypes);

  // Update selectedTypes when URL types parameter changes
  useEffect(() => {
    const currentTypesParam = searchParams.get('types');
    const newTypes = currentTypesParam ? currentTypesParam.split(',').filter(type => type.trim()) : [];
    setSelectedTypes(newTypes);
  }, [searchParams]);

  // Add state for collection search input
  const [collectionSearchInput, setCollectionSearchInput] = useState(collectionQuery || '');
  const [collectionSearchResults, setCollectionSearchResults] = useState(null);
  const [lastSearchedTerm, setLastSearchedTerm] = useState('');
  const [hasPerformedCollectionSearch, setHasPerformedCollectionSearch] = useState(false);

  const [genreChanged, setGenreChanged] = useState(false);
  const [forceRefetch, setForceRefetch] = useState(0); // New state for forcing refetch
  const [filtersExpanded, setFiltersExpanded] = useState(false);

  const handleGenreToggle = (genreId) => {
    setSelectedGenres(prev => {
      const newGenres = prev.includes(genreId)
        ? prev.filter(id => id !== genreId)
        : [...prev, genreId];
      
      // Update URL with new genres
      updateGenresInParams(newGenres);
      return newGenres;
    });
    // Removed the forceRefetch trigger from here
  };

  const handleTypeToggle = (typeId) => {
    setSelectedTypes(prev => {
      const newTypes = prev.includes(typeId)
        ? prev.filter(id => id !== typeId)
        : [...prev, typeId];
      
      // Update URL with new types
      updateTypesInParams(newTypes);
      return newTypes;
    });
    // Removed the forceRefetch trigger from here
  };

  const updatePageInParams = (newPage) => {
    const paramsObj = Object.fromEntries([...searchParams]);
    // always set page as string
    paramsObj.page = String(newPage);
    setSearchParams(paramsObj);
  };

  // Add function to handle collection search (immediate results on same page)
  const handleCollectionSearch = useCallback(async (page = 1) => {
    if (collectionSearchInput.trim()) {
      const searchTerm = collectionSearchInput.trim();
      setLastSearchedTerm(searchTerm);
      setHasPerformedCollectionSearch(true);

      // Reset to page 1 when starting a new search
      if (page === 1 && currentPage !== 1) {
        updatePageInParams(1);
      }

      setLoading(true);
      try {
        const data = await searchPopularCollections(searchTerm, page, 20);
        const results = data.results || data.collections || [];

        // Trust the API results - if it returns results, show them
        const matchingResults = results;

        if (matchingResults.length === 0) {
          // If no actual matches found, set to null to show no results message
          setCollectionSearchResults(null);
        } else {
          // Create a new data object with results
          const filteredData = {
            ...data,
            results: matchingResults,
            collections: matchingResults,
            current_page: page,
            total_pages: data.total_pages || Math.ceil(matchingResults.length / 20),
            items_on_page: matchingResults.length
          };
          setCollectionSearchResults(filteredData);
        }
        console.log('Collection search results:', data);
      } catch (error) {
        console.error('Collection search error:', error);
        setCollectionSearchResults(null);
      } finally {
        setLoading(false);
      }
    } else {
      setCollectionSearchResults(null);
      setLastSearchedTerm('');
      setHasPerformedCollectionSearch(false);
    }
  }, [collectionSearchInput, currentPage, setLoading, updatePageInParams]);

  // Add function to clear collection search
  const handleClearCollectionSearch = () => {
    setCollectionSearchInput('');
    setCollectionSearchResults(null);
    setLastSearchedTerm('');
    setHasPerformedCollectionSearch(false);
  };

  const handleSearch = () => {
    setForceRefetch(prev => prev + 1);
  };

  const handleResetFilters = () => {
    setSelectedGenres([]);
    setSelectedTypes([]);
    updateGenresInParams([]); // Clear genres from URL
    updateTypesInParams([]); // Clear types from URL
    setForceRefetch(prev => prev + 1);
  };

  const updateGenresInParams = (genreIds) => {
    const paramsObj = Object.fromEntries([...searchParams]);
    if (genreIds.length > 0) {
      // Convert genre IDs to names for URL
      const genreNames = genreIds.map(id => {
        const genre = hardcodedGenres.find(g => g.id === id);
        return genre ? convertGenreForBackend(genre.name) : null;
      }).filter(Boolean);
      paramsObj.genres = genreNames.join(',');
    } else {
      delete paramsObj.genres; // Remove the parameter if no genres selected
    }
    setSearchParams(paramsObj);
  };

  const updateTypesInParams = (types) => {
    const paramsObj = Object.fromEntries([...searchParams]);
    if (types.length > 0) {
      paramsObj.types = types.join(',');
    } else {
      delete paramsObj.types; // Remove the parameter if no types selected
    }
    setSearchParams(paramsObj);
  };

  // Toggle favorite function for favorites mode
  const toggleFavorite = async (mediaType, id, e) => {
    if (!user) return;

    e.preventDefault();
    e.stopPropagation();

    const isMovie = mediaType === 'movie';

    try {
      if (isMovie) {
        const response = await userService.removeMovieFromFavorites(id);
        showNotification(response.message, 'remove');
      } else {
        const response = await userService.removeSeriesFromFavorites(id);
        showNotification(response.message, 'remove');
      }

      // Re-fetch favorites data to update the display
      setLoading(true);
      const profileData = await getUserProfile();
      if (favorites === 'movies') {
        const updatedData = {
          results: profileData.data.favorite_movies || [],
          total_pages: 1,
          total_results: (profileData.data.favorite_movies || []).length
        };
        setApiData(updatedData);
      } else if (favorites === 'series') {
        const updatedData = {
          results: profileData.data.favorite_tv_series || [],
          total_pages: 1,
          total_results: (profileData.data.favorite_tv_series || []).length
        };
        setApiData(updatedData);
      }
      setLoading(false);
    } catch (error) {
      console.error('Error removing from favorites:', error);
      showNotification('Failed to remove from favorites', 'error');
      setLoading(false);
    }
  };


  useEffect(() => {
    const fetchResults = async () => {
      if (!mode) return;
      // Skip if we're in collection search mode (handled by separate useEffect)
      if (hasPerformedCollectionSearch) return;

      setLoading(true);
      try {
        let data;
        if (mode === 'crew_media') {
          // Fetch crew's movies and series
          data = await getCrewMedia(crewId, currentPage, 30, actorMediaType);
          console.log('Crew media results:', data);
        } else if (mode === 'actor_media') {
          // Fetch actor's movies and series
          data = await getActorsMedia(actorId, currentPage, 30, actorMediaType);
          console.log('Actor media results:', data);
        } else if (mode === 'production_company_media') {
          // Fetch production company's movies and series
          data = await getProductionCompanies(prodId, currentPage, 30, actorMediaType);
          console.log('Production company media results:', data);
        } else if (mode === 'favorites') {
          // Fetch user's favorite movies or series
          const profileData = await getUserProfile();
          if (favorites === 'movies') {
            data = {
              results: profileData.data.favorite_movies || [],
              total_pages: 1,
              total_results: (profileData.data.favorite_movies || []).length
            };
          } else if (favorites === 'series') {
            data = {
              results: profileData.data.favorite_tv_series || [],
              total_pages: 1,
              total_results: (profileData.data.favorite_tv_series || []).length
            };
          }
          console.log('Favorites results:', data);
        } else if (mode === 'search') {
          // Note: current moviesService.search may ignore page/size; backend can be updated later.
          data = await search(media, query, currentPage, 30);
          console.log('Search results:', data);
        } else if (mode === 'collection_search') {
          // Search within collections using the new dedicated endpoint
          data = await searchPopularCollections(collectionQuery, currentPage, 20);
          console.log('Collection search results:', data);
        } else if (mode === 'genre') {
          // Convert selected genre IDs to genre names
          const selectedGenreNames = selectedGenres.length > 0
            ? selectedGenres.map(id => {
                const genreObj = hardcodedGenres.find(g => g.id === id);
                return genreObj ? convertGenreForBackend(genreObj.name) : null;
              }).filter(Boolean)
            : [];
          // Combine main genre (from URL) with additional selected genres
          const allGenreNames = genre ? [genre, ...selectedGenreNames] : selectedGenreNames;
          const genresParam = allGenreNames.join(',');
          data = await getGenres(media, genresParam, 30, currentPage);
          console.log('Genre results:', data);
        } else if (mode === 'catalog') {
          // Catalog mode: fetch by media/category with pagination
          if (media === 'movies' || media === 'all') {
            const size = 30;
            // Prepare genre names for filtering (applies to all catalog modes)
            const genreNames = selectedGenres.length > 0
              ? selectedGenres.map(id => convertGenreForBackend(hardcodedGenres.find(g => g.id === id)?.name)).filter(Boolean)
              : [];
            
            switch (category?.toLowerCase()) {
              case 'trending':
                data = await getTrendingMovies(media, currentPage, size, genreNames);
                break;
              case 'latest':
                data = await getLatestMovies(media, currentPage, size, genreNames);
                break;
              case 'top_rated':
                data = await getTopRatedMovies(media, currentPage, size, genreNames);
                break;
              case 'popular':
              default:
                data = await getPopularMovies(media, currentPage, size, genreNames);
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
            // Prepare genre names for filtering (same as movies)
            const genreNames = selectedGenres.length > 0
              ? selectedGenres.map(id => convertGenreForBackend(hardcodedGenres.find(g => g.id === id)?.name)).filter(Boolean).join(',')
              : '';
            const typesParam = selectedTypes.length > 0 ? selectedTypes.join(',') : '';
            switch (category?.toLowerCase()) {
              case 'trending':
                data = await getTrendingSeries(typesParam, currentPage, size, genreNames);
                break;
              case 'latest':
                data = await getLatestSeries(typesParam, currentPage, size, genreNames);
                break;
              case 'top_rated':
                data = await getTopRatedSeries(typesParam, currentPage, size, genreNames);
                break;
              case 'popular':
              default:
                data = await getPopularSeries(typesParam, currentPage, size, genreNames);
                break;
            }
            console.log('Catalog series:', category, selectedTypes, selectedGenres, data);
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
  }, [mode, query, collectionQuery, genre, media, category, types, currentPage, setLoading, forceRefetch, actorMediaType, crewId, crewName, prodId, prodName]);

  // Reset to first page when primary criteria changes — update URL page to 1
  useEffect(() => {
    // Skip page reset on initial mount to preserve URL page parameter when navigating back
    if (!pageResetRef.current) {
      pageResetRef.current = true;
      return;
    }
    
    // only update URL if it isn't already page 1
    if (currentPage !== 1) updatePageInParams(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode, query, collectionQuery, genre, media, category, types, actorMediaType, crewId, crewName, prodId, prodName]);

  // Reset page to 1 when selecting genres or types (user expects new filter to start from page 1)
  useEffect(() => {
    if (selectedGenres.length > 0 && currentPage !== 1) {
      updatePageInParams(1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedGenres]);

  useEffect(() => {
    if (selectedTypes.length > 0 && currentPage !== 1) {
      updatePageInParams(1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedTypes]);

  const selectResults = () => {
    // If we have crew media data, return the data for the selected mediaType
    if (mode === 'crew_media') {
      return apiData?.[actorMediaType] || apiData?.results || [];
    }
    // If we have actor media data, return the data for the selected mediaType
    if (mode === 'actor_media') {
      return apiData?.[actorMediaType] || apiData?.results || [];
    }
    // If we have production company media data, return the data for the selected mediaType
    if (mode === 'production_company_media') {
      return apiData?.[actorMediaType] || apiData?.results || [];
    }

    // If we've performed a collection search, show search results (even if empty/null)
    if (hasPerformedCollectionSearch) {
      const searchResults = collectionSearchResults?.results || collectionSearchResults?.collections || [];
      console.log('Returning search results:', searchResults.length, 'hasPerformedCollectionSearch:', hasPerformedCollectionSearch, 'collectionSearchResults exists:', !!collectionSearchResults);
      return searchResults;
    }

    if (!apiData) return [];
    if (mode === 'search') {
      return apiData.results || apiData.movies || apiData.series || [];
    }
    if (mode === 'collection_search') {
      return apiData.results || apiData.collections || [];
    }
    if (mode === 'genre') {
      return apiData[media] || apiData.results || [];
    }
    // catalog - collections use .results, others use data[media]
    if (mode === 'catalog' && media === 'collections') {
      return apiData.results || apiData.popular;
    }
    // catalog - use data[media] for consistent access
    return apiData[media] || apiData.results || [];
  };

  const results = selectResults();
  const totalPages = collectionSearchResults?.total_pages || apiData?.total_pages || 1;
  const totalItems = collectionSearchResults?.total_items || apiData?.total_items || results.length;
  const itemsPerPage = collectionSearchResults?.items_on_page || apiData?.items_on_page || (Array.isArray(results) ? results.length : 30);

  const handleTabChange = (newMedia) => {
    if (mode === 'favorites') {
      navigate(`/results?favorites=${newMedia === 'movies' ? 'movies' : 'series'}`);
    } else if (mode === 'search') {
      navigate(`/search?q=${query}&media=${newMedia}`);
    } else if (mode === 'collection_search') {
      navigate(`/search?cq=${collectionQuery}&media=${newMedia}`);
    } else if (mode === 'genre') {
      navigate(`/genre?genre=${genre}&media=${newMedia}`);
    } else if (mode === 'catalog') {
      navigate(`/catalog?media=${newMedia}&category=${category}`);
    } else if (mode === 'crew_media') {
      navigate(`/crew-media?crewId=${crewId}&crewName=${encodeURIComponent(crewName || '')}&crewImage=${encodeURIComponent(crewImage || '')}&mediaType=${newMedia}`);
    } else if (mode === 'actor_media') {
      navigate(`/actor-media?actorId=${actorId}&actorName=${encodeURIComponent(actorName || '')}&actorImage=${encodeURIComponent(actorImage || '')}&mediaType=${newMedia}`);
    } else if (mode === 'production_company_media') {
      navigate(`/production-company-media?prodId=${prodId}&prodName=${encodeURIComponent(prodName || '')}&prodImage=${encodeURIComponent(prodImage || '')}&mediaType=${newMedia}`);
    }
  };

  // PAGINATION: update URL (this creates history entries)
  const paginate = (pageNumber) => {
    // clamp page
    const target = Math.max(1, Math.min(totalPages || 1, pageNumber));
    updatePageInParams(target);

    // If we're in collection search mode, trigger a new search for the new page
    if (hasPerformedCollectionSearch) {
      handleCollectionSearch(target);
    }
  };

  const goToPage = () => {
    const parsed = parseInt(pageInput, 10);
    if (!isNaN(parsed)) {
      const target = Math.max(1, Math.min(totalPages || 1, parsed));
      updatePageInParams(target);
      setPageInput('');

      // If we're in collection search mode, trigger a new search for the new page
      if (hasPerformedCollectionSearch) {
        handleCollectionSearch(target);
      }
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
    if (item?.media_type === 'series') return true;
    if (media === 'series') return true;
    return false;
  };

  const isCollectionItem = () => mode === 'catalog' && media === 'collections' || mode === 'collection_search';

  // Update title function to include collection search and actor media
  const title = (() => {
    // If we've performed a collection search, show that title (even if no results)
    if (hasPerformedCollectionSearch) {
      return `Collection Search Results for "${lastSearchedTerm}"`;
    }

    if (mode === 'favorites') {
      return favorites === 'movies' ? 'My Favorite Movies' : 'My Favorite TV Series';
    }
    if (mode === 'crew_media') return crewName ? `${crewName}'s Media` : `Crew's Media`;
    if (mode === 'actor_media') return actorName ? `${actorName}'s Media` : `Actor's Media`;
    if (mode === 'production_company_media') return prodName ? `${prodName} Movies` : `Production Company Media`;
    if (mode === 'search') return `Search Results for "${query}"`;
    if (mode === 'collection_search') return `Collection Search Results for "${collectionQuery}"`;
    if (mode === 'genre') return genre || 'Results';
    if (mode === 'catalog') {
      const catLabel = (category || 'popular').replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
      // When media is 'all', only show the category label without "All"
      if (media === 'all') {
        return catLabel;
      }
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
      <section ref={sectionRef}>
        <div className="container">
          <div className="row genres-container">
            {mode !== 'search' && mode !== 'collection_search' && mode !== 'actor_media' && mode !== 'crew_media' && mode !== 'production_company_media' && mode !== 'favorites' && mode && media !== 'collections' && (
              <div className="row">
                <div className="col-12">
                  {/* Show both genres and types for series catalog in one dropdown, otherwise show one */}
                  {media === 'series' && mode === 'catalog' ? (
                    <div className="genre-filters-container">
                      <div 
                        className="genre-filters-header"
                        onClick={() => setFiltersExpanded(!filtersExpanded)}
                        style={{ cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                      >
                        <h6 style={{ margin: 0 }}>
                          Filter by:
                        </h6>
                        <span className={`genre-toggle-icon ${filtersExpanded ? 'expanded' : ''}`}>
                          {filtersExpanded ? '▼' : '▶'}
                        </span>
                      </div>
                      {filtersExpanded && (
                        <>
                          <div style={{ marginBottom: '20px' }}>
                            <h6 style={{ color: '#f6be00', marginBottom: '10px', fontSize: '14px' }}>Genres:</h6>
                            <div className="genre-buttons">
                              {hardcodedGenres.map(item => (
                                <button
                                  key={item.id}
                                  className={`genre-filter-btn ${selectedGenres.includes(item.id) ? 'selected' : ''}`}
                                  onClick={() => handleGenreToggle(item.id)}
                                >
                                  {item.name}
                                </button>
                              ))}
                            </div>
                          </div>
                          <div style={{ marginBottom: '20px' }}>
                            <h6 style={{ color: '#f6be00', marginBottom: '10px', fontSize: '14px' }}>Types:</h6>
                            <div className="genre-buttons">
                              {hardcodedSeriesTypes.map(item => (
                                <button
                                  key={item.id}
                                  className={`genre-filter-btn ${selectedTypes.includes(item.id) ? 'selected' : ''}`}
                                  onClick={() => handleTypeToggle(item.id)}
                                >
                                  {item.name}
                                </button>
                              ))}
                            </div>
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
                            {(selectedGenres.length > 0 || selectedTypes.length > 0) && (
                              <button 
                                className="genre-reset-btn"
                                onClick={handleResetFilters}
                              >
                                Reset Filters
                              </button>
                            )}
                          </div>
                        </>
                      )}
                    </div>
                  ) : (
                    /* Single filter for movies or non-catalog series */
                    <div className="genre-filters-container">
                      <div 
                        className="genre-filters-header"
                        onClick={() => setFiltersExpanded(!filtersExpanded)}
                        style={{ cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                      >
                        <h6 style={{ margin: 0 }}>
                          Filter by:
                        </h6>
                        <span className={`genre-toggle-icon ${filtersExpanded ? 'expanded' : ''}`}>
                          {filtersExpanded ? '▼' : '▶'}
                        </span>
                      </div>
                      {filtersExpanded && (
                        <>
                          {media === 'series' ? (
                            <div style={{ marginBottom: '20px' }}>
                              <h6 style={{ color: '#f6be00', marginBottom: '10px', fontSize: '14px' }}>Types:</h6>
                              <div className="genre-buttons">
                                {hardcodedSeriesTypes.map(item => (
                                  <button
                                    key={item.id}
                                    className={`genre-filter-btn ${selectedTypes.includes(item.id) ? 'selected' : ''}`}
                                    onClick={() => handleTypeToggle(item.id)}
                                  >
                                    {item.name}
                                  </button>
                                ))}
                              </div>
                            </div>
                          ) : (
                            <div style={{ marginBottom: '20px' }}>
                              <h6 style={{ color: '#f6be00', marginBottom: '10px', fontSize: '14px' }}>Genres:</h6>
                              <div className="genre-buttons">
                                {hardcodedGenres.map(item => (
                                  <button
                                    key={item.id}
                                    className={`genre-filter-btn ${selectedGenres.includes(item.id) ? 'selected' : ''}`}
                                    onClick={() => handleGenreToggle(item.id)}
                                  >
                                    {item.name}
                                  </button>
                                ))}
                              </div>
                            </div>
                          )}
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
                            {((media === 'series' ? selectedTypes : selectedGenres).length > 0) && (
                              <button 
                                className="genre-reset-btn"
                                onClick={handleResetFilters}
                              >
                                Reset Filters
                              </button>
                            )}
                          </div>
                        </>
                      )}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
      <section>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              {/* Crew info header for crew media mode */}
              {mode === 'crew_media' && crewName && (
                <div className="crew-info-header text-center mb-4">
                  <div className="crew-profile d-flex align-items-center justify-content-center" style={{ gap: '20px' }}>
                    {crewImage && (
                      <div className="crew-image">
                        <img
                          src={`https://media.themoviedb.org/t/p/w138_and_h175_face${crewImage}`}
                          alt={crewName}
                          className="img-fluid rounded"
                          style={{ width: '100px', height: 'auto' }}
                          onError={(e) => { e.target.src = '/images/no-image.jpg'; }}
                        />
                      </div>
                    )}
                    <div className="crew-details">
                      <h3 className="crew-name mb-1" style={{ color: '#f6be00', fontSize: '28px', fontWeight: '600' }}>{crewName}</h3>
                      <p className="crew-media-count text-white-50" style={{ fontSize: '16px', margin: 0 }}>
                        {itemsPerPage > 0 ? `${totalItems} ${totalItems === 1 ? 'title' : 'titles'}` : 'No titles found'}
                      </p>
                    </div>
                  </div>
                </div>
              )}
              {/* Actor info header for actor media mode */}
              {mode === 'actor_media' && actorName && (
                <div className="actor-info-header text-center mb-4">
                  <div className="actor-profile d-flex align-items-center justify-content-center" style={{ gap: '20px' }}>
                    {actorImage && (
                      <div className="actor-image">
                        <img
                          src={`https://media.themoviedb.org/t/p/w138_and_h175_face${actorImage}`}
                          alt={actorName}
                          className="img-fluid rounded"
                          style={{ width: '100px', height: 'auto' }}
                          onError={(e) => { e.target.src = '/images/no-image.jpg'; }}
                        />
                      </div>
                    )}
                    <div className="actor-details">
                      <h3 className="actor-name mb-1" style={{ color: '#f6be00', fontSize: '28px', fontWeight: '600' }}>{actorName}</h3>
                      <p className="actor-media-count text-white-50" style={{ fontSize: '16px', margin: 0 }}>
                        {itemsPerPage > 0 ? `${totalItems} ${totalItems === 1 ? 'title' : 'titles'}` : 'No titles found'}
                      </p>
                    </div>
                  </div>
                </div>
              )}
              {/* Production company info header for production company media mode */}
              {mode === 'production_company_media' && prodName && (
                <div className="prod-info-header text-center mb-4">
                  <div className="prod-profile d-flex align-items-center justify-content-center" style={{ gap: '20px' }}>
                    {prodImage && (
                      <div className="prod-image">
                        <img
                          src={`https://image.tmdb.org/t/p/w300${prodImage}`}
                          alt={prodName}
                          className="img-fluid rounded"
                          style={{ width: '120px', height: 'auto', maxHeight: '80px', objectFit: 'contain' }}
                          onError={(e) => { e.target.src = '/images/no-image.jpg'; }}
                        />
                      </div>
                    )}
                    <div className="prod-details">
                      <h3 className="prod-name mb-1" style={{ color: '#f6be00', fontSize: '28px', fontWeight: '600' }}>{prodName}</h3>
                      <p className="prod-media-count text-white-50" style={{ fontSize: '16px', margin: 0 }}>
                        {itemsPerPage > 0 ? `${totalItems} ${totalItems === 1 ? 'title' : 'titles'}` : 'No titles found'}
                      </p>
                    </div>
                  </div>
                </div>
              )}
              <div className="categories-tabs">
                <div className="section-title d-flex align-items-center justify-content-between flex-wrap" style={{ gap: '12px' }}>
                  {/* Center the pagination */}
                  <div className="d-flex justify-content-between align-items-center flex-grow-1">
                  <h2 className="title mb-0">{title}</h2>
                    {totalPages > 1 && mode !== 'search' && (
                      <nav aria-label="Page navigation" className="top-pagination">
                        <ul className="pagination justify-content-center flex-wrap mb-0" style={{ gap: '8px' }}>
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
                    {/* Show search bar for collections, tabs for others */}
                    {mode === 'catalog' && media === 'collections' ? (
                      <div className="collection-search-container" style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                        <input
                          type="text"
                          value={collectionSearchInput}
                          onChange={(e) => setCollectionSearchInput(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              handleCollectionSearch(1);
                            }
                          }}
                          placeholder="Search collections..."
                          style={{
                            minWidth: '200px',
                            padding: '8px 12px',
                            borderRadius: '5px',
                            border: '1px solid #f6be00',
                            backgroundColor: '#0a0a0a',
                            color: '#f6be00',
                            outline: 'none',
                            fontSize: '14px'
                          }}
                        />
                        <button
                          onClick={() => handleCollectionSearch(1)}
                          disabled={!collectionSearchInput.trim()}
                          style={{
                            backgroundColor: '#f6be00',
                            border: '1px solid #f6be00',
                            color: '#0a0a0a',
                            padding: '8px 12px',
                            borderRadius: '5px',
                            cursor: collectionSearchInput.trim() ? 'pointer' : 'not-allowed',
                            transition: 'all 0.3s ease',
                            fontSize: '14px',
                            fontWeight: '500',
                            opacity: collectionSearchInput.trim() ? 1 : 0.6
                          }}
                        >
                          <i className="fas fa-search"></i>
                        </button>
                        {collectionQuery && (
                          <button
                            onClick={handleClearCollectionSearch}
                            style={{
                              backgroundColor: '#333',
                              border: '1px solid #f6be00',
                              color: '#f6be00',
                              padding: '8px 12px',
                              borderRadius: '5px',
                              cursor: 'pointer',
                              transition: 'all 0.3s ease',
                              fontSize: '14px',
                              fontWeight: '500'
                            }}
                            onMouseEnter={(e) => {
                              e.target.style.backgroundColor = '#f6be00';
                              e.target.style.color = '#0a0a0a';
                            }}
                            onMouseLeave={(e) => {
                              e.target.style.backgroundColor = '#333';
                              e.target.style.color = '#f6be00';
                            }}
                          >
                            <i className="fas fa-times"></i>
                          </button>
                        )}
                      </div>
                    ) : (
                      /* Pills on the right - hide for collections catalog and favorites */
                      (mode === 'search' || mode === 'genre' || mode === 'catalog' || mode === 'actor_media' || mode === 'crew_media' || mode === 'production_company_media') && (
                        <div className="tabs tabs-catalog">
                          <ul className="nav nav-tabs nav-pills" id="pills-tab" role="tablist">
                            <li className="nav-item" role="presentation">
                              <button
                                className={`nav-link ${((mode === 'actor_media' || mode === 'crew_media' || mode === 'production_company_media') ? actorMediaType : media) === 'all' ? 'active' : ''}`}
                                id="all-content"
                                data-bs-toggle="pill"
                                data-bs-target="#pills-all"
                                type="button"
                                role="tab"
                                aria-controls="pills-all"
                                aria-selected={((mode === 'actor_media' || mode === 'crew_media' || mode === 'production_company_media') ? actorMediaType : media) === 'all'}
                                onClick={() => handleTabChange('all')}
                              >
                                All
                              </button>
                            </li>
                            <li className="nav-item" role="presentation">
                              <button
                                className={`nav-link ${((mode === 'actor_media' || mode === 'crew_media' || mode === 'production_company_media') ? actorMediaType : media) === 'movies' ? 'active' : ''}`}
                                id="movies-only"
                                data-bs-toggle="pill"
                                data-bs-target="#pills-movies"
                                type="button"
                                role="tab"
                                aria-controls="pills-movies"
                                aria-selected={((mode === 'actor_media' || mode === 'crew_media' || mode === 'production_company_media') ? actorMediaType : media) === 'movies'}
                                onClick={() => handleTabChange('movies')}
                              >
                                Movies
                              </button>
                            </li>
                            <li className="nav-item" role="presentation">
                              <button
                                className={`nav-link ${((mode === 'actor_media' || mode === 'crew_media' || mode === 'production_company_media') ? actorMediaType : media) === 'series' ? 'active' : ''}`}
                                id="series-only"
                                data-bs-toggle="pill"
                                data-bs-target="#pills-series"
                                type="button"
                                role="tab"
                                aria-controls="pills-series"
                                aria-selected={((mode === 'actor_media' || mode === 'crew_media' || mode === 'production_company_media') ? actorMediaType : media) === 'series'}
                                onClick={() => handleTabChange('series')}
                              >
                                Series
                              </button>
                            </li>
                          </ul>
                        </div>
                      )
                    )}
                  </div>
                </div>
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
                            <a href="javascript:void(0)" className={`like ${mode === 'favorites' ? 'active' : ''}`} onClick={(e) => mode === 'favorites' ? toggleFavorite('movie', item.api_id, e) : e.preventDefault()} />
                            <a className="views" href="#" onClick={(e) => e.preventDefault()}>
                              <i className="fa-solid fa-star" /> {item.vote_average ? (typeof item.vote_average === 'number' ? item.vote_average.toFixed(1) : item.vote_average) : '0'}
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
                              <a href="#" className={`like ${mode === 'favorites' ? 'active' : ''}`} onClick={(e) => mode === 'favorites' ? toggleFavorite(isSeriesItem(item) ? 'series' : 'movie', item.api_id, e) : e.preventDefault()} />
                              <a className="rating" href="#" onClick={(e) => e.preventDefault()}>
                                <i className="fa-solid fa-star" /> {item.vote_average ? (item.vote_average.toFixed(1)) : "0"}
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
                  {collectionSearchResults ? `No collections found for "${lastSearchedTerm || collectionSearchInput}"` :
                   mode === 'actor_media' ? `No media found for this actor` :
                   mode === 'search' ? `No results found for "${query || 'your search'}"` :
                   mode === 'collection_search' ? `No collections found for "${collectionQuery}"` :
                   `No results found for ${genre}`}
                </p>
              </div>
            )}
          </div>

          {totalPages > 1 && mode !== 'search' && (
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

      {/* Notification */}
      <div
        key={notification.id}
        style={{
          position: 'fixed',
          top: notification.show ? '20px' : '-120px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 9999,
          backgroundColor: notification.type === 'add' ? '#28a745' : notification.type === 'auth' ? '#17a2b8' : '#dc3545',
          color: 'white',
          padding: notification.type === 'auth' ? '20px 32px' : '16px 32px',
          borderRadius: '8px',
          boxShadow: '0 6px 20px rgba(0,0,0,0.4)',
          border: '2px solid rgba(255,255,255,0.2)',
          transition: 'all 0.4s ease-in-out',
          opacity: notification.show ? 1 : 0,
          fontWeight: '600',
          fontSize: '16px',
          whiteSpace: 'nowrap',
          minWidth: notification.type === 'auth' ? '400px' : '300px',
          textAlign: 'center',
          pointerEvents: notification.show ? 'auto' : 'none',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: notification.type === 'auth' ? '12px' : '0'
        }}>
        {notification.show && (
          <>
            <div>{notification.message}</div>
            {notification.type === 'auth' && (
              <div style={{ fontSize: '14px', fontWeight: '400', marginTop: '8px' }}>
                Redirecting to login...
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
}
