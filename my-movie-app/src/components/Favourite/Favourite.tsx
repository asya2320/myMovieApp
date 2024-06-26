import React from 'react';
import { useMovies } from '../../context/MovieContext';
import './Favourite.css';
import { Link } from 'react-router-dom';
import { IMovie } from '../../types';

const Favourite: React.FC = () => {
    const { favorites } = useMovies();

    return (
        <div>
            <div className="movies-card__form">
                <div className="movies-card__overflow">
                    <div className="movies-card__wrapper">
                        {favorites.map((movie: IMovie) => (
                            <Link to={`/movies/${movie.id}`} state={{movie: movie}} key={movie.id} style={{ textDecoration: 'none' }}>
                                <div className="card-wrapper">
                                    <div className="card-image">
                                        {movie.poster?.previewUrl && <img src={movie.poster.previewUrl} alt={movie.name || movie.alternativeName || ''} />}
                                        {!movie.poster?.previewUrl && <div>Изображение отсутствует</div>}
                                    </div>

                                    <div className="card-content">
                                        <h5 className="card-title">{movie.name || movie.alternativeName}</h5>
                                        <p>Год создания: {movie.year}</p>
                                        <div className="card-rating">
                                            {Object.entries(movie.rating).filter(([_key, value]: [any, any]) => value > 0).length > 0 && <p>Рейтинг:</p>}
                                            {Object.entries(movie.rating)
                                                .filter(([_key, value]: [any, any]) => value > 0)
                                                .map(([key, value]: [any, any]) => (
                                                    <p key={key}>
                                                        {key}: {value}
                                                    </p>
                                                ))}
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>{' '}
                </div>
            </div>
        </div>
    );
};

export default Favourite;
