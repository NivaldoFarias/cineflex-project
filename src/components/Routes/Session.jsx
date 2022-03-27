import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

import { Seat } from "./Seat";
import { Footer } from "./Footer";
import Buyer from "./Buyer";

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

  function handleClick() {
    navigate(-1);
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

  function submitData(event) {
    event.preventDefault();

    const request = axios.post(POST_URL, {
      ids: userData.ids,
      compradores: userData.compradores,
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
              <Buyer
                key={index}
                id={id}
                index={index}
                userData={userData}
                setUserData={setUserData}
                validateName={validateName}
                validateCpf={validateCpf}
                indexOfID={indexOfID}
              ></Buyer>
            );
          })}
          <div className={validateAllInputs()} onClick={submitData}>
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

  function validateName(id) {
    const user = userData.compradores[indexOfID(id)];
    return user === undefined || !hasNumber(user.nome) || user.nome.length === 0
      ? "alert-text invisible"
      : "alert-text";
  }

  function validateCpf(id) {
    const user = userData.compradores[indexOfID(id)];
    return user === undefined ||
      user.cpf === undefined ||
      user.cpf.length === 0 ||
      (user.cpf.length <= 11 && isNumber(user.cpf))
      ? "alert-text invisible"
      : "alert-text";
  }

  function indexOfID(id) {
    return userData.compradores.findIndex((user) => user.idAssento === id);
  }

  function isNumber(num) {
    return !isNaN(parseFloat(num)) && isFinite(num);
  }

  function validateAllInputs() {
    const buyers = userData.compradores;
    if (buyers.length > 0) {
      return buyers.every((buyer) => {
        return (
          buyer.cpf !== undefined &&
          buyer.nome !== undefined &&
          !hasNumber(buyer.nome) &&
          buyer.cpf.length === 11 &&
          isNumber(buyer.cpf)
        );
      })
        ? "default-btn"
        : "default-btn disabled";
    }
    return "default-btn disabled";
  }

  function hasNumber(myString) {
    return /\d/.test(myString);
  }
}
