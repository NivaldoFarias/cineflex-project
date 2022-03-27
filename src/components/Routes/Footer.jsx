export function Footer(props) {
  const {
    sessions: { title, posterURL },
    date,
    hour,
  } = props;

  return (
    <footer className="selected-movie">
      <div className="container">
        <img src={posterURL} alt={`${title} movie poster miniature`} />
        <div className="overview">
          <p>{title}</p>
          {date ? <p>{`${date} - ${hour}`}</p> : null}
        </div>
      </div>
    </footer>
  );
}
