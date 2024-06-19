import React, { useEffect, useState } from 'react';
import { useMovies } from '../../context/MovieContext';
import './MoviesList.css';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { Link } from 'react-router-dom';
import Form from '../Form/Form';
import { IMovie } from '../../types';
import { CircularProgress } from '@mui/material';

const MoviesList: React.FC = () => {
    const { movies, totalPages, fetchMovies, addFavorite, removeFavorite, isFavorite, loading } = useMovies();
    const [page, setPage] = useState<number>(1);

    useEffect(() => {
        fetchMovies(page);
    }, [page]);

    const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
        setPage(page);
    };

    const handleAddFavorite = (movie: IMovie) => {
        if (isFavorite(movie.id)) {
            removeFavorite(movie.id);
        } else {
            addFavorite(movie);
        }
    };

    return (
        <div>
            <div className="movies-card__form">
                <div className="movies-card__overflow">
                    {loading ? (
                        <div className="loading-overlay">
                            <CircularProgress color="primary" />
                        </div>
                    ) : (
                        <div className="movies-card__wrapper">
                            {movies.map((movie: any) => (
                                <Link to={`/movies/${movie.id}`} state={{ movie: movie }} key={movie.id} style={{ textDecoration: 'none' }}>
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
                                                    handleAddFavorite(movie);
                                                }}
                                            >
                                                {isFavorite(movie.id) ? 'Убрать из избранного' : 'Добавить в избранное'}
                                            </button>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
                <Form></Form>
            </div>

            <Stack spacing={2}>
                <Pagination color="secondary" page={page} count={totalPages} onChange={handlePageChange} />
            </Stack>
        </div>
    );
};

export default MoviesList;
