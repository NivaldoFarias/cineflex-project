import { useState } from "react";

export function Seat(props) {
  const { seatData } = props;
  const [selected, setSelected] = useState(false);
  let css;

  if (selected && seatData.isAvailable) css = "seat-option selected";
  else if (!seatData.isAvailable) css = "seat-option unavailable selected";
  else css = "seat-option";

  return (
    <div className={css} onClick={() => setSelected(!selected)}>
      {seatData.name}
    </div>
  );
}
