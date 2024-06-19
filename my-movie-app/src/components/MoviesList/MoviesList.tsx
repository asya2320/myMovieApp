import React from 'react';
import { MovieProvider, useMovies } from '../../context/MovieContext';
import './MoviesList.css';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { Link } from 'react-router-dom';
import Form from '../Form/Form';

const MoviesList: React.FC<{ filters: any }> = () => {
    const { movies, totalPages, fetchMovies, addFavorite, removeFavorite, isFavorite } = useMovies();

    const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
        fetchMovies(page, {});
    };

    const handleAddFavorite = (movieId: number) => {
        if (isFavorite(movieId)) {
            removeFavorite(movieId);
        } else {
            addFavorite(movieId);
        }
    };

    return (
        <MovieProvider>
            <div>
                <div className="movies-card__form">
                    <div className="movies-card__overflow">
                        <div className="movies-card__wrapper">
                            {movies.map((movie: any) => (
                                <Link to={`/movies/${movie.id}`} key={movie.id} style={{ textDecoration: 'none' }}>
                                    <div className="card-wrapper">
                                        <div className="card-image">
                                            {movie.poster?.previewUrl && <img src={movie.poster.previewUrl} alt={movie.name || movie.alternativeName || ''} />}
                                            {!movie.poster?.previewUrl && <div>Изображение отсутствует</div>}
                                        </div>

                                        <div className="card-content">
                                            <h5 className="card-title">{movie.name || movie.alternativeName}</h5>
                                            <p>Год создания: {movie.year}</p>

                                            <div className="card-rating">
                                                {Object.entries(movie.rating).filter(([_key, value]: any) => value > 0).length > 0 && <p>Рейтинг:</p>}
                                                {Object.entries(movie.rating)
                                                    .filter(([_key, value]: [any, any]) => value > 0)
                                                    .map(([key, value]: [any, any]) => (
                                                        <p key={key}>
                                                            {key}: {value}
                                                        </p>
                                                    ))}
                                            </div>
                                            <button
                                                className="heart"
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    handleAddFavorite(movie.id);
                                                }}
                                            >
                                                {isFavorite(movie.id) ? 'Убрать из избранного' : 'Добавить в избранное'}
                                            </button>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>{' '}
                    </div>
                    <Form></Form>
                </div>

                <Stack spacing={2}>
                    <Pagination color="secondary" count={totalPages} onChange={handlePageChange} />
                </Stack>
            </div>
        </MovieProvider>
    );
};

export default MoviesList;
