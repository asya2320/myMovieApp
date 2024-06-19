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
    const [favorites, setFavorites] = useState<number[]>([]);

    const addFavorite = (movieId: number) => {
        setFavorites([...favorites, movieId]);
    };

    const removeFavorite = (movieId: number) => {
        setFavorites(favorites.filter((id: number) => id !== movieId));
    };

    const isFavorite = (movieId: number) => {
        return favorites.includes(movieId);
    };

    const [movies, setMovies] = useState<IMovie[]>([]);
    const [totalPages, setTotalPages] = useState(0);

    const fetchMovies = (page: number, filters: any) => {
        const { genres = [], ratingRange = [], yearRange = [] } = filters;
        const genreQuery = genres.map((genre: any) => `genres.name=${encodeURIComponent(genre)}`).join('&');
        const ratingQuery = ratingRange.length > 0 ? `rating.imdb=${ratingRange[0]}-${ratingRange[1]}` : '';
        const yearQuery = yearRange.length > 0 ? `year=${yearRange[0]}-${yearRange[1]}` : '';

        const url = `https://api.kinopoisk.dev/v1.4/movie?page=${page}&limit=50${genreQuery ? '&' + genreQuery : ''}${ratingQuery ? '&' + ratingQuery : ''}${
            yearQuery ? '&' + yearQuery : ''
        }&token=4JCS9TP-RA04RFP-NNK1MZG-8MFP1B0`;
        axios.get<IResponse, IResponse>(url).then((response) => {
            console.log('ответ', response);
            setMovies(response.data.docs);
            setTotalPages(response.data.pages);
        });
    };

    useEffect(() => {
        fetchMovies(1, {});
    }, []);

    return (
        <MovieContext.Provider value={{ movies, totalPages, fetchMovies, favorites, addFavorite, removeFavorite, isFavorite }}>
            {children}
        </MovieContext.Provider>
    );
};
