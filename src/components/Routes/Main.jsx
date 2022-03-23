import { Link } from "react-router-dom";

import scifiMovie from "./../../assets/scifi-movie";
import enolaHolmes from "./../../assets/enola-holmes";

export default function Main() {
  return (
    <main id="main">
      <h4>Selecione o filme</h4>
      <section>
        <article className="movie-poster">
          <Link to="/session">
            <img src={scifiMovie} alt="2067 movie poster" />
          </Link>
        </article>
        <article className="movie-poster">
          <Link to="/session">
            <img src={enolaHolmes} alt="Enola Holmes movie poster" />
          </Link>
        </article>
        <article className="movie-poster">
          <Link to="/session">
            <img src={scifiMovie} alt="2067 movie poster" />
          </Link>
        </article>
        <article className="movie-poster">
          <Link to="/session">
            <img src={enolaHolmes} alt="Enola Holmes movie poster" />
          </Link>
        </article>
        <article className="movie-poster">
          <Link to="/session">
            <img src={scifiMovie} alt="2067 movie poster" />
          </Link>
        </article>
        <article className="movie-poster">
          <Link to="/session">
            <img src={enolaHolmes} alt="Enola Holmes movie poster" />
          </Link>
        </article>
        <article className="movie-poster">
          <Link to="/session">
            <img src={scifiMovie} alt="2067 movie poster" />
          </Link>
        </article>
        <article className="movie-poster">
          <Link to="/session">
            <img src={enolaHolmes} alt="Enola Holmes movie poster" />
          </Link>
        </article>
      </section>
    </main>
  );
}
