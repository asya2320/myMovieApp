import React from 'react';
import { useParams } from 'react-router-dom';
import { MovieProvider, useMovies } from '../../context/MovieContext';
import { IMovie } from '../../types';
import './Movie.css';

const Movie: React.FC = () => {
    const { movies } = useMovies();
    const { id } = useParams();

    const movie = movies.filter((movie: IMovie) => movie.id.toString() === id)[0];

    console.log('this', movie);
    if (!movie) {
        return <div>Movie not found</div>;
    }

    return (
        <MovieProvider>
            <div className="movie">
                {movie.poster?.url && <div className="movie-image" style={{ backgroundImage: `url(${movie.poster?.url})` }} />}
                {!movie.poster?.url && <div className="movie-image">Изображение отсутствует</div>}
                <div className="movie-content">
                    <h1>{movie.name || movie.alternativeName}</h1>

                    {movie.description && (
                        <div className="movie-description">
                            <span className="movie-description__title">Описание</span>
                            <p className="movie-description__text">{movie.description}</p>
                        </div>
                    )}

                    {Object.entries(movie.rating).filter(([_key, value]: [any, any]) => value > 0).length > 0 && (
                        <div className="movie-rating">
                            <span className="movie-rating__title">Рейтинг</span>
                            <ul className="movie-rating__list">
                                {Object.entries(movie.rating)
                                    .filter(([_key, value]: [any, any]) => value > 0)
                                    .map(([key, value]: [any, any]) => (
                                        <li className="movie-rating__li" key={key}>
                                            {key}: {value}
                                        </li>
                                    ))}
                            </ul>
                        </div>
                    )}

                    <div className="movie-release-date">
                        <span className="movie-release-date__title">Дата выхода:</span> {movie.year} год
                    </div>

                    <div className="movie-genres">
                        <span className="movie-genres__title">Жанры: </span>
                        <ul className="movie-genres__list">
                            {movie.genres &&
                                movie.genres.map((genre: any, inx: number) => (
                                    <li className="movie-genres__li" key={inx}>
                                        {genre.name}
                                    </li>
                                ))}
                        </ul>
                    </div>
                </div>
            </div>
        </MovieProvider>
    );
};

export default Movie;
