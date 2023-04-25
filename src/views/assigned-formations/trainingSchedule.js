import React from "react";
import Multiselect from "multiselect-react-dropdown";
import { Button, Form, FormGroup, Input } from "reactstrap";
import {
  selectedValueDecorator,
  optionValueDecorator,
  closeIcon,
} from "plugins/multiSelect";
import { useState } from "react";

function TrainingSchedule({ schedule }) {
  const customStyle = {
    closeIcon: {
      background: "black",
    },
    optionContainer: {
      backgroundColor: "#f9f9f9",
    },
    option: {
      color: "#333",
    },
    chips: {
      color: "#000", // Aquí puedes definir el color que desees
      background: "ghostwhite",
      border: "none",
      boxShadow: "2px 2px 5px 0px rgba(0, 0, 0, 0.1)",
    },
    searchBox: {
      maxHeight: "40px",
    },
    inputField: {
      color: "#0000",
    },
  };

  const days = [
    { _id: 1, day: "Lunes" },
    { _id: 2, day: "Martes" },
    { _id: 3, day: "Miercoles" },
    { _id: 4, day: "Jueves" },
    { _id: 5, day: "Viernes" },
    { _id: 6, day: "Sabado" },
    { _id: 7, day: "Domingo" },
  ];

  const [day, setDay ] = useState([])
  const [startTime, setStartTime ] = useState('')
//   const [endTime, setEndTime ] = useState([])

  const [disable, setDisable] = useState(true)

  const add = async (e) => {
    e.preventDefault();
    if (startTime === '') {
        return alert('Campo requerido')
    }

    const data = {
        _id: day._id,
        date: startTime,
    }
    schedule(data._id, data.date)
  }

  return (
    <>
          <label
            className="form-control-label mt-4"
            htmlFor="input-hours-month"
          >
            Horario
          </label>
          <div style={{ display: "flex", alignItems: "center" }}>
            <Form>
                <FormGroup>
                <label className="form-control-label" htmlFor="input-hours-month">
                    Días
                </label>
                <Multiselect
                    
                    selectedValueDecorator={selectedValueDecorator}
                    optionValueDecorator={optionValueDecorator}
                    placeholder="Seleccionar"
                    displayValue="day"
                    selectionLimit={1}
                    onKeyPressFn={function noRefCheck() {}}
                    onRemove={function noRefCheck() {}}
                    onSearch={function noRefCheck() {}}
                    onSelect={function noRefCheck(e) {
                        setDay(e[0]);
                        setDisable(false)
                    }}
                    hidePlaceholder={true}
                    closeOnSelect={false}
                    loading={days.length <= 0}
                    avoidHighlightFirstOption={true}
                    emptyRecordMsg="No hay más datos"
                    style={customStyle}
                    customCloseIcon={closeIcon}
                    options={days}
                />
                </FormGroup>
                <FormGroup className="ml-3">
                <label className="form-control-label" htmlFor="input-hours-month">
                    Horas de entrada y salida (24 Horas)
                </label>
                <Input
                    required
                    disabled={disable}
                    className="form-control-alternative"
                    id="input-hours-month"
                    placeholder="Ej. 16:00 - 19:00"
                    type="datetime"
                    onChange={(e) => setStartTime(e.target.value)}
                />
                </FormGroup>

                {/* <FormGroup className="ml-3">
                <label className="form-control-label" htmlFor="input-hours-month">
                    Hora salida
                </label>
                <Input
                    className="form-control-alternative"
                    id="input-hours-month"
                    placeholder="Ej. 15"
                    type="number"
                    onChange={(e) => setEndTime(e.target.value)}
                />
                </FormGroup> */}
                <Button type="submit" onClick={add} className="ml-3">Añadir</Button>
            </Form>
          </div>
    </>
  );
}

export default TrainingSchedule;
