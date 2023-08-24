import React, { useCallback, useEffect, useState } from 'react';
import axios from "../api/axios";
// Banner.tsx 로부터 임포트
import { Movie } from "./Banner";
import "./Row.css";

interface RowProps {
    title: string;
    id: string;
    fetchUrl: string;
}

const Row = ({ title, id, fetchUrl }: RowProps) => {
    const [movies, setMovies] = useState<Movie[]>([])

    const fetchMovieData = useCallback(async () => {
        const response = await axios.get(fetchUrl);
        setMovies(response.data.results);
    }, [fetchUrl]);


    useEffect(() => {
        fetchMovieData();
    }, [fetchMovieData]);

    return (
        <div>
            <h2>{title}</h2>
            <div className='slider'>
                <div className='slider__arrow-left'>
                    <span className='arrow'
                          onClick={() => {
                              const element = document.getElementById(id);
                              if (element) {
                                  element.scrollLeft -= window.innerWidth - 80;
                              }
                          }}
                    >
                        {"<"}
                    </span>
                </div>

                <div id={id} className={"row__posters"}>
                    {movies.map(movie => (
                        <img
                            key={movie.id}
                            className="row__poster"
                            src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
                            alt={movie.name}
                        />
                    ))}
                </div>
                <div className='slider__arrow-right'>
                    <span
                        className='arrow'
                        onClick={() => {
                            const element = document.getElementById(id);
                            if (element) {
                                element.scrollLeft += window.innerWidth - 80;
                            }
                        }}
                    >
                        {">"}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default Row;
