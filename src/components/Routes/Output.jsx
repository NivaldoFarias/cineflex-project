import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Output() {
  const location = useLocation();
  const navigate = useNavigate();
  const {
    seatsData: {
      movie: { title, posterURL, overview },
      day: { weekday, date },
      name,
    },
    userData: { ids, compradores },
  } = location.state;
  const [collapsed, setCollapsed] = useState(true);

  function handleClick() {
    navigate(-1);
  }

  return (
    <>
      <ion-icon
        onClick={handleClick}
        class="return-btn"
        name="chevron-back-outline"
      ></ion-icon>
      <main id="output">
        <h4>Pedido feito com sucesso!</h4>
        <section className="output-movie">
          <div className="output-movie__intro">
            <p>Filme e sessão</p>
            <ion-icon name="film-outline"></ion-icon>
          </div>
          <div className="output-movie__data">
            <p>{title}</p>
            <p>
              {weekday}, {date} às {name}
            </p>
          </div>
        </section>
        {compradores.length === 1 ? (
          <>
            <section className="output-bookings">
              <div className="output-bookings__intro">
                <p>Ingressos</p>
                {ids.length > 1 ? (
                  <ion-icon name="bookmarks-outline"></ion-icon>
                ) : (
                  <ion-icon name="bookmark-outline"></ion-icon>
                )}
              </div>
              <div className="output-bookings__data">
                {ids.map((id, index) => {
                  return (
                    <div key={index} className="seats">
                      <p>Assento</p>
                      <div className="seat-option selected">
                        {id % 50 === 0 ? 50 : id % 50}
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
            <section className="output-buyer">
              <div className="output-buyer__intro">
                <p>Comprador</p>
                <ion-icon name="person-outline"></ion-icon>
              </div>
              <div className="output-buyer__data">
                <p>
                  Nome: <span>{compradores[0].nome}</span>
                </p>
                <p>
                  CPF: <span>{formatCpf(compradores[0].cpf)}</span>
                </p>
              </div>
            </section>
          </>
        ) : (
          <>
            <section className="output-tickets">
              <div className="output-tickets__intro">
                <p>Ingressos</p>
                <ion-icon name="pricetags-outline"></ion-icon>
              </div>
              {compradores.map((comprador, index) => {
                const { idAssento, nome, cpf } = comprador;
                return (
                  <div key={index} className="output-tickets__ticket">
                    <div className="seat">
                      <p>Assento</p>
                      <div className="seat-option selected">
                        {idAssento % 50 === 0 ? 50 : idAssento % 50}
                      </div>
                    </div>
                    <div className="buyer">
                      <p>
                        Nome: <span>{nome}</span>
                      </p>
                      <p>
                        CPF: <span>{formatCpf(cpf)}</span>
                      </p>
                    </div>
                  </div>
                );
              })}
            </section>
          </>
        )}
        <section className="btn-container">
          <Link to="/" className="btn-container__home-btn">
            Voltar pra home
          </Link>
          <span className="bar"></span>
        </section>
        <figure className="output-display">
          <div
            className={
              collapsed ? "image-container" : "image-container collapsed"
            }
          >
            <img src={posterURL} alt={`${title} movie poster miniature`} />
            <div className="info-widget">
              <ion-icon
                onClick={() => setCollapsed(!collapsed)}
                name="information-circle-outline"
              ></ion-icon>
            </div>
          </div>
          <figcaption className={collapsed ? "collapsed" : ""}>
            {overview}
          </figcaption>
        </figure>
      </main>
    </>
  );

  function formatCpf(str) {
    let newStr = "";
    for (let i = 0; i < str.length; i++) {
      if (i === 3 || i === 6) {
        newStr += ".";
      } else if (i === 9) {
        newStr += "-";
      }
      newStr += str[i];
    }
    return newStr;
  }
}
