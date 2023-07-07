import React, { useState } from 'react'
import { Button, Col, FormGroup, Input, Row } from 'reactstrap';
import ComplementaryFormation from './complementaryFormation';

function AddFormsComplementary({months, rmi, schedules, setCourseDuration}) {

    // const [courseDuration, setCourseDuration ] = useState(0)
    // const [complementaryFormation, setComplementaryFormations] = useState([]);
    // const [formsDates, setFormsDates] = useState([{ id: 0 }]);

    // const addFormDates = () => {
    //     if (formsDates.length < 5) {
    //       setFormsDates((prevForms) => [...prevForms, { id: formsDates.length+1 }]);
    //     }
    //   };

    // const removeFormDates = (id) => {
    //     setFormsDates((prevForms) => prevForms.filter((form) => form.id !== id));
    //   };

    // const postResultSelected = (monthSelected, selectedDays, id) => {

    // setComplementaryFormations((prevComplementaryFormations) => {
    //     const newResult = {
    //     month_complementary: monthSelected,
    //     days: selectedDays,
    //     };
    //     return {
    //     ...prevComplementaryFormations,
    //     [id]: newResult,
    //     };
    // });

    // const learningResultsFilter = learningResults.filter(
    //     (learningResult) => learningResult !== data.learning_result
    // );
    // setLearningResults(learningResultsFilter);
    // };

    // const renderFormsDates = () => {
    //     return formsDates.map((form) => (
    //       <div key={form.id}>
    //         <Row>
    //           <Col lg="11" md="11">
    //             <ComplementaryFormation
    //               months={months}
    //               year={rmi.year}
    //               schedules={schedules}
    //               setComplementary={postResultSelected}
    //               id={form.id}
    //             />
    //           </Col>
    //           <Col lg="1" md="1" className="d-flex align-items-center">
    //             {formsDates.length > 1 && (
    //               <Button
    //                 className="my-3"
    //                 variant=""
    //                 onClick={() => removeFormDates(form.id)}
    //               >
    //                 Quitar
    //               </Button>
    //             )}
    //           </Col>
    //         </Row>
    //       </div>
    //     ));
    //   };

  return(
    <FormGroup className="mb-0">
        <label
        className="form-control-label"
        htmlFor="input-duration"
    >
        Duración curso
    </label>
    <Input
        className="form-control-alternative w-25"
        id="input-duration"
        placeholder="Ej. 15"
        type="text"
        onChange={(e) => setCourseDuration(e.target.value)}
    />
    {/* <Button
        className="my-3"
        onClick={addFormDates}
        variant=""
        id="btn-program-remove"
    >
        Agregar
    </Button> */}
    {/* {renderFormsDates()} */}
    </FormGroup>
  )
  
}

export default AddFormsComplementary