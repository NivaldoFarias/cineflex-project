import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Main() {
  const [movies, setMovies] = useState(null);

  useEffect(() => {
    const request = axios.get(
      "https://mock-api.driven.com.br/api/v5/cineflex/movies"
    );

    request.then((resposta) => {
      setMovies(resposta.data);
      console.log(resposta.data);
    });
    request.catch((err) => {
      console.error(err);
    });
  }, []);

  if (movies === null) {
    return (
      <div className="loading-spinner">
        <div className="spinner">
          <div className="ripple primary"></div>
          <div className="ripple secondary"></div>
        </div>
      </div>
    );
  } else {
    return (
      <main id="main">
        <h4>Selecione o filme</h4>
        <section>
          {movies.map((movie, index) => {
            // eslint-disable-next-line no-unused-vars
            const { id, title, posterURL, overview, releaseDate } = movie;

            return (
              <article key={index} className="movie-poster">
                <Link to={`/movie/${id}`}>
                  <img src={posterURL} alt={`${title} movie poster`} />
                </Link>
              </article>
            );
          })}
        </section>
      </main>
    );
  }
}
