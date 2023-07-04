import React, { useEffect, useState } from "react";

// reactstrap components
import {
    Button,
    Card,
    CardHeader,
    CardBody,
    FormGroup,
    Form,
    Input,
    Container,
    Row,
    Col,
  } from "reactstrap";

import Header from "components/Headers/Header";
import "../../../src/components/Headers/header.css";
import { swalWithBootstrapButtons } from 'plugins/alerts'
import './input.css'
import { useHistory, useParams } from "react-router-dom";
import { updateFormationProgramService, getFormationProgramService } from "services/formationPrograms";
import { allProgramLevelsService } from "services/programLevels";
import { allThematicLinesService } from "services/thematicLines";
import { allTypeProgramsService } from "services/typePrograms";
import Multiselect from "multiselect-react-dropdown";
import { selectedValueDecorator } from "plugins/multiSelect";
import { optionValueDecorator } from "plugins/multiSelect";
import { closeIcon } from "plugins/multiSelect";
import { customStyle } from "plugins/multiSelect";

// import { Swal } from "sweetalert2";

const UpdateFormationProgram = () => {
  
  const navigate = useHistory();
  const { id } = useParams()

  useEffect(() => {
    showFormationProgram(id);
    showProgramLevel();
    showThematicLines();
    showTypeProgram();
  }, [id]);


  const [formationProgram, setFormationProgram] = useState([]);
  
  const [programName, setProgramName] = useState("");
  const [totalDuration, setTotalDuration] = useState("");
  const [programVersion, setProgramVersion] = useState("");
  const [selectedProgramLevel, setSelectedProgramLevel] = useState("");
  const [selectedThematicLine, setSelectedThematicLine] = useState("");
  const [selectedTypeProgram, setSelectedTypeProgram] = useState("");
  const [programLevels, setProgramLevels] = useState([]);
  const [thematicLines, setThematicLines] = useState([]);
  const [typePrograms, setTypePrograms] = useState([]);
  
  const showFormationProgram = async (id) => {
    const data = await getFormationProgramService(id)
    setFormationProgram(data.results);
    setProgramName(data.results.program_name)
    setTotalDuration(data.results.total_duration)
    setProgramVersion(data.results.program_version)
    setSelectedProgramLevel([data.results.program_level])
    setSelectedThematicLine([data.results.thematic_line])
    setSelectedTypeProgram([data.results.type_program])
    console.log(data.results);
  };



  

  const showProgramLevel = async () => {
    const data = await allProgramLevelsService()
      setProgramLevels(data.results);
  };

  const showThematicLines = async () => {
    const data = await allThematicLinesService() 
      setThematicLines(data.results);
  };

  const showTypeProgram = async () => {
    const data = await allTypeProgramsService()
      setTypePrograms(data.results);
  };
  

  const update = async (e) => {
    e.preventDefault();

    const typeDataTypeProgram = typeof(formationProgram.type_program)

    if (typeDataTypeProgram === 'object') {
      formationProgram.type_program = formationProgram.type_program._id
    }

    const body = {
      "program_name": programName,
      "total_duration": totalDuration,
      "program_version": programVersion,
      "thematic_line": selectedThematicLine[0]._id,
      "type_program": selectedTypeProgram[0]._id,
      "program_level": selectedProgramLevel[0]._id,
  }

    delete(formationProgram.competences)

    const data = await updateFormationProgramService(id, body);
      if (data.status === 'success') {
        swalWithBootstrapButtons.fire(
          'Actualizado exitosamente',
          data.message,
          data.status
        )
        navigate.push("/admin/formationprograms");
      } else {
        swalWithBootstrapButtons.fire(
          data.message,
          data.results,
          data.status
        )
      }
      
  };

  return (
    <>
      <Header />
      {/* Page content */}
      <Container className="mt--7  align-items-center" fluid>
        <Col className="order-xl-2 align-items-center  " xl="11">
          <Card className="bg-secondary formulario  ">
            <CardHeader className="bg-white border-0 align-items-center">
              <Row className="align-items-center">
                <Col s="8">
                  <h3 className="mb-0">Actualizar el programa de formación "{formationProgram.program_name}"</h3>
                </Col>
              </Row>
            </CardHeader>
            <CardBody>
              <Form onSubmit={update}>
                <div className="px-5">
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                        <label
                          className="form-control-label"
                          htmlFor="input-username"
                        >
                          Nombre del programa de formación
                        </label>
                        <Input
                          className="form-control-alternative"
                          id="input-program_name"
                          name="program_name"
                          placeholder="Nombre del programa de formación"
                          type="text"
                          defaultValue={formationProgram.program_name}
                          required
                          onChange={(e) => setProgramName(e.target.value)}
                        />
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                        <label
                          className="form-control-label"
                          htmlFor="input-email"
                        >
                          Código del programa de formación
                        </label>
                        <Input
                          className="form-control-alternative"
                          id="input-email"
                          name="program_code"
                          placeholder="Código del programa de formación"
                          type="text"
                          disabled
                          defaultValue={formationProgram.program_code}
                          value={formationProgram.program_code}
                          required
                        />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                        <label
                          className="form-control-label"
                          htmlFor="input-first-name"
                        >
                          Versión del programa de formación
                        </label>
                        <Input
                          className="form-control-alternative"
                          id="input-first-name"
                          name="program_version"
                          placeholder="Versión del programa de formación"
                          type="text"
                          defaultValue={formationProgram.program_version}
                          required
                          onChange={(e) => setProgramVersion(e.target.value)}
                        />
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                        <label
                          className="form-control-label"
                          htmlFor="input-email"
                        >
                          Duración estimada (Horas)
                        </label>
                        <Input
                          className="form-control-alternative"
                          id="input-email"
                          name="total_duration"
                          placeholder="Duración estimada"
                          type="text"
                          defaultValue={formationProgram.total_duration}
                          required
                          onChange={(e) => setTotalDuration(e.target.value)}
                        />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                        <label
                          className="form-control-label"
                          htmlFor="input-first-name"
                        >
                          Titulo del programa
                        </label>
                      
                          <Multiselect
                            required
                            selectedValueDecorator={selectedValueDecorator}
                            optionValueDecorator={optionValueDecorator}
                            customCloseIcon={closeIcon}
                            style={customStyle}
                            placeholder="Titulos de programas"
                            displayValue="program_level"
                            selectionLimit={1}
                            onKeyPressFn={function noRefCheck(){}}
                            onRemove={function noRefCheck(){}}
                            onSearch={function noRefCheck(){}}
                            onSelect={function noRefCheck(e){
                              setSelectedProgramLevel(e)
                            }}
                            options={programLevels}
                            selectedValues={selectedProgramLevel}
                            avoidHighlightFirstOption={true}
                            hidePlaceholder={true}
                          />
                        

                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                        <label
                          className="form-control-label"
                          htmlFor="input-email"
                        >
                          Línea tématica
                        </label>
                        <Multiselect
                            required
                            selectedValueDecorator={selectedValueDecorator}
                            optionValueDecorator={optionValueDecorator}
                            customCloseIcon={closeIcon}
                            style={customStyle}
                            placeholder="Lineas tématicas"
                            displayValue="thematic_line"
                            selectionLimit={1}
                            onKeyPressFn={function noRefCheck(){}}
                            onRemove={function noRefCheck(){}}
                            onSearch={function noRefCheck(){}}
                            onSelect={function noRefCheck(e){
                              setSelectedThematicLine(e)
                            }}
                            options={thematicLines}
                            selectedValues={selectedThematicLine}
                            avoidHighlightFirstOption={true}
                            hidePlaceholder={true}
                          />
                        </FormGroup>
                      </Col>
                    </Row>

                    <Row>
                      <Col lg="6">
                        <FormGroup>
                        <label
                          className="form-control-label"
                          htmlFor="input-email"
                        >
                          Tipo del programa
                        </label>
                        <Multiselect
                            required
                            selectedValueDecorator={selectedValueDecorator}
                            optionValueDecorator={optionValueDecorator}
                            customCloseIcon={closeIcon}
                            style={customStyle}
                            hidePlaceholder={true}
                            avoidHighlightFirstOption={true}
                            placeholder="Tipos de programas"
                            displayValue="type_program"
                            selectionLimit={1}
                            onKeyPressFn={function noRefCheck(){}}
                            onRemove={function noRefCheck(){}}
                            onSearch={function noRefCheck(){}}
                            onSelect={function noRefCheck(e){
                              setSelectedTypeProgram(e)
                            }}
                            options={typePrograms}
                            selectedValues={selectedTypeProgram}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row className="justify-content-end">
                      <Button type="submit" className="justify-content-end m-4">Guardar cambios</Button>
                    </Row>
                </div>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </Container>
    </>
  );
};


export default UpdateFormationProgram;
