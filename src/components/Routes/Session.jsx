let seatsData = [];
for (let i = 1; i < 51; i++) {
  if (i < 10) seatsData.push(`0${i}`);
  else seatsData.push(i);
}

export default function Sessions() {
  return (
    <main id="session">
      <h4>session</h4>
      <section className="seats-grid">
        {seatsData.map((seat, index) => (
          <div key={index} className="seats-grid__seat-option">
            {seat}
          </div>
        ))}
      </section>
    </main>
  );
}
