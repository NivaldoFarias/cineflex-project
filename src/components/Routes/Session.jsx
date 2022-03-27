import { useParams, useNavigate } from "react-router-dom";
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
    compradores: [],
  });

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

  function alertName(id) {
    return !isNumber(userData.compradores[findID(id)].nome) ||
      userData.compradores[findID(id)].nome.length === 0
      ? "alert-text invisible"
      : "alert-text";
  }

  function alertCpf(id) {
    return userData.compradores[findID(id)].cpf &&
      (userData.compradores[findID(id)].cpf.length === 0 ||
        isNumber(userData.compradores[findID(id)].cpf)) &&
      userData.compradores[findID(id)].cpf.length <= 11
      ? "alert-text invisible"
      : "alert-text";
  }

  function findID(id) {
    return userData.compradores.findIndex((user) => user.idAssento === id);
  }

  function handleClick() {
    navigate(-1);
  }

  function isInputValid() {
    return userData.compradores.length === userData.ids.length
      ? "default-btn"
      : "default-btn disabled";
  }

  function updateSelectedSeats(seatID) {
    if (seatID !== undefined) {
      if (userData.ids.includes(seatID)) {
        setUserData({
          ...userData,
          ids: [...userData.ids.filter((seat) => !(seat === seatID))],
          compradores: [
            ...userData.compradores.filter(
              (user) => !(user.idAssento === seatID)
            ),
          ],
        });
      } else {
        setUserData({
          ...userData,
          ids: [...userData.ids, seatID],
          compradores: [
            ...userData.compradores,
            {
              idAssento: seatID,
            },
          ],
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
      <>
        <ion-icon
          onClick={handleClick}
          class="return-btn"
          name="chevron-back-outline"
        ></ion-icon>
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
          {userData.ids.map((id, index) => {
            return (
              <section key={index} className="user-inputs">
                <p className="seat-number">
                  Assento {id % 50 === 0 ? 50 : id % 50}
                </p>
                <div className="user-inputs__group">
                  <input
                    type="text"
                    value={userData.compradores[findID(id)].nome}
                    onChange={(newInput) => {
                      setUserData({
                        ...userData,
                        compradores: [
                          ...userData.compradores,
                          (userData.compradores[findID(id)] = {
                            ...userData.compradores[findID(id)],
                            nome: newInput.target.value,
                          }),
                        ],
                      });
                    }}
                    required
                  />
                  <span className="highlight"></span>
                  <span className="bar"></span>
                  <label>Nome</label>
                  <p className={alertName(id)}>Insira um nome válido</p>
                </div>
                <div className="user-inputs__group">
                  <input
                    type="text"
                    value={userData.compradores[findID(id)].cpf}
                    onChange={(newInput) => {
                      setUserData({
                        ...userData,
                        compradores: [
                          ...userData.compradores,
                          (userData.compradores[findID(id)] = {
                            ...userData.compradores[findID(id)],
                            cpf: newInput.target.value,
                          }),
                        ],
                      });
                    }}
                    required
                  />
                  <span className="highlight"></span>
                  <span className="bar"></span>
                  <label>CPF</label>
                  <p className={alertCpf(id)}>Insira um CPF válido</p>
                </div>
              </section>
            );
          })}

          {/* <section className="user-inputs">
            <p className="seat-number">Assento 15</p>
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
          </section> */}
          <div className={isInputValid()} onClick={submitData}>
            Reservar assento(s)
          </div>
          <Footer
            sessions={seatsData.movie}
            date={seatsData.day.weekday}
            hour={seatsData.name}
          ></Footer>
        </main>
      </>
    );
  }
}
