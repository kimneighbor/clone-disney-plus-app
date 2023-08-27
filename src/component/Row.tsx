import React, {useCallback, useEffect, useState} from 'react';
import axios from "../api/axios";
// Banner.tsx 로부터 임포트
import {Movie} from "./Banner";
import "./Row.css";
import MovieModal from "./MovieModal";

import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

import styled from 'styled-components';

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
        <Container>
            <h2>{title}</h2>
            <Swiper
                modules={[Navigation, Pagination, Scrollbar, A11y]}
                scrollbar={true}
                loop={true}
                navigation
                pagination={{clickable: true}}
            >
                <Content id={id}>

                    {movies.map(movie => (
                        <SwiperSlide>
                            <img
                                key={movie.id}
                                className="row__poster"
                                src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
                                alt={movie.name}
                                onClick={() => handleClick(movie)}
                            />
                        </SwiperSlide>
                    ))}
                </Content>
            </Swiper>

            {modalOpen && movieSelected && (
                <MovieModal
                    {...movieSelected}
                    setModalOpen={setModalOpen}
                />
            )}
        </Container>
    );
};

export default Row;


const Container = styled.div`
  padding: 0 0 26px;
`;

const Content = styled.div`
`;

const Wrap = styled.div``;
