

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
        color: '#000', // Aquí puedes definir el color que desees
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
            required
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
              required
              onChange={(e) => joinData(e.target.value)}
            />
          </FormGroup>
        </Col>
      </Row>
  </>
  );
}

export default AddLearningResults;

















// import Multiselect from "multiselect-react-dropdown";
// import React, { useState } from "react";
// import { Modal, Button } from "react-bootstrap";
// import { Col, FormGroup, Row, UncontrolledTooltip } from "reactstrap";

// function AddLearningResults({ formationPrograms }) {
//   const [isShow, invokeModal] = useState(false);
//   const initModal = () => {
//     return invokeModal(!isShow);
//   };

//   const [competences, setCompetences] = useState([]);

//   const [hola, setHola] = useState(true);

//   const showCompetences = async (selectedFormationProgram) => {
//     console.log(selectedFormationProgram);
//     setCompetences(selectedFormationProgram.competences)
//     setHola(false)
//   }

//   const showLearningResults = async (competences) => {
//     console.log(competences);
//   }

//   return (
//     <>
//       <Button
//         className="btn btn-success bg-success"
//         variant="" 
//         id="btn-assigned-formation-detail"
//         onClick={initModal}
//       >
//           Agregar
//       </Button>
//       <UncontrolledTooltip
//         className="tooltip-inner"
//         delay={0}
//         target="btn-assigned-formation-detail"
//       >
//         Ver detalle reporte
//       </UncontrolledTooltip>

//       <Modal show={isShow} size={"lg"} className=" color ">
//         <Modal.Header>
//           <Modal.Title>Programación asignada... </Modal.Title>
//         </Modal.Header>
//         <div className="container">
//           <Modal.Body>
//             <div className="container ">
//               <Row>
//                 <Col lg="6">
//                   <FormGroup>
//                     <label
//                       className="form-control-label"
//                       htmlFor="input-hours-month"
//                     >
//                       Programas de formación
//                     </label>
//                     <Multiselect
//                       className="multiselect"
//                       required
//                       loading={formationPrograms.length <= 0}
//                       placeholder="Programas de formación"
//                       displayValue="program_name"
//                       selectionLimit={1}
//                       onKeyPressFn={function noRefCheck(){}}
//                       onRemove={function noRefCheck(){
//                         setHola(true)
//                       }}
//                       onSearch={function noRefCheck(){}}
//                       onSelect={function noRefCheck(e){
//                         showCompetences(e[0])
//                       }}
//                       options={formationPrograms}
//                       avoidHighlightFirstOption={true}
//                       closeOnSelect={true}
//                       emptyRecordMsg="No hay más datos"
//                     />
//                   </FormGroup>
//                 </Col>
//                 <Col lg="6">
//                   <FormGroup>
//                     <label
//                       className="form-control-label"
//                       htmlFor="input-hours-month"
//                     >
//                       Competencias
//                     </label>
//                     <Multiselect
//                       disable={hola}
//                       required
//                       placeholder="Competencias"
//                       displayValue="labor_competition"
//                       onKeyPressFn={function noRefCheck(){}}
//                       onRemove={function noRefCheck(){}}
//                       onSearch={function noRefCheck(){}}
//                       onSelect={function noRefCheck(e){
//                         showLearningResults(e[0])
//                       }}
//                       options={competences} 
//                       avoidHighlightFirstOption={true}
//                       closeOnSelect={true}
//                       emptyRecordMsg="No hay más datos"
//                     />
//                   </FormGroup>
//                 </Col>
//               </Row>
//             </div>
//           </Modal.Body>

//           <Modal.Footer>
//             <Button variant="danger" onClick={initModal}>
//               Cerrar
//             </Button>
//           </Modal.Footer>
//         </div>
//       </Modal>
//     </>
//   );
// }

// export default AddLearningResults;



