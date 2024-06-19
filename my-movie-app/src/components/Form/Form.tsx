import './Form.css';
import { Select, MenuItem, FormControl, InputLabel, Button, Slider, Typography } from '@mui/material';
import { useMovies } from '../../context/MovieContext';

const From: React.FC = () => {
    const { fetchMovies, setSelectedGenres, setRatingRange, setReleaseYearRange, selectedGenres, releaseYearRange, ratingRange, genres } = useMovies();

    const handleGenreChange = (event: { target: { value: any } }) => {
        setSelectedGenres(event.target.value);
    };

    const handleRatingRangeChange = (event: Event, newValue: any) => {
        setRatingRange(newValue);
    };

    const handleReleaseYearRangeChange = (event: Event, newValue: any) => {
        setReleaseYearRange(newValue);
    };

    const handleSubmit = (event: any) => {
        event.preventDefault();
        fetchMovies(1);
    };

    return (
        <div>
            <form className="sidenav-form__wrapper" onSubmit={handleSubmit}>
                <FormControl sx={{ m: 1, width: 200 }}>
                    <InputLabel color="secondary" id="genres-label">
                        Жанры
                    </InputLabel>
                    <Select onChange={handleGenreChange} color="secondary" labelId="genres-label" multiple value={selectedGenres}>
                        {genres.map((genre) => (
                            <MenuItem key={genre} value={genre}>
                                {genre}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <FormControl sx={{ width: 200, m: 1 }}>
                    <Typography id="rating-range-label">Рейтинг</Typography>
                    <Slider onChange={handleRatingRangeChange} color="secondary" value={ratingRange} valueLabelDisplay="auto" min={0} max={10} step={0.1} />
                </FormControl>

                <FormControl sx={{ width: 200, m: 1 }}>
                    <Typography id="release-year-range-label">Год выпуска</Typography>
                    <Slider
                        onChange={handleReleaseYearRangeChange}
                        color="secondary"
                        value={releaseYearRange}
                        valueLabelDisplay="auto"
                        min={1990}
                        max={new Date().getFullYear()}
                        step={1}
                    />
                </FormControl>

                <Button type="submit" color="secondary" variant="contained" sx={{ m: 1 }}>
                    Фильтровать
                </Button>
            </form>
        </div>
    );
};

export default From;
