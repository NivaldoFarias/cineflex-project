import { Link, useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

import { Seat } from "./Seat";
import { Footer } from "./Footer";

export default function Sessions() {
  const { sessionID } = useParams();
  const navigate = useNavigate();

  const GET_URL = `https://mock-api.driven.com.br/api/v5/cineflex/showtimes/${sessionID}/seats`;
  const POST_URL =
    "https://mock-api.driven.com.br/api/v5/cineflex/seats/book-many";

  const [seatsData, setSeatsData] = useState(null);
  const [userData, setUserData] = useState({
    ids: [],
    nome: "",
    cpf: "",
  });

  // CONDITIONALS
  const isCpfValid =
    (userData.cpf.length === 0 || isNumber(userData.cpf)) &&
    userData.cpf.length <= 11;
  const isNameValid = !isNumber(userData.nome) || userData.nome.length === 0;

  // CHECK INPUT TERNARIES
  const alertCpf = isCpfValid ? "alert-text invisible" : "alert-text";
  const alertName = isNameValid ? "alert-text invisible" : "alert-text";

  useEffect(() => {
    const request = axios.get(GET_URL);

    request.then((response) => {
      setSeatsData({ ...response.data });
      console.log(response.data);
    });
    request.catch((err) => {
      console.error(err);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sessionID]);

  function isInputValid() {
    return isCpfValid &&
      userData.cpf.length === 11 &&
      isCpfValid &&
      userData.nome.length > 0 &&
      userData.ids.length > 0
      ? "default-btn"
      : "default-btn disabled";
  }

  function updateSelectedSeats(seatID) {
    if (seatID !== undefined) {
      if (userData.ids.includes(seatID)) {
        setUserData({
          ...userData,
          ids: [...userData.ids.filter((seat) => !(seat === seatID))],
        });
      } else {
        setUserData({
          ...userData,
          ids: [...userData.ids, seatID],
        });
      }
    }
  }

  function isNumber(num) {
    return !isNaN(parseFloat(num)) && isFinite(num);
  }

  function submitData(event) {
    event.preventDefault();

    const request = axios.post(POST_URL, {
      ids: userData.ids,
      nome: userData.nome,
      cpf: userData.cpf,
    });
    request.then((response) => {
      console.log(response.data);
      navigate("/output", { state: { seatsData, userData } });
    });
    request.catch((error) => console.log(error));
  }

  if (seatsData === null) {
    return <p>Carregando...</p>;
  } else {
    return (
      <main id="session">
        <h4>Selecione o(s) assento(s)</h4>
        <section className="seats-grid">
          {seatsData.seats.map((seat, index) => (
            <Seat
              key={index}
              seatData={seat}
              updateSelectedSeats={updateSelectedSeats}
            ></Seat>
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
            <p className={alertName}>Insira um nome válido</p>
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
            <p className={alertCpf}>Insira um CPF válido</p>
          </div>
        </section>
        <div className={isInputValid()} onClick={submitData}>
          Reservar assento(s)
        </div>
        <Footer
          sessions={seatsData.movie}
          date={seatsData.day.weekday}
          hour={seatsData.name}
        ></Footer>
      </main>
    );
  }
}
