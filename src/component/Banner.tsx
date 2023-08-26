import React, {useEffect, useState} from "react";
import axios from "../api/axios";
import requests from "../api/request";
import "./Banner.css";
import styled from "styled-components";

//export Row.tsx 에서 사용
export interface Movie {
    backdrop_path: string | null;
    media_type: string;
    //Row.tsx 에서 id 사용
    id: string;
    title?: string;
    name?: string;
    original_name?: string;
    overview: string;
    release_date?: string;
    first_air_date?: string;
    vote_average: number;
    setModalOpen?: any;
    videos?: {
        results: {
            key: string;
        }[];
    };
}

const Banner = () => {
    const [movie, setMovie] = useState<Movie | null>(null);
    const [isClicked, setIsClicked] = useState(false);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const response = await axios.get(requests.fetchNowPlaying);
        const movieId =
            response.data.results[
                Math.floor(Math.random() * response.data.results.length)
                ].id;

        const {data: movieDetail} = await axios.get<Movie>(`movie/${movieId}`, {
            params: {append_to_response: "videos"},
        });
        setMovie(movieDetail);
    };

    const truncate = (str?: string, n?: number) => {
        return str?.length && n ? (str.substr(0, n) + "...") : str;
    };

    if (isClicked) {
        return (
            <>
                <Container>
                    <HomeContainer>
                        <Iframe
                            src={`https://www.youtube.com/embed/${movie?.videos?.results[0]?.key}?controls=0&autoplay=1&mute=1&loop=1&mute=1&playlist=${movie?.videos?.results[0]?.key}`}
                            width="640"
                            height="360"
                            frameBorder="0"
                            allow="autoplay; fullscreen"
                        ></Iframe>
                    </HomeContainer>
                </Container>
                <button onClick={() => setIsClicked(false)}>X</button>
            </>
        );
    } else {

        return (
            <header
                className="banner"
                style={{
                    backgroundImage: `url("https://image.tmdb.org/t/p/original/${
                        movie?.backdrop_path ?? ""
                    }")`,
                    backgroundPosition: " top center",
                    backgroundSize: " cover",

                    // 오류 수정 코드
                    // backgroundImage: movie?.backdrop_path
                    //     ? `url(" https://image.tmdb.org/t/p/original/${movie.backdrop_path}")`
                    //     : "",
                    // backgroundPosition: "top center",
                    // backgroundSize: "cover",
                }}
            >
                <div className="banner__contents">
                    <h1 className="banner__title">
                        {movie?.title || movie?.name || movie?.original_name}
                    </h1>

                    <div className="banner__buttons">
                        {movie?.videos?.results[0]?.key &&
                            <button
                                className="banner__button play"
                                onClick={() => setIsClicked(true)}>
                                Play
                            </button>
                        }
                    </div>
                    <p className="banner__description">
                        {truncate(movie?.overview, 100)}
                    </p>
                </div>

                <div className="banner--fadeBottom"/>
            </header>
        );
    }
}

export default Banner;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 100vh;
`;

const HomeContainer = styled.div`
  width: 100%;
  height: 100%;
`;

const Iframe = styled.iframe`
  width: 100%;
  height: 100%;
  z-index: -1;
  opacity: 0.5;
  border: none;

  &:after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
`;