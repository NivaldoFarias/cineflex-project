import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

import { Seat } from "./Seat";
import { Footer } from "./Footer";

export default function Sessions() {
  const { sessionID } = useParams();

  const [seatsData, setSeatsData] = useState(null);
  const [userData, setUserData] = useState({
    nome: "",
    cpf: "",
  });

  useEffect(() => {
    const request = axios.get(
      `https://mock-api.driven.com.br/api/v5/cineflex/showtimes/${sessionID}/seats`
    );

    request.then((resposta) => {
      setSeatsData({ ...resposta.data });
      console.log(resposta.data);
    });
    request.catch((err) => {
      console.error(err);
    });
  }, [sessionID]);

  useEffect(() => {
    console.log(userData);
  }, [userData]);

  if (seatsData === null) {
    return <p>Carregando...</p>;
  } else {
    return (
      <main id="session">
        <h4>Selecione o(s) assento(s)</h4>
        <section className="seats-grid">
          {seatsData.seats.map((seat, index) => (
            <Seat key={index} seatData={seat}></Seat>
          ))}
        </section>
        <section className="seat-examples">
          <div className="seat-examples__selected">
            <div className="seat-option selected"></div>
            <p>Selecionado</p>
          </div>
          <div className="seat-examples__available">
            <div className="seat-option"></div>
            <p>Disponível</p>
          </div>
          <div className="seat-examples__unavailable">
            <div className="seat-option selected unavailable"></div>
            <p>Indisponível</p>
          </div>
        </section>
        <section className="user-inputs">
          <div className="user-inputs__group">
            <input
              type="text"
              value={userData.nome}
              onChange={(newInput) =>
                setUserData({ ...userData, nome: newInput.target.value })
              }
              required
            />
            <span className="highlight"></span>
            <span className="bar"></span>
            <label>Nome</label>
          </div>

          <div className="user-inputs__group">
            <input
              type="text"
              value={userData.cpf}
              onChange={(newInput) =>
                setUserData({ ...userData, cpf: newInput.target.value })
              }
              required
            />
            <span className="highlight"></span>
            <span className="bar"></span>
            <label>CPF</label>
          </div>
        </section>
        <Link to="/output" className="default-btn disabled">
          Reservar assento(s)
        </Link>
        <Footer
          sessions={seatsData.movie}
          date={seatsData.day.weekday}
          hour={seatsData.name}
        ></Footer>
      </main>
    );
  }
}
