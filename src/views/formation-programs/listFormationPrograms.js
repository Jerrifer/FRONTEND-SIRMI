/* eslint-disable no-unused-vars */
/* eslint-disable no-use-before-define */

// reactstrap components
import {
  Badge,
  Card,
  CardHeader,
  CardFooter,
  Table,
  Container,
  Row,
  Col,
  UncontrolledTooltip,
} from "reactstrap";
// core components
import Header from "components/Headers/Header.js";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import "../../../src/components/Headers/header.css";
import PaginationData from "plugins/pagination";
import { alert } from "plugins/alerts.js";
import { Link, NavLink as NavLinkRRD } from "react-router-dom";
import DetailFormationProgram from "./detailFormationProgram";
import "./input.css";
import { swalWithBootstrapButtons } from "plugins/alerts";
import Swal from "sweetalert2";
import {
  deleteFormationProgramService,
  allFormationProgramsService,
} from "services/formationPrograms";

import Spinner from "../../components/loader";


const FormationPrograms = () => {
  const [formationPrograms, setFormationPrograms] = useState([]);
  const [ loading ,setLoading] = useState(true);
  const [ rendering, setRendering] = useState(0);

  useEffect(() => {
    showFormationPrograms();
  }, [rendering]);
  
  const showFormationPrograms = async () => {
    const data = await allFormationProgramsService();
    setFormationPrograms(data.results);
    setLoading(false)
  };
  
  
  const [search, setSearch] = useState("");
  
  const totalFormationPrograms = formationPrograms.length 
  // const lastIndex = userPerPage * currentPage; // = 1 * 6 = 6
  // const firstIndex = lastIndex - userPerPage; // = 6 - 6 = 0

  const userPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);

   
  const deleteFormationProgram = async (id) => {
    const alertParams = {
      title: "¿Está seguro de eliminar el programa de formación?",
      icon: "warning",
    };
    const confirmed = await alert(alertParams);

    if (confirmed.isConfirmed) {
      const data = await deleteFormationProgramService(id);
      if (data.status === "success") {
        swalWithBootstrapButtons.fire("Eliminado!", data.message, "success");
        setRendering(rendering + 1)
      } else {
        swalWithBootstrapButtons.fire("Error!", data.message, "error");
      }
    } else if (confirmed.dismiss === Swal.DismissReason.cancel) {
      swalWithBootstrapButtons.fire("Cancelado!", "", "info");
    }
  };

  //funcion de busqueda
  const searcher = (e) => {
    setSearch(e.target.value);
  };

  //metodo de filtrado
  let result = [];

  if (!search) {
    result = formationPrograms;
  } else {
    result = formationPrograms.filter((dato) =>
      dato.program_name.toLowerCase().includes(search.toLocaleLowerCase())
    );
  }

  return (
    <>
      <Header title={"Gestionar programas de formación"} />
      
      {/* Page content */}
      <Container className="mt--7" fluid>
        {/* Table */}
        <Row>
          <div className="col">
            <Card className="formulario ">
              <CardHeader className="border-0">
                <Col lg="6">
                  <Link
                    to={`/admin/formationprogramsregister`}
                    tag={NavLinkRRD}
                    activeclassname="active"
                  >
                    <Button className="btn btn-success bg-success">
                      Registrar
                    </Button>
                  </Link>
                </Col>
                <Col lg="6">
                  <input
                    value={search}
                    onChange={searcher}
                    type="search"
                    placeholder="Buscar"
                    className="input"
                  />
                </Col>
              </CardHeader>
              <Table
                className=" table table-striped table-hover  shadow-lg align-items-center table-flush"
                responsive
              >
                <thead className="thead-light">
                  <tr>
                    <th className="text-center" scope="col">#</th>
                    <th scope="col">Programa de Formación</th>
                    <th className="text-center" scope="col">Código del programa</th>
                    <th className="text-center" scope="col">Duración estimada (Meses)</th>
                    <th className="text-center" scope="col">Versión</th>
                    <th className="text-center" scope="col">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                {loading && <tr><td><Spinner/></td></tr>}

                  {result
                    .map((formationProgram, i = 0) => {
                      return (
                        <tr key={formationProgram._id}>
                          <td className="text-center">
                            <Badge color="" className="badge-dot mr-4">
                              <i className="bg-success" />
                              {i + 1}
                            </Badge>
                          </td>

                          <td>{formationProgram.program_name}</td>

                          <td className="text-center">{formationProgram.program_code}</td>

                          <td className="text-center">{formationProgram.total_duration}</td>

                          <td className="text-center">{formationProgram.program_version}</td>

                          <td className="text-center">
                            <DetailFormationProgram
                              formationProgram={formationProgram}
                            />
                            <Link
                              to={`/admin/programcompetences/${formationProgram._id}`}
                              tag={NavLinkRRD}
                              activeclassname="active"
                            >
                              <Button variant="" id={"btn-program-competences"+formationProgram.program_code}>
                                <i className="fas fa-address-book"></i>
                              </Button>

                              <UncontrolledTooltip
                                delay={0}
                                target={"btn-program-competences"+formationProgram.program_code}
                              >
                                Gestionar competencias asignadas
                              </UncontrolledTooltip>
                            </Link>

                            <Link
                              to={`/admin/updateformationprograms/${formationProgram._id}`}
                              tag={NavLinkRRD}
                              activeclassname="active"
                            >
                              <Button variant="" id={"btn-program-edit"+formationProgram.program_code}>
                                <i className="fas fa-pen-alt"></i>
                              </Button>

                              <UncontrolledTooltip
                                delay={0}
                                placement="top"
                                target={"btn-program-edit"+formationProgram.program_code}
                              >
                                Actualizar programa
                              </UncontrolledTooltip>
                            </Link>

                            <Button
                              id={"btn-program-delete"+formationProgram.program_code}
                              variant=""
                              onClick={() =>
                                deleteFormationProgram(formationProgram._id)
                              }
                            >
                              <i className="fas fa-trash-alt"></i>
                            </Button>
                            <UncontrolledTooltip
                              
                              delay={0}
                              target={"btn-program-delete"+formationProgram.program_code}
                            >
                              Eliminar programa
                            </UncontrolledTooltip>
                          </td>
                        </tr>
                      );
                    }).slice((currentPage - 1) * 7, (currentPage - 1) * 7 + 7)
                    }
                </tbody>
              </Table>

              <CardFooter className="py-4">
                <PaginationData
                  userPerPage={userPerPage}
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
                  totalData={totalFormationPrograms}
                />
              </CardFooter>
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default FormationPrograms;
