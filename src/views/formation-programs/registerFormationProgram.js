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
  // core components

import Header from "components/Headers/Header";
import "../../../src/components/Headers/header.css";
import { swalWithBootstrapButtons } from 'plugins/alerts'
// import { Swal } from "sweetalert2";
import './input.css'
import { useHistory } from "react-router-dom";
import { registerFormationProgramService } from "services/formationPrograms";
import { allProgramLevelsService } from "services/programLevels";
import { allThematicLinesService } from "services/thematicLines";
import { allTypeProgramsService } from "services/typePrograms";
import Multiselect from "multiselect-react-dropdown";
import { customStyle, closeIcon, selectedValueDecorator, optionValueDecorator } from "plugins/multiSelect";

const RegisterFormationProgram = () => {

  const navigate = useHistory();

const [programName, setProgramName] = useState('');
const [programCode, setProgramCode] = useState('');
const [totalDuration, setTotalDuration] = useState('');
const [programVersion, setProgramVersion] = useState('');
const [selectedProgramLevel, setSelectedProgramLevel] = useState('');
const [selectedThematicLine, setSelectedThematicLine] = useState('');
const [selectedTypeProgram, setSelectedTypeProgram] = useState('');

const [programLevels, setProgramLevels] = useState([]);
const [thematicLines, setThematicLines] = useState([]);
const [typePrograms, setTypePrograms] = useState([]);


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

  useEffect(() => {
    showProgramLevel();
    showThematicLines();
    showTypeProgram();
  }, []);

  const register = async (e) => {
    e.preventDefault();
    
    const body = {
        "program_name": programName,
        "program_code": programCode,
        "total_duration": totalDuration,
        "program_version": programVersion,
        "thematic_line": selectedThematicLine[0]._id,
        "type_program": selectedTypeProgram[0]._id,
        "program_level": selectedProgramLevel[0]._id,
    }
    console.log(body);

    const data = await registerFormationProgramService(body);
    console.log(data);
    if(data.status === 'success') {
      swalWithBootstrapButtons.fire(
        'Registro exitoso',
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
                  <h3 className="mb-0">Registrar programa de formación</h3>
                </Col>
              </Row>
            </CardHeader>
            <CardBody>
              <Form onSubmit={register}>
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
                          id="input-username"
                          placeholder="Ej. PRODUCCIÓN DE JOYERÍA"
                          type="text"
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
                          placeholder="Ej. 842403"
                          type="text"
                          required
                          onChange={(e) => setProgramCode(e.target.value)}
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
                          placeholder="Ej. 100"
                          type="text"
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
                          Duración estimada (Meses)
                        </label>
                        <Input
                          className="form-control-alternative"
                          id="input-email"
                          placeholder="24"
                          type="text"
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
                            hidePlaceholder={true}
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
                            avoidHighlightFirstOption={true}
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
                            hidePlaceholder={true}
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
                            avoidHighlightFirstOption={true}
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
                            avoidHighlightFirstOption={true}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row className="justify-content-end">
                        <Button type="submit" className="btn btn-success m-4 bg-success">Registrar</Button>
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


export default RegisterFormationProgram;
