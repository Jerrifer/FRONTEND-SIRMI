import React, { useEffect, useState } from "react";
import Multiselect from "multiselect-react-dropdown";
import { Col, FormGroup, Input, Row } from "reactstrap";
import {
  selectedValueDecorator,
  optionValueDecorator,
  customStyle,
  closeIcon,
} from "plugins/multiSelect";

function AddLearningResults({ options, onSelect, disable, id, selectedValues, isSelectedValues }) {

console.log('options');
console.log(options);
console.log('selectedValues');
console.log(selectedValues);

  const [seleted, setSeleted] = useState([selectedValues?.learning_result]);
  const [endDate, setEndDate] = useState(selectedValues?.end_date);

  useEffect(() => {
    const data = {
      learning_result: seleted[0],
      end_date: endDate,
      id: id
    };
    console.log('data');
    console.log(data);
    onSelect(data);
  }, [seleted, endDate, id]);

  // function joinData(data) {
  //   onSelect(data);
  // }

  return (
    <>
      <Row>
        <Col lg="7">
          <label className="form-control-label" htmlFor="input-ficha">
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
            onKeyPressFn={function noRefCheck() {}}
            onRemove={function noRefCheck() {}}
            onSearch={function noRefCheck() {}}
            onSelect={function noRefCheck(e) {
              setSeleted(e);
            }}
            options={options}
            avoidHighlightFirstOption={true}
            closeOnSelect={true}
            hidePlaceholder={true}
            emptyRecordMsg="No hay más datos"
            selectedValues={isSelectedValues? [selectedValues?.learning_result] : []}  
          />
        </Col>
        <Col lg="5">
          <FormGroup>
            <label className="form-control-label" htmlFor="input-ficha">
              Fecha terminación
            </label>
            <Input
              className="form-control-alternative"
              id="input-ficha"
              placeholder="Ej. 24514755"
              type="date"
              defaultValue={selectedValues?.end_date}
              // required
              onChange={(e) => setEndDate(e.target.value)}
            />
          </FormGroup>
        </Col>
      </Row>
    </>
  );
}

export default AddLearningResults;
