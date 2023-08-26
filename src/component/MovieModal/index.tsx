import React, {useRef} from 'react';
import "./MovieModal.css";
import {Movie} from "../Banner";
import useOnClickOutside from "../../hooks/useOnClickOutside";

const MovieModal = (movie: Movie) => {

    const ref = useRef<HTMLDivElement | null>(null);
    // console.log('ref', ref.current);

    useOnClickOutside(ref, ()=>{
        movie.setModalOpen(false);
    })
    return (
        <div className='presentation' role="presentation">
            <div className='wrapper-modal'>
                <div className='modal' ref={ref}>
                <span
                    onClick={() => movie.setModalOpen(false)}
                    className='modal-close'
                >
                    X
                </span>

                    <img
                        className='modal__poster-img'
                        src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
                        alt="modal-img"
                    />

                    <div className='modal__content'>
                        <p className='modal__details'>
                            <span className='modal__user_perc'>100% for you</span>{" "}
                            {movie.release_date ? movie.release_date : movie.first_air_date}
                        </p>

                        <h2 className='modal__title'>{movie.title ? movie.title : movie.name}</h2>
                        <p className='modal__overview'>평점: {movie.vote_average}</p>
                        <p className='modal__overview'>{movie.overview}</p>

                    </div>
                </div>
            </div>

        </div>
    )
}

export default MovieModal;