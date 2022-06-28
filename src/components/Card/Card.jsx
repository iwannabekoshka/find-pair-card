import React, { useState } from "react";
import s from "./Card.module.scss";

function Card(props) {
  const cardClasses = `${s.card} ${props.active ? s.active : ""}`;

  return (
    <div className={cardClasses} onClick={props.onClick}>
      <div className={s.back} style={{ "--bg": props.bg || "" }}>
        {props.text}
      </div>
      <div className={s.front}>Turn me on</div>
    </div>
  );
}

export default Card;
