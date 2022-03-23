import { Link } from "react-router-dom";

import scifiMovie from "./../../assets/scifi-movie.png";
import enolaHolmes from "./../../assets/enola-holmes.png";

export default function Main() {
  return (
    <main id="main">
      <h4>Selecione o filme</h4>
      <section>
        <article className="movie-poster">
          <Link to="/movie">
            <img src={scifiMovie} alt="2067 movie poster" />
          </Link>
        </article>
        <article className="movie-poster">
          <Link to="/movie">
            <img src={enolaHolmes} alt="Enola Holmes movie poster" />
          </Link>
        </article>
        <article className="movie-poster">
          <Link to="/movie">
            <img src={scifiMovie} alt="2067 movie poster" />
          </Link>
        </article>
        <article className="movie-poster">
          <Link to="/movie">
            <img src={enolaHolmes} alt="Enola Holmes movie poster" />
          </Link>
        </article>
        <article className="movie-poster">
          <Link to="/movie">
            <img src={scifiMovie} alt="2067 movie poster" />
          </Link>
        </article>
        <article className="movie-poster">
          <Link to="/movie">
            <img src={enolaHolmes} alt="Enola Holmes movie poster" />
          </Link>
        </article>
        <article className="movie-poster">
          <Link to="/movie">
            <img src={scifiMovie} alt="2067 movie poster" />
          </Link>
        </article>
        <article className="movie-poster">
          <Link to="/movie">
            <img src={enolaHolmes} alt="Enola Holmes movie poster" />
          </Link>
        </article>
      </section>
    </main>
  );
}
