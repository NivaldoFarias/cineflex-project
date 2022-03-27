import { Link, useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

import { Footer } from "./Footer";

export default function Sessions() {
  const { movieID } = useParams();
  const navigate = useNavigate();

  const [sessions, setSessions] = useState(null);

  function handleClick() {
    navigate(-1);
  }

  useEffect(() => {
    const request = axios.get(
      `https://mock-api.driven.com.br/api/v5/cineflex/movies/${movieID}/showtimes`
    );

    request.then((resposta) => {
      setSessions({ ...resposta.data });
      console.log(resposta.data);
    });
    request.catch((err) => {
      console.error(err);
    });
  }, [movieID]);

  if (sessions === null) {
    return <p>Carregando...</p>;
  } else {
    return (
      <>
        <ion-icon
          onClick={handleClick}
          class="return-btn"
          name="chevron-back-outline"
        ></ion-icon>
        <main id="movie">
          <h4>Selecione o horário</h4>
          {sessions.days.map((session, index) => {
            const {
              // eslint-disable-next-line no-unused-vars
              id,
              weekday,
              date,
              showtimes: [firstOption, secondOption],
            } = session;

            return (
              <section key={index} className="schedule">
                <p className="schedule__date">{`${weekday} ${date}`}</p>
                <Link
                  to={`/session/${firstOption.id}`}
                  className="schedule__time-option default-btn"
                >
                  {firstOption.name}
                </Link>
                <Link
                  to={`/session/${secondOption.id}`}
                  className="schedule__time-option default-btn"
                >
                  {secondOption.name}
                </Link>
              </section>
            );
          })}

          <Footer sessions={sessions}></Footer>
        </main>
      </>
    );
  }
}
