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
import PaginationData from "../../components/pagination/PaginationData";
// import { Swal } from "sweetalert2";
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

import Loading from   '../../components/loader'
import Spinner from "../../components/loader";


const FormationPrograms = () => {
  const [formationPrograms, setFormationPrograms] = useState([]);
  const [ loading ,setLoading] = useState(true);
  const totalFormationPrograms = () => {
    if (formationPrograms.length > 0) {
      return formationPrograms.length;
    }
    return 0;
  };
  useEffect(() => {
    showFormationPrograms();
  }, []);

  const showFormationPrograms = async () => {
    const data = await allFormationProgramsService();
    // setLoading(true);

    setFormationPrograms(data.results);
    // setLoading(false);
    setLoading(false)

  };

  // const totalUsers = competence;

  const [search, setSearch] = useState("");

  const lastIndex = userPerPage * currentPage; // = 1 * 6 = 6
  const firstIndex = lastIndex - userPerPage; // = 6 - 6 = 0

  const [userPerPage, setUserPerPage] = useState(5);
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
      <Header />
      
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
                    placeholder="search"
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
                    <th scope="col">#</th>
                    <th scope="col">Nombre</th>
                    <th scope="col">Código del programa</th>
                    <th scope="col">Duración estimada</th>
                    <th scope="col">Versión</th>
                    {/* <th scope="col">Programa de Formación</th> */}
                    <th scope="col">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                {loading && < Spinner/>}

                  {result
                    .map((formationProgram, i = 0) => {
                      return (
                        <tr key={formationProgram._id}>
                          <td>
                            <Badge color="" className="badge-dot mr-4">
                              <i className="bg-success" />
                              {i + 1}
                            </Badge>
                          </td>

                          <td>{formationProgram.program_name}</td>

                          <td>{formationProgram.program_code}</td>

                          <td>{formationProgram.total_duration}</td>

                          <td>{formationProgram.program_version}</td>

                          <td>
                            <DetailFormationProgram
                              formationProgram={formationProgram}
                            />

                            {/* <AssignCompetences
                              formationProgram={formationProgram}
                            /> */}
                            <Link
                              to={`/admin/programcompetences/${formationProgram._id}`}
                              tag={NavLinkRRD}
                              activeclassname="active"
                            >
                              <Button variant="" id="btn-program-competences">
                                <i className="fas fa-address-book"></i>
                              </Button>

                              <UncontrolledTooltip
                                className="tooltip-inner"
                                delay={0}
                                target="btn-program-competences"
                              >
                                Competencias asignadas
                              </UncontrolledTooltip>
                            </Link>

                            <Link
                              to={`/admin/updateformationprograms/${formationProgram._id}`}
                              tag={NavLinkRRD}
                              activeclassname="active"
                            >
                              <Button variant="" id="btn-program-edit">
                                <i className="fas fa-pen-alt"></i>
                              </Button>

                              <UncontrolledTooltip
                                className="tooltip-inner"
                                delay={0}
                                target="btn-program-edit"
                              >
                                Actualizar programa de formación
                              </UncontrolledTooltip>
                            </Link>

                            <Button
                              id="btn-program-delete"
                              variant=""
                              onClick={() =>
                                deleteFormationProgram(formationProgram._id)
                              }
                            >
                              <i className="fas fa-trash-alt"></i>
                            </Button>
                            <UncontrolledTooltip
                              className="tooltip-inner"
                              delay={0}
                              target="btn-program-delete"
                            >
                              Eliminar programa de formación
                            </UncontrolledTooltip>
                          </td>
                        </tr>
                      );
                    })
                    .slice((currentPage - 1) * 5, (currentPage - 1) * 7 + 7)}
                </tbody>
              </Table>

              <CardFooter className="py-4"></CardFooter>
              {/* <PaginationData
                userPerPage={userPerPage}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                totalUsers={totalFormationPrograms}
              /> */}
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default FormationPrograms;
