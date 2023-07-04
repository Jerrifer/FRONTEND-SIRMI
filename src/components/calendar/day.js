import React, { useRef } from "react";
import "./calendar.css"
// import { UncontrolledTooltip } from "reactstrap";

function Day({ i, dia, holidays, selectedWeekDays, selectedDays, handleDayClick }) {

  const dayRef = useRef(0);
  const designatedDays = Object.values(selectedDays);
  const isDesignatedDay = designatedDays.includes(dia);
  const isDisabledDays = selectedWeekDays.includes(i);
  const isHolidays = holidays.includes(dia);

  // var encontrado = false;

// // Iterar los dípas festivos
// for (var j = 0; j < holidays.length; j++) {
//   // Comprobar si el día se encuentra en el atributo 'number'
//   if (holidays[j].day === dia) {
//     encontrado = true;
//     break; // Si se encuentra, se puede detener el bucle
//   }
// }

  return (
    <>
      <td className="days" key={i}>
          {/* {
            encontrado?
            <UncontrolledTooltip
            delay={0}
            target={"day"+i}
          >
            {holidays[j].name}
          </UncontrolledTooltip>
          : <></>
          } */}
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