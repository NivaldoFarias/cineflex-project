export default function Buyer(props) {
  const {
    index,
    id,
    userData,
    setUserData,
    validateName,
    validateCpf,
    indexOfID,
  } = props;

  return (
    <section key={index} className="user-inputs">
      <p className="seat-number">Assento {id % 50 === 0 ? 50 : id % 50}</p>
      <div className="user-inputs__group">
        <input
          type="text"
          maxLength={25}
          value={userData.compradores[indexOfID(id)].nome || ""}
          onChange={(e) => {
            userData.compradores[indexOfID(id)].nome = e.target.value;
            setUserData({ ...userData });
          }}
          required
        />
        <span className="highlight"></span>
        <span className="bar"></span>
        <label>Nome</label>
        <p className={validateName(id)}>Insira um nome válido</p>
      </div>
      <div className="user-inputs__group">
        <input
          type="text"
          maxLength={11}
          value={userData.compradores[indexOfID(id)].cpf || ""}
          onChange={(e) => {
            userData.compradores[indexOfID(id)].cpf = e.target.value;
            setUserData({ ...userData });
          }}
          required
        />
        <span className="highlight"></span>
        <span className="bar"></span>
        <label>CPF</label>
        <p className={validateCpf(id)}>Insira um CPF válido</p>
      </div>
    </section>
  );
}
