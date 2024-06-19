import React from 'react';
import './App.css';
import MoviesList from './components/MoviesList/MoviesList';
import { MovieProvider } from './context/MovieContext';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Movie from './components/Movie/Movie';
import Header from './components/Header/Header';
import { ThemeProvider } from '@material-ui/core';
import { theme } from './theme';
import Favourite from './components/Favourite/Favourite';

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <MovieProvider>
                    <ThemeProvider theme={theme}>
                        <Header />
                        <Routes>
                            <Route path="/" element={<MoviesList />} />
                            <Route path="/movies/:id" element={<Movie />} />
                            <Route path="/favourites" element={<Favourite />} />
                        </Routes>
                    </ThemeProvider>
                </MovieProvider>
            </BrowserRouter>
        </div>
    );
}

export default App;
