export interface IResponse {
    data: IData;
    status: number;
    statusText: string;
    headers: string;
    config: IConfig;
    request: IRequest;
}

export interface IConfig {
    transitional: ITransitional;
    adapter: string[];
    transformRequest: null[];
    transformResponse: null[];
    timeout: number;
    xsrfCookieName: string;
    xsrfHeaderName: string;
    maxContentLength: number;
    maxBodyLength: number;
    env: Request;
    headers: ConfigHeaders;
    method: string;
    url: string;
}

export interface IRequest {}

export interface ConfigHeaders {
    Accept: string;
}

export interface ITransitional {
    silentJSONParsing: boolean;
    forcedJSONParsing: boolean;
    clarifyTimeoutError: boolean;
}

export interface IData {
    docs: IMovie[];
    total: number;
    limit: number;
    page: number;
    pages: number;
}

export interface IMovie {
    id: number;
    name: null | string;
    alternativeName: null | string;
    type: string;
    typeNumber: number;
    year: number | null;
    description: null | string;
    shortDescription: null | string;
    status: null | string;
    rating: Rating;
    votes: Rating;
    movieLength: number | null;
    totalSeriesLength: number | null;
    seriesLength: number | null;
    ratingMpaa: null | string;
    ageRating: number | null;
    poster?: Backdrop;
    genres?: Country[];
    countries?: Country[];
    releaseYears?: ReleaseYear[];
    top10: null;
    top250: null;
    isSeries: boolean;
    ticketsOnSale: boolean;
    enName?: null;
    backdrop?: Backdrop;
}

export interface Backdrop {
    url: string;
    previewUrl: string;
}

export interface Country {
    name: string;
}

export interface Rating {
    kp: number;
    imdb: number;
    filmCritics: number;
    russianFilmCritics: number;
    await: number | null;
}

export interface ReleaseYear {
    start: number | null;
    end: number | null;
}

export interface MovieContextType {
    movies: IMovie[];
    totalPages: number;
    fetchMovies: (page: number) => void;
    favorites: IMovie[];
    addFavorite: (movieId: any) => void;
    removeFavorite: (movieId: any) => void;
    isFavorite: (movieId: any) => boolean;
    setSelectedGenres: (genres: string[]) => void;
    setReleaseYearRange: (releaseYears: number[]) => void;
    setRatingRange: (rating: number[]) => void;
    selectedGenres: string[];
    ratingRange: number[];
    releaseYearRange: number[];
    loading: boolean;
    genres: string[];
}
