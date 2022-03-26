import { useLocation } from "react-router-dom";

export default function Output() {
  const location = useLocation();
  const {
    seatsData: {
      movie: { title, posterURL, overview },
      day: { weekday, date },
      name,
    },
    userData: { ids, nome, cpf },
  } = location.state;

  return (
    <main id="output">
      <h4>Pedido feito com sucesso!</h4>
      <section>
        <p>Filme e sessão</p>
        <div className="output__movie">
          <p>{title}</p>
          <p>
            {weekday} {date} {name}
          </p>
          <ion-icon name="calendar-outline"></ion-icon>
        </div>
      </section>
      <section>
        <p>Ingressos</p>
        <div className="output__movie">
          <p>Assento</p>
          <div className="seat-option selected"></div>
          <p>Assento</p>
          <div className="seat-option selected">16</div>
        </div>
      </section>
    </main>
  );
}
