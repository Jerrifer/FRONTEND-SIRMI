/* eslint-disable no-unused-vars */
/* eslint-disable no-use-before-define */
import axios from "axios";

// reactstrap components
import {
  Badge,
  Card,
  CardHeader,
  CardFooter,
  Table,
  Container,
  Row,
  Col
} from "reactstrap";
// core components
import Header from "components/Headers/Header.js";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import "../../../src/components/Headers/header.css";
import PaginationData from "../../components/pagination/PaginationData";
import {BASE_URL} from 'globals.constans';
// import { Swal } from "sweetalert2";
import { alert } from 'plugins/alerts.js';
import { Link, NavLink as NavLinkRRD } from "react-router-dom";
import DetailFormationProgram from "./detailFormationProgram";
import AssignCompetences from "./assignCompetences";
import "./input.css"

const FormationPrograms = () => {

  const [formationProgram, setFormationProgram] = useState([]);

  const totalFormationPrograms = () => {
    if(formationProgram.length > 0) {
      return formationProgram.length;
    }
    return 0
  }
  // const totalUsers = competence;

  const [search, setSearch] = useState("");

  const lastIndex = userPerPage * currentPage; // = 1 * 6 = 6
  const firstIndex = lastIndex - userPerPage; // = 6 - 6 = 0

  const [userPerPage, setUserPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  const showFormationPrograms = async () => {
    await axios.get(`${BASE_URL}formationprograms`).then((response) => {
        const data = response.data;
        setFormationProgram(data.results);
      }
    )
  };


  useEffect(() => {
      showFormationPrograms();
  }, [formationProgram]);

  const deleteFormationProgram = async (id) => {
    const alertParams = {
      title:'¿Está seguro de eliminar el programa de formación?',
      icon: 'warning',
      id: id,
      path: `${BASE_URL}formationprograms/`,
      method: 'DELETE',
      body: null
    };
    await alert(alertParams).then(() => {
      showFormationPrograms();
    });
  };

  //funcion de busqueda
    const searcher = (e) => {
    setSearch(e.target.value);
  };

  //metodo de filtrado
  let result = [];

  if (!search) {
    result = formationProgram;
  } else {
    result = formationProgram.filter((dato) =>
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
                  {result.map((formationProgram, i=0) => {

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
                              <Button
                                variant="">
                                  <i className="fas fa-address-book"></i>
                              </Button>
                            </Link>

                            <Link
                              to={`/admin/updateformationprograms/${formationProgram._id}`}
                              tag={NavLinkRRD}
                              activeclassname="active"
                            >
                              <Button
                                variant="">
                                  <i className="fas fa-pen-alt"></i>
                              </Button>
                            </Link>

                            <Button
                              variant=""
                              onClick={() => deleteFormationProgram(formationProgram._id)}
                            >
                              <i className="fas fa-trash-alt"></i>
                            </Button>
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
