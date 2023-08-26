import React, {useCallback, useEffect, useState} from 'react';
import axios from "../api/axios";
// Banner.tsx 로부터 임포트
import {Movie} from "./Banner";
import "./Row.css";
import MovieModal from "./MovieModal";

interface RowProps {
    title: string;
    id: string;
    fetchUrl: string;
}

const Row = ({title, id, fetchUrl}: RowProps) => {
    const [movies, setMovies] = useState<Movie[]>([])
    const [modalOpen, setModalOpen] = useState(false);
    const [movieSelected, setMovieSelection] = useState<Movie | null>(null);



    const fetchMovieData = useCallback(async () => {
        const response = await axios.get(fetchUrl);
        setMovies(response.data.results);
    }, [fetchUrl]);


    useEffect(() => {
        fetchMovieData();
    }, [fetchMovieData]);

    const handleClick = (movie: Movie) => {
        setModalOpen(true);
        setMovieSelection(movie);
    }

    return (
        <div>
            <h2>{title}</h2>
            {movies.map(movie => (
                <img
                    key={movie.id}
                    className="row__poster"
                    src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
                    alt={movie.name}
                    onClick={() => handleClick(movie)}
                />
            ))}

            {modalOpen && movieSelected && (
                <MovieModal
                    {...movieSelected}
                    setModalOpen={setModalOpen}
                />
            )}
        </div>
    );
};

export default Row;
