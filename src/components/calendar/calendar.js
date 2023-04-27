import React, { useEffect, useState } from "react";
import "./calendar.css";
import Day from "./day";
import colombianHolidays from "colombian-holidays";
import moment from "moment";

const meses = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
];
const dias_semana = ["Domingo", "Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado"];

function Calendar({selectedDays, handleDayClick}) {

  const year = new Date().getFullYear()
//   const [month, setMonth] = useState(new Date().getMonth());
  const [num_dias, setNumDias] = useState(0);
  const [primer_dia_semana, setPrimerDiaSemana] = useState(0);

  const month = 2
  
  useEffect(() => {
    // Número de días que tiene el mes
    if (month === 1) {
      //Mes de Febrero
      if (year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0)) {
        setNumDias(29);
      } else {
        setNumDias(28);
      }
    } else if ([3, 5, 8, 10].includes(month)) {
      // Meses con 30 días
      setNumDias(30);
    } else {
      // Meses con 31 días
      setNumDias(31);
    }

    // Calcular el día de la semana en el que cae el primer día del mes
    const primer_dia_mes = new Date(year, month, 1);
    setPrimerDiaSemana(primer_dia_mes.getDay());
  }, [year, month]);
  
  const holidaysColombian = colombianHolidays({
    year: year,
    month: month+1,
  });

  let holidays = []
  holidaysColombian.map(holiday => {
    let fecha = moment(holiday.celebrationDate)
    var dia = fecha.date();
    return (
      holidays.push(dia)
    )
    
  })

  // Filas para los días del mes
  let dia = 1;
  const filas = [];
  while (dia <= num_dias) {
    const celdas = [];
    for (let i = 0; i < 7; i++) {
      if (i < primer_dia_semana && dia === 1) {
        // Celdas vacías antes del primer día del mes
        celdas.push(<td className="days" key={i}></td>);
      } else if (dia <= num_dias) {
        // Celdas con los días del mes
        celdas.push(<Day i={i} dia={dia} holidays={holidays} selectedDays={selectedDays} handleDayClick={handleDayClick}/>);
        dia++;
      } else {
        // Celdas vacías después del último día del mes
        celdas.push(<td className="days" key={i}></td>);
      }
    }
    filas.push(<tr className="row-days" key={dia}>{celdas}</tr>);
  }

  return (
    <div className="calendar">
      <div className="header">
        <span className="month">{meses[month]}</span>
        <span className="year">{year}</span>
      </div>
      <table className="week">
        <thead >
          <tr className="weekdays" >
            {dias_semana.map((dia) => (
              <th className="weekday text-center" key={dia}>{dia}</th>
            ))}
          </tr>
        </thead>
        <tbody>{filas}</tbody>
      </table>
    </div>

   
  );
}

export default Calendar;
