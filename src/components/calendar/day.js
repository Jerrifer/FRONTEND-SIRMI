import React, { useRef } from "react";

function Day({i, dia, handleDayClick}) {
    
  const dayRef = useRef(0);

  return (
    <>
      <td className="days" key={i}>
        <span
          ref={dayRef}
          key={dia}
          onClick={() => {handleDayClick(dia)}}
          className="day"
        >
          {dia}
        </span>
      </td>
    </>
  );
}

export default Day;
