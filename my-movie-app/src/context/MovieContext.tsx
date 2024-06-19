import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import axios from 'axios';
import { IMovie, IResponse, MovieContextType } from '../types';

const MovieContext = createContext<MovieContextType | undefined>(undefined);

export const useMovies = () => {
    const context = useContext(MovieContext);
    if (!context) throw new Error('useMovies must be used within a MovieProvider');
    return context;
};

export const MovieProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
    const [ratingRange, setRatingRange] = useState<number[]>([0, 10]);
    const [releaseYearRange, setReleaseYearRange] = useState<number[]>([1990, new Date().getFullYear()]);
    const [genres, setGenres] = useState([]);

    const [favorites, setFavorites] = useState<IMovie[]>([]);

    const addFavorite = (movie: IMovie) => {
        setFavorites((prevFavorites) => [...prevFavorites, movie]);
    };

    const removeFavorite = (movieId: number) => {
        setFavorites((prevFavorites) => prevFavorites.filter((item: IMovie) => item.id !== movieId));
    };

    const isFavorite = (movieId: number) => {
        return favorites.some((item) => item.id === movieId);
    };

    const [movies, setMovies] = useState<IMovie[]>([]);
    const [totalPages, setTotalPages] = useState(0);

    const fetchMovies = (page: number) => {
        setLoading(true);
        const genreQuery = selectedGenres.map((genre: any) => `genres.name=${encodeURIComponent(genre)}`).join('&');
        const ratingQuery = ratingRange.length > 0 ? `rating.imdb=${ratingRange[0]}-${ratingRange[1]}` : '';
        const yearQuery = releaseYearRange.length > 0 ? `year=${releaseYearRange[0]}-${releaseYearRange[1]}` : '';

        const url = `https://api.kinopoisk.dev/v1.4/movie?page=${page}&limit=50${genreQuery ? '&' + genreQuery : ''}${ratingQuery ? '&' + ratingQuery : ''}${
            yearQuery ? '&' + yearQuery : ''
        }&token=2ABZFFE-73C4T7X-HHMNPTD-DGB65X7`;
        axios
            .get<IResponse, IResponse>(url)
            .then((response) => {
                console.log('ответ', response);
                setMovies(response.data.docs);
                setTotalPages(response.data.pages);
            })
            .finally(() => setLoading(false));
    };

    useEffect(() => {
        fetch('https://api.kinopoisk.dev/v1/movie/possible-values-by-field?field=genres.name&token=2ABZFFE-73C4T7X-HHMNPTD-DGB65X7')
            .then((response) => response.json())
            .then((data) => {
                const genresFromAPI = data.map((genre: any) => genre.name);
                setGenres(genresFromAPI);
            })
            .catch((error) => console.error('Error fetching genres:', error));
    }, []);

    return (
        <MovieContext.Provider
            value={{
                movies,
                totalPages,
                fetchMovies,
                favorites,
                addFavorite,
                removeFavorite,
                isFavorite,
                setSelectedGenres,
                setReleaseYearRange,
                setRatingRange,
                selectedGenres,
                ratingRange,
                releaseYearRange,
                loading,
                genres,
            }}
        >
            {children}
        </MovieContext.Provider>
    );
};
