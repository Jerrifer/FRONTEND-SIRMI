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
  Col,
  NavLink,
  DropdownToggle,
} from "reactstrap";
// core components
import Header from "components/Headers/Header.js";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import "../../../src/components/Headers/header.css";
import PaginationData from "../../components/pagination/PaginationData";
import { BASE_URL } from "globals.constans";
// import { Swal } from "sweetalert2";
import { alert } from "./alerts";
import { Link, NavLink as NavLinkRRD } from "react-router-dom";
import DetailFormationProgram from "./detailFormationProgram";
import "assets/css/indexCompetence.css";

const ListCompetence = () => {
  const [competencesAssign, setCompetencesAssign] = useState([]);

  const [search, setSearch] = useState("");

  const lastIndex = userPerPage * currentPage; // = 1 * 6 = 6
  const firstIndex = lastIndex - userPerPage; // = 6 - 6 = 0

  const [userPerPage, setUserPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  // };

  const showCompetences = async () => {
    await axios.get(`${BASE_URL}competences`).then((response) => {
      setCompetencesAssign(response.data.results);
    });
  };

  useEffect(() => {
    showCompetences();
  }, []);

  const deleteFormationProgram = async (id) => {
    const alertParams = {
      title: "¿Está seguro de eliminar el programa de formación?",
      icon: "warning",
    };
    alert(alertParams.title, alertParams.icon, id);
    showCompetences();
  };
  //funcion de busqueda
  const searcher = (e) => {
    setSearch(e.target.value);
  };

  //metodo de filtrado
  let result = [];

  if (!search) {
    result = competencesAssign;
  } else {
    result = competencesAssign.filter((dato) =>
      dato.labor_competence_code
        .toLowerCase()
        .includes(search.toLocaleLowerCase())
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
                  <h3 className="mb-0">Competencias</h3>
                </Col>
                <Link
                  to={`/admin/RegisterCompetence/${competencesAssign._id}`}
                  tag={NavLinkRRD}
                  activeclassname="active"
                >
                  <Button>crear</Button>
                </Link>
                <Col lg="5">
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
                    <th scope="col">id</th>
                    <th scope="col">Labor Competence-CODE</th>
                    <th scope="col">labor_competition</th>
                    <th scope="col">labor_competition_version</th>
                    <th scope="col">duration</th>
                    <th scope="col">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {result
                    .map((competencesAssign, i = 0) => {
                      return (
                        <tr key={competencesAssign._id}>
                          <td>
                            <Badge color="" className="badge-dot mr-4">
                              <i className="bg-success" />
                              {i + 1}
                            </Badge>
                          </td>

                          <td>{competencesAssign.labor_competence_code}</td>

                          <td className="space">{competencesAssign.labor_competition}</td>

                          <td>{competencesAssign.labor_competition_version}</td>

                          <td>{competencesAssign.duration}</td>

                          <td>
                            <DetailFormationProgram
                              competence={competencesAssign}
                            />

                            <Link
                              to={`/admin/updateCompetence/${competencesAssign._id}`}
                              tag={NavLinkRRD}
                              activeclassname="active"
                            >
                              <Button variant="">
                                <i className="fas fa-pen-alt"></i>
                              </Button>
                            </Link>

                            <Button
                              variant=""
                              onClick={() =>
                                deleteFormationProgram(competencesAssign._id)
                              }
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

export default ListCompetence;
