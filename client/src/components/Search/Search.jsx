import { useState, useEffect, useCallback } from 'react';
import { search } from '../../services/moviesService';
import { debounce } from 'lodash';
import { Link, useNavigate } from 'react-router-dom';

export default function Search({ isOpen, onClose }) {
    const navigate = useNavigate();
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [itemsOnPage, setItemsOnPage] = useState(10);

    const debouncedSearch = useCallback(
        debounce(async (searchQuery) => {
            if (searchQuery.trim().length > 0) {
                try {
                    const data = await search('all', searchQuery);
                    const searchResults = data.results || data;
                    setResults(searchResults);
                    setItemsOnPage(data.total_items);
                    console.log(data);
                    
                } catch (error) {
                    console.error('Search error:', error);
                    setResults([]);
                }
            } else {
                setResults([]);
            }
        }, 500),
        []
    );

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [isOpen]);

    useEffect(() => {
        debouncedSearch(query);
        return () => debouncedSearch.cancel();
    }, [query, debouncedSearch]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (query.trim().length > 2) {
            navigate(`/search?q=${encodeURIComponent(query)}`);
            handleClose();
        }
    };

    const handleClose = () => {
        onClose();
        setQuery('');
        setResults([]);
    };

    return (
        <>
            <div id="search" className={isOpen ? 'open' : ''}>
                <button type="button" className="close" onClick={handleClose}>
                    <i className="fa-solid fa-xmark" />
                </button>
                <form onSubmit={handleSubmit}>
                    <input 
                        type="search" 
                        value={query}
                        onChange={(e) => {
                            setQuery(e.target.value);
                            if (!e.target.value.trim()) {
                                setResults([]);
                            }
                        }}
                        placeholder="Search for a movie or series"
                        className={results && results.length > 0 ? 'has-results' : ''}
                    />
                    <button 
                        id="search-btn" 
                        type="submit" 
                        className={`btn btn-primary ${results && results.length > 0 ? 'button-has-results' : ''}`}
                    >
                        Search
                    </button>
                </form>
                {results && results.length > 0 && (
                    <div className="search-results">
                        <div className="results-list">
                            {results.map((item) => (
                                <div 
                                    key={item.id || item._id} 
                                    className="search-result-item"
                                    onClick={() => {
                                        navigate(`/${item.media_type}/details/${item.api_id}`);
                                        handleClose();
                                    }}
                                >
                                    <div className="poster">
                                        <img src={`https://image.tmdb.org/t/p/w92${item.poster_path}`} alt={item.title || item.name} />
                                    </div>
                                    <div className="content">
                                        <h3>{item.title || item.name}</h3>
                                        <p>
                                            <span className="rating">
                                                <i className="fas fa-star"></i>
                                                {item.vote_average}
                                            </span>
                                            <span>{item.media_type === 'movie' ? 'Movie' : 'Series'}</span>
                                            {item.release_date && <span>{item.release_date.split('-')[0]}</span>}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="view-all-results">
                            <button 
                                className="btn btn-primary w-100 view-all-results-btn"
                                onClick={() => {
                                    navigate(`/search?q=${encodeURIComponent(query)}`);
                                    handleClose();
                                }}
                            >
                                View All Results ({itemsOnPage})
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}