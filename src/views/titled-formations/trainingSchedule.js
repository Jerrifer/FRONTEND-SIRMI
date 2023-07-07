import React from "react";
import Multiselect from "multiselect-react-dropdown";
import { Button, Col, Input } from "reactstrap";
import {
  selectedValueDecorator,
  optionValueDecorator, 
  customStyle
} from "plugins/multiSelect";
import { useState } from "react";

function TrainingSchedule({ schedule }) {

  const days = [
    { _id: 0, day: "Domingo" },
    { _id: 1, day: "Lunes" },
    { _id: 2, day: "Martes" },
    { _id: 3, day: "Miercoles" },
    { _id: 4, day: "Jueves" },
    { _id: 5, day: "Viernes" },
    { _id: 6, day: "Sábado" },
  ];

  const [day, setDay ] = useState([])
  const [startTime, setStartTime ] = useState('')
  const [endTime, setEndTime ] = useState('')
  const [sharedEvent, setSharedEvent ] = useState(false)

  const [disable, setDisable] = useState(true)

  const add = async (e) => {
    e.preventDefault();
    if (startTime === '') {
      return alert('Campo requerido')
    }
    console.log(startTime);
    const newStartTime = startTime.substring(0, 2) + ":00";
    const newEndTime = endTime.substring(0, 2) + ":00";
    const hoursPerDay = await calcularTotalHoras(startTime, endTime)
    schedule(day._id,newStartTime, newEndTime, hoursPerDay, sharedEvent)
  }
  
  function calcularTotalHoras(horaInicio, horaFin) {
    var partesInicio = horaInicio.split(':');
    var partesFin = horaFin.split(':');
  
    var fechaInicio = new Date();
    fechaInicio.setHours(parseInt(partesInicio[0], 10));
    // fechaInicio.setMinutes(parseInt(partesInicio[1], 10));
  
    var fechaFin = new Date();
    fechaFin.setHours(parseInt(partesFin[0], 10));
    // fechaFin.setMinutes(parseInt(partesFin[1], 10));
  
    var diferenciaMilisegundos = fechaFin - fechaInicio;
    var totalHoras = diferenciaMilisegundos / 3600000; // Total de horas en formato decimal
    return totalHoras;
  }


  return (
    <>
          <label
            className="form-control-label mt-4"
            htmlFor="input-hours-month"
          >
            <h4>Horario</h4>
          </label>
          <div style={{ display: "flex", alignItems: "center" }}>
            <div>
                <label className="form-control-label" htmlFor="input-hours-month">
                    Días
                </label>
                <Multiselect
                    singleSelect
                    selectedValueDecorator={selectedValueDecorator}
                    optionValueDecorator={optionValueDecorator}
                    placeholder="Seleccionar"
                    displayValue="day"
                    selectionLimit={1}
                    onKeyPressFn={function noRefCheck() {}}
                    onRemove={function noRefCheck() {
                      setDisable(true)
                    }}
                    onSearch={function noRefCheck() {}}
                    onSelect={function noRefCheck(e) {
                        setDay(e[0]);
                        setDisable(false)
                    }}
                    hidePlaceholder={true}
                    loading={days.length <= 0}
                    avoidHighlightFirstOption={true}
                    emptyRecordMsg="No hay más datos"
                    style={customStyle}
                    options={days}
                />
                <label className="form-control-label w-100" htmlFor="input-start-time">
                    Hora de entrada
                  <Input
                      required
                      disabled={disable}
                      className="form-control-alternative"
                      id="input-start-time"
                      placeholder="Ej. 16:00"
                      type="time"
                      step="3600"
                      onChange={(e) => setStartTime(e.target.value)}
                      />
                </label>
                

                <label className="form-control-label w-100" htmlFor="input-end-time">
                    Hora de salida
                    
                <Input
                    required
                    disabled={disable}
                    className="form-control-alternative"
                    id="myTimeInput"
                    placeholder="Ej. 20:00"
                    type="time"
                    step="3600"
                    onChange={(e) => setEndTime(e.target.value)}
                />
                </label>
                
                <div className="d-flex justify-content-between">
                <label htmlFor="customCheckShared">
                  <h6>¿Evento compartido?</h6>
                </label>
                <span className="clearfix"/>
                  <label className="custom-toggle">
                    <input type="checkbox" id="customCheckShared" onChange={() =>setSharedEvent(!sharedEvent)}/>
                    <span className="custom-toggle-slider rounded-circle" />
                  </label>
                </div>

                <Button type="submit" onClick={add} className="my-3">Añadir</Button>
            </div>
            
          </div>
    </>
  );
}

export default TrainingSchedule;
