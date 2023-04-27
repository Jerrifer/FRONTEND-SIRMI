import React, { useRef } from "react";
import "./calendar.css"

function Day({ i, dia, selectedDays, handleDayClick }) {

  const dayRef = useRef(0);
  const designatedDays = Object.values(selectedDays);
  const isDesignatedDay = designatedDays.includes(dia);

  const holidays = [1, 22]
  const isHolidays = holidays.includes(dia);


  return (
    <>
      <td className="days" key={i}>
        <span
          ref={dayRef}
          key={dia}
          onClick={() => {
            handleDayClick(dia);
          }}
          className={`day ${isHolidays ? " disabled holiday" : isDesignatedDay ? "designated" : ""}`}
        >
          {dia}
        </span>
      </td>
    </>
  );
}

export default Day;