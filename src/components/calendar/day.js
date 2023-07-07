import React, { useRef } from "react";
import "./calendar.css"
// import { UncontrolledTooltip } from "reactstrap";

function Day({ i, dia, holidays, selectedWeekDays, selectedDays, handleDayClick }) {

  const dayRef = useRef(0);
  const designatedDays = Object.values(selectedDays);
  const isDesignatedDay = designatedDays.includes(dia);
  const isDisabledDays = selectedWeekDays.includes(i);
  const isHolidays = holidays.includes(dia);
  return (
    <>
      <td className="days" key={i}>
        <span
          id={"day"+i}
          ref={dayRef}
          key={dia}
          onClick={() => {
            handleDayClick(dia, i);
          }}
          className={`day ${isHolidays ? "disabled holiday" : !isDisabledDays ? "disabled disabledday": isDesignatedDay ? "designated" : ""}`}
        >
          {dia}
        </span>
      </td>
    </>
  );
}

export default Day;