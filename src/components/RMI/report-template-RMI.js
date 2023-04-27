/* eslint-disable no-script-url */
// import "./styles.css";
import logo_sena from "assets/img/sena_logo.png";
import './styles.css'
import moment from "moment";
import colombianHolidays from "colombian-holidays";
import Day from "components/calendar/day";
import { useEffect, useState } from "react";



// const meses = [
//   "Enero",
//   "Febrero",
//   "Marzo",
//   "Abril",
//   "Mayo",
//   "Junio",
//   "Julio",
//   "Agosto",
//   "Septiembre",
//   "Octubre",
//   "Noviembre",
//   "Diciembre",
// ];
// const dias_semana = ["Domingo", "Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado"];



const ReportTemplateRMI = ({ user, rmi, othersActivities }) => {
  let totalHoras = 0;
  for (let i = 0; i < rmi.length; i++) {
    totalHoras += rmi[i].duration;
  }

  let totalHorasOtherActivities = 0;
  for (let i = 0; i < othersActivities.length; i++) {
    totalHorasOtherActivities += othersActivities[i].duration;
  }


  
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

  const selectedDays = [1,2,3]

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
        celdas.push(<Day i={i} dia={dia} holidays={holidays} selectedDays={selectedDays} />);
        dia++;
      } else {
        // Celdas vacías después del último día del mes
        celdas.push(<td className="days" key={i}></td>);
      }
    }
    filas.push(<tr className="row-days" key={dia}>{celdas}</tr>);
  }

  return (
    <div className="contenedor">
    <table>
      <thead>
        <tr className="row0">
          <td className="column0">&nbsp;</td>
          <td className="column1 style60 s style65" colSpan="4" rowSpan="3">
            <img src={logo_sena} style={{ width: "60px" }} alt="" />
          </td>
          <td className="column5 style70 s style72" colSpan="17">
            REPORTE MENSUAL DEL INSTRUCTOR - RMI
          </td>
          <td className="column21 style145 s style148" colSpan="2" rowSpan="6">
            Únicamente formación complementaria
          </td>
          <td className="column23">&nbsp;</td>
        </tr>
        <tr className="row1">
          <td className="column0">&nbsp;</td>
          <td className="column6 style69 s style69" rowSpan="5">
            {user.month}
          </td>
          <td className="column6 style69 s style69" colSpan="7">
            NOMBRE
          </td>
          <td className="column14 style81 s style82" colSpan="9">
            CORREO ELECTRÓNICO
          </td>
          <td className="column23">&nbsp;</td>
        </tr>
        <tr className="row2">
          <td className="column0">&nbsp;</td>
          <td className="column6 style40 s style40" colSpan="7">
            {user.name}
          </td>
          <td className="column14 style84 s style86" colSpan="9">
            <i style={{cursor: 'pointer'}} title="">
              {user.email}
            </i>
          </td>
          <td className="column23">&nbsp;</td>
        </tr>
        <tr className="row3">
          <td className="column0">&nbsp;</td>
          <td className="column1 style93 s style98" colSpan="4" rowSpan="3">
            {user.trainingCenter}
          </td>
          <td className="column6 style69 s style69" colSpan="7">
            CÉDULA
          </td>
          <td className="column14 style87 s style88" colSpan="9">
            NUMERO DE CONTACTO
          </td>
          <td className="column23">&nbsp;</td>
        </tr>
        <tr className="row4">
          <td className="column0">&nbsp;</td>
          <td className="column6 style40 n style40" colSpan="7">
            {user.identification}
          </td>
          <td className="column14 style53 n style54" colSpan="9">
            {user.cellPhone}
          </td>
          <td className="column23">&nbsp;</td>
        </tr>
        <tr className="row5">
          <td className="column0">&nbsp;</td>
          <td className="column6 style41 null style41" colSpan="7"></td>
          <td className="column14 style42 null style43" colSpan="9"></td>
          <td className="column23">&nbsp;</td>
        </tr>
        <tr className="row6">
          <td className="column0">&nbsp;</td>
          <td className="column1 style92 null style92" colSpan="20"></td>
          <td className="column21">&nbsp;</td>
          <td className="column22">&nbsp;</td>
          <td className="column23">&nbsp;</td>
          
        </tr>
        <tr className="row7">
          <td className="column0 style48 s style49" rowSpan="2">
            No
          </td>
          <td className="column1 style48 s style49" rowSpan="2">
            No. FICHA
          </td> 
          <td className="column2 style50 s style51" rowSpan="2">
            PROGRAMA DE FORMACIÓN
          </td>
          <td className="column2 style50 s style51" rowSpan="2">
            ACTIVIDAD
          </td>
          <td className="column4 style50 s style51" rowSpan="2">
            COMPETENCIA
          </td>
          <td className="column5 style50 s style51" rowSpan="2">
            RESULTADO APRENDIZAJE
          </td>
          <td className="column6 style57 s style58" rowSpan="2">
            FECHA TERMINACIÓN RESULTADO DE APRENDIZAJE
          </td>
          <td className="column7 style99 s style101" colSpan="7">
            HORARIO
            <br />
            Formato 24 horas
          </td>
          <td className="column14 style89 s style91" colSpan="7">
            {user.month}
          </td>
          <td className="column20 style102 s style103" rowSpan="2">
            HORAS <br />
            MES
          </td>
          <td className="column21 style153 s style154" rowSpan="2">
            Duración Curso
          </td>
          <td className="column22 style153 s style154" rowSpan="2">
            Días de Programación del curso
          </td>
          <td className="column23">&nbsp;</td>
        </tr>
        <tr className="row8">
          <td className="column7 style9 s">L</td>
          <td className="column8 style4 s">M</td>
          <td className="column9 style4 s">M</td>
          <td className="column10 style4 s">J</td>
          <td className="column11 style4 s">V</td>
          <td className="column12 style5 s">S</td>
          <td className="column13 style10 s">D</td>
          <td className="column14 style7 s">L</td>
          <td className="column15 style3 s">M</td>
          <td className="column16 style3 s">M</td>
          <td className="column17 style3 s">J</td>
          <td className="column18 style3 s">V</td>
          <td className="column19 style8 s">S</td>
          <td className="column13 style10 s">D</td>
          <td className="column23">&nbsp;</td>
        </tr>
      </thead>
      <tbody>
        {rmi.map((e, index) => (
          <>
            <tr className="row9">
              <td className="column0 style47 n style46 gf" rowSpan="5">
                {index + 1}
              </td>
              <td className="column1 style47 n style46 gf" rowSpan="5">
                {e.ficha}
              </td>
              <td className="column2 style59 s style36 gf" rowSpan="5">
                {e.trainingProgram}
              </td>
              <td className="column3 style59 s style36 gf" rowSpan="5">
                {e.activity}
              </td>
              <td className="column4 style83" rowSpan="5">
                {e.competences.map((competence) => (
                  <div
                    key={competence._id}
                    className="gf-competence"
                    rowSpan="5"
                  >
                    {competence.name}
                  </div>
                ))}
              </td>

              <td className="column5 style74 s style76" rowSpan="5">
                {e.competences.map((element) =>
                  element.learningResults.map((result) => (
                    <div key={result._id} className="gf" rowSpan="5">
                      {result.name}
                    </div>
                  ))
                )}
              </td>
              <td className="column5 style74 s style76" rowSpan="5">
                {e.competences.map((element) =>
                  element.learningResults.map((result) => (
                    <div key={result._id} className="gf" rowSpan="5">
                      {result.endDatelearningResult}
                    </div>
                  ))
                )}
              </td>

              {e.schedules.map((schedule) => (
                <td className=" style44 schedule" rowSpan="5">
                  {schedule.date}
                </td>
              ))}
              
              
                {/* {filas} */}

                <td
                  className="column14 style19 null"
                >1
                </td>
                <td
                  className="column14 style19 null"
                >2
                </td><td
                  className="column14 style19 null"
                >3
                </td><td
                  className="column14 style19 null"
                >4
                </td><td
                  className="column14 style19 null"
                >5
                </td><td
                  className="column14 style19 null"
                >6
                </td><td
                  className="column14 style19 null"
                >7
                </td>

                <td className="column20 style31 n style32" rowSpan="5">
                {e.duration}
              </td>
              <td className="column21 style149 null style150" rowSpan="5"></td>
              <td className="column22 style149 null style150" rowSpan="5"></td>
              <td className="column23">&nbsp;</td>
              </tr>
<tr>
                <td
                  className="column14 style19 null"
                >1
                </td>
                <td
                  className="column14 style19 null"
                >2
                </td><td
                  className="column14 style19 null"
                >3
                </td><td
                  className="column14 style19 null"
                >4
                </td><td
                  className="column14 style19 null"
                >5
                </td><td
                  className="column14 style19 null"
                >6
                </td><td
                  className="column14 style19 null"
                >7
                </td>

                </tr>


<tr>

                <td
                  className="column14 style19 null"
                >1
                </td>
                <td
                  className="column14 style19 null"
                >2
                </td><td
                  className="column14 style19 null"
                >3
                </td><td
                  className="column14 style19 null"
                >4
                </td><td
                  className="column14 style19 null"
                >5
                </td><td
                  className="column14 style19 null"
                >6
                </td><td
                  className="column14 style19 null"
                >7
                </td>
                </tr>

<tr>
                <td
                  className="column14 style19 null"
                >1
                </td>
                <td
                  className="column14 style19 null"
                >2
                </td><td
                  className="column14 style19 null"
                >3
                </td><td
                  className="column14 style19 null"
                >4
                </td><td
                  className="column14 style19 null"
                >5
                </td><td
                  className="column14 style19 null"
                >6
                </td><td
                  className="column14 style19 null"
                >7
                </td>
                </tr>

                <tr>

                <td
                  className="column14 style19 null"
                >1
                </td>
                <td
                  className="column14 style19 null"
                >2
                </td><td
                  className="column14 style19 null"
                >3
                </td><td
                  className="column14 style19 null"
                >4
                </td><td
                  className="column14 style19 null"
                >5
                </td><td
                  className="column14 style19 null"
                >6
                </td><td
                  className="column14 style19 null"
                >7
                </td>
                </tr>
              {/* {e.week1.map((week) => (
                <td
                  className="column14 style19 null"
                  style={{ background: week.style }}
                >
                  {week.day}
                </td>
              ))}
              <td className="column20 style31 n style32" rowSpan="5">
                {e.duration}
              </td>
              <td className="column21 style149 null style150" rowSpan="5"></td>
              <td className="column22 style149 null style150" rowSpan="5"></td>
              <td className="column23">&nbsp;</td>
            </tr>
            <tr className="row10">
              {e.week2.map((week) => (
                <td
                  className="column14 style19 null"
                  style={{ background: week.style }}
                >
                  {week.day}
                </td>
              ))}
              <td className="column23">&nbsp;</td>
            </tr>
            <tr className="row11">
              {e.week3.map((week) => (
                <td
                  className="column14 style19 null"
                  style={{ background: week.style }}
                >
                  {week.day}
                </td>
              ))}
              <td className="column23">&nbsp;</td>
            </tr>
            <tr className="row12">
              {e.week4.map((week) => (
                <td
                  className="column14 style19 null"
                  style={{ background: week.style }}
                >
                  {week.day}
                </td>
              ))}
              <td className="column23">&nbsp;</td>
            </tr>
            <tr className="row13">
              {e.week5.map((week) => (
                <td
                  className="column14 style19 null"
                  style={{ background: week.style }}
                >
                  {week.day}
                </td>
              ))}
              <td className="column23">&nbsp;</td> */}
            {/* </tr> */}
          </>
        ))}

        <tr className="row34">
          <td className="column0">&nbsp;</td>
          <td className="column1 style2 null"></td>
          <td className="column2 style2 null"></td>
          <td className="column3 style2 null"></td>
          <td className="column4 style2 null"></td>
          <td className="column5 style2 null"></td>
          <td className="column6 style2 null"></td>
          <td className="column7 style2 null"></td>
          <td className="column8 style2 null"></td>
          <td className="column9 style2 null"></td>
          <td className="column10 style2 null"></td>
          <td className="column11 style2 null"></td>
          <td className="column12 style2 null"></td>
          <td className="column13 style2 null"></td>
          <td className="column14 style28 s style30" colSpan="7">
            TOTAL HORAS FORMACIÓN MES
          </td>
          <td className="column20 style18 f">{totalHoras}</td>
          <td className="column21">&nbsp;</td>
          <td className="column22">&nbsp;</td>
          <td className="column23">&nbsp;</td>
        </tr>

        <tr className="row35">
          <td className="column0 style133 s style138" colSpan="2" rowSpan="7">
            OTRAS ACTIVIDADES
          </td>
          <td className="column2 style143 s style144" colSpan="3">
            ACTIVIDAD
          </td>
          <td className="column5 style112 s style113" colSpan="6">
            DESCRIPCIÓN
          </td>
          <td className="column11 style12 s">HORAS </td>
          <td className="column12 style118 s style120" rowSpan="7">
            TOTAL HORAS OTRAS ACTIVIDADES
          </td>
          <td className="column13 style121 n style123" rowSpan="7">
            {totalHorasOtherActivities}
          </td>
          <td className="column14 style124 s style132" colSpan="6" rowSpan="7">
            &nbsp;TOTAL HORAS MES
          </td>
          <td className="column20  f style106" rowSpan="5">
          </td>
          <td className="column20 style104 f style106" rowSpan="5">
            {totalHoras + totalHorasOtherActivities}
          </td>
        </tr>

        {othersActivities.map((otherActivitie) => (
          <tr className="row36">
            <td className="column2 style139 s style139" colSpan="3">
              {otherActivitie.activity}
            </td>
            <td className="column5 style114 null style115" colSpan="6">
              {otherActivitie.description}
            </td>
            <td className="column11 style13 null">{otherActivitie.duration}</td>
          </tr>
        ))}
      </tbody>
    </table>
    </div>
  );
};

export default ReportTemplateRMI;