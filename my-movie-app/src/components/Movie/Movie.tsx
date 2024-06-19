import React from 'react';
import { useLocation } from 'react-router-dom';
import './Movie.css';

const Movie: React.FC = () => {
    let { state } = useLocation();

    if (!state.movie) {
        return <div>Movie not found</div>;
    }

    return (
        <div className="movie">
            {state.movie.poster?.url && <div className="movie-image" style={{ backgroundImage: `url(${state.movie.poster?.url})` }} />}
            {!state.movie.poster?.url && <div className="movie-image">Изображение отсутствует</div>}
            <div className="movie-content">
                <h1>{state.movie.name || state.movie.alternativeName}</h1>

                {state.movie.description && (
                    <div className="movie-description">
                        <span className="movie-description__title">Описание</span>
                        <p className="movie-description__text">{state.movie.description}</p>
                    </div>
                )}

                {Object.entries(state.movie.rating).filter(([_key, value]: [any, any]) => value > 0).length > 0 && (
                    <div className="movie-rating">
                        <span className="movie-rating__title">Рейтинг</span>
                        <ul className="movie-rating__list">
                            {Object.entries(state.movie.rating)
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
                    <span className="movie-release-date__title">Дата выхода:</span> {state.movie.year} год
                </div>

                <div className="movie-genres">
                    <span className="movie-genres__title">Жанры: </span>
                    <ul className="movie-genres__list">
                        {state.movie.genres &&
                            state.movie.genres.map((genre: any, inx: number) => (
                                <li className="movie-genres__li" key={inx}>
                                    {genre.name}
                                </li>
                            ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Movie;
