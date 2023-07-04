

import React from "react";
import Multiselect from "multiselect-react-dropdown";
import { Col, FormGroup, Input, Row } from "reactstrap";
import { selectedValueDecorator, optionValueDecorator, closeIcon } from "plugins/multiSelect";
import { useState } from "react";

function AddLearningResults({options, onSelect, disable}) {

  const customStyle = {
    closeIcon: {
        background: 'black'
    },
    optionContainer: {
        backgroundColor: '#f9f9f9',
    },
    option: {
        color: '#333',
    },
    chips: {
        color: '#000',
        background: 'ghostwhite',
        border: 'none',
        boxShadow: '2px 2px 5px 0px rgba(0, 0, 0, 0.1)',
    },
    searchBox: {
        maxHeight: "40px",

    },
    inputField: {
        color: '#0000',
    },
  };

  const [seleted, setSeleted] = useState([])

  const joinData = (endDate) => {
    const data = {
      learning_result: seleted, end_date: endDate
    }
    onSelect(data)
  }

  return (
    <>
      <Row>
        <Col lg='7'>
          <label
            className="form-control-label"
            htmlFor="input-ficha"
          >
            Seleccione un resultado de aprendizaje
          </label>
          <Multiselect
            // required
            disable={disable}
            selectedValueDecorator={selectedValueDecorator}
            optionValueDecorator={optionValueDecorator}
            customCloseIcon={closeIcon}
            style={customStyle}
            placeholder="Seleccionar"
            displayValue="learning_result"
            selectionLimit={1}
            onKeyPressFn={function noRefCheck(){}}
            onRemove={function noRefCheck(){}}
            onSearch={function noRefCheck(){}}
            onSelect={function noRefCheck(e){
              setSeleted(e[0])
            }}
            options={options}
            avoidHighlightFirstOption={true}
            closeOnSelect={true}
            hidePlaceholder={true}
            emptyRecordMsg="No hay más datos"
          />
        </Col>
        <Col lg='5'>
          <FormGroup>
            <label
              className="form-control-label"
              htmlFor="input-ficha"
            >
              Fecha terminación
            </label>
            <Input
              className="form-control-alternative"
              id="input-ficha"
              placeholder="Ej. 24514755"
              type="date"
              // required
              onChange={(e) => joinData(e.target.value)}
            />
          </FormGroup>
        </Col>
      </Row>
  </>
  );
}

export default AddLearningResults;





