import { Link } from "react-router-dom";
import enolaHolmes from "./../../assets/enola-holmes.png";

export default function Sessions(args) {
  return (
    <main id="movie">
      <h4>Selecione o horário</h4>
      <section className="schedule">
        <p className="schedule__date">Quinta-feira - 24/06/2022</p>
        <Link to="/session" className="schedule__time-option">
          15:00
        </Link>
        <Link to="/session" className="schedule__time-option">
          19:00
        </Link>
      </section>
      <section className="schedule">
        <p className="schedule__date">Sexta-feira - 25/06/2022</p>
        <Link to="/session" className="schedule__time-option">
          16:00
        </Link>
        <Link to="/session" className="schedule__time-option">
          20:00
        </Link>
      </section>
      <figure className="selected-movie">
        <img src={enolaHolmes} alt="Enola Holmes movie poster miniature" />
        <figcaption>Enola Holmes</figcaption>
      </figure>
    </main>
  );
}
