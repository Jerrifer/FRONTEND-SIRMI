/* eslint-disable react-hooks/exhaustive-deps */

// import axios from "axios";

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
import { Link, NavLink as NavLinkRRD } from "react-router-dom";
import DetailUsers from "./detailUser";
import "assets/css/indexCompetence.css";
import { alert } from 'plugins/alerts.js';

import { getUsersByTrainingCenterService } from "services/users";
import { deleteUserService } from "services/users";
import { swalWithBootstrapButtons } from "plugins/alerts";
import Swal from "sweetalert2";
// import { allUsersService } from "services/users";
import Spinner from "../../components/loader"
import PaginationData from "plugins/pagination";

const ListUser = () => {
  
  const [user, setUser] = useState([]);
  const [ rendering, setRendering] = useState(0);
  const [search, setSearch] = useState("");
  const userPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);

  const [isLoading, setisLoading] = useState(true);

  
  useEffect(() => {
    const idTrainingCenter = localStorage.getItem('training_center')
    listUsers(idTrainingCenter)
    setisLoading(false)
  }, [rendering]);

  const listUsers = async (id) => {
    const data = await getUsersByTrainingCenterService(id);
    setUser(data.results);
  };

  const totalUsers = user.length

  const deleteUsers = async (id) => {
    const alertParams = {
      title: "¿Está seguro de eliminar el Usuario?",
      icon: "warning",
    };
    const confirmed = await alert(alertParams);

    if (confirmed.isConfirmed) {
      const data = await deleteUserService(id);
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

  //función de búsqueda
  const searcher = (e) => {
    setSearch(e.target.value);
  };

  //método de filtrado
  let result = [];

  if (!search) {
    result = user;
  } else {
    result = user.filter((dato) =>
      dato.email.toLowerCase().includes(search.toLocaleLowerCase())
    );
  }

  return (
    <>
      <Header title={"Gestinar Usuarios"} />
      {/* Page content */}
      <Container className="mt--7" fluid>
        {/* Table */}
        <Row>
          <div className="col">
            <Card className="formulario ">
              <CardHeader className="border-0">
                <Col lg="6">
                  <Link
                    to={`/admin/registeruser`}
                    tag={NavLinkRRD}
                    activeclassname="active"
                  >
                    <button className="btn btn-success bg-success">
                      Registrar
                    </button>
                  </Link>
                </Col>

                <Col lg="6">
                  <input
                    value={search}
                    onChange={searcher}
                    type="search"
                    icon={"fas fa-pen-alt"}
                    placeholder={"🔍 Buscar"}
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
                    <th scope="col">N°</th>
                    <th scope="col">Usuario</th>
                    <th scope="col">Estado</th>
                    <th scope="col">Correo electrónico</th>
                    <th scope="col">Número teléfono</th>
                    <th scope="col">Número de identidad</th>
                    <th scope="col">Acciones</th>
                  </tr>
                </thead>
                <tbody>

                {isLoading && <tr><td><Spinner/></td></tr> }
                

                  {result.map((user, i = 0) => {
                      return (
                        <tr key={user._id}>
                          <td>
                            <Badge color="" className="badge-dot mr-4">
                              <i className="bg-success" />
                              {i + 1}
                            </Badge>
                          </td>

                          <td>{user.first_name} {user.last_name}</td>

                          {
                            user.status === true ?
                            <td className="parpadea">
                              <div id={"btn-active-contract"+i} className="esfera-active"></div>
                              <UncontrolledTooltip
                                delay={0}
                                placement="top"
                                target={"btn-active-contract"+i}
                              >
                                  Contrato activo
                              </UncontrolledTooltip>
                            </td>
                            :
                            <td className="">
                              <div id={"btn-inactive-contract"+i} className="esfera-inactive"></div>
                              <UncontrolledTooltip
                                delay={0}
                                placement="top"
                                target={"btn-inactive-contract"+i}
                              >
                                  Contrato inactivo
                              </UncontrolledTooltip>
                            </td>
                          }

                          <td>{user.email}</td>
                          <td>{user.contact_number}</td>
                          <td>{user.document_number}</td>

                          <td>
                            <DetailUsers user={user} />

                            <Link
                              to={`/admin/contracts/${user._id}`}
                              tag={NavLinkRRD}
                              activeclassname="active"
                            >
                              <Button variant="" id={"btn-contracts"+i}>
                                <i className="ni ni-paper-diploma"></i>
                              </Button>
                            </Link>

                            <UncontrolledTooltip
                              delay={0}
                              placement="top"
                              target={"btn-contracts"+i}
                            >
                              Ver contratos
                            </UncontrolledTooltip>

                            <Link
                              to={`/admin/updateusers/${user._id}`}
                              tag={NavLinkRRD}
                              activeclassname="active"
                            >
                              <Button id={"btn-update-user"+i} variant="">
                                <i className="fas fa-pen-alt"></i>
                              </Button>
                            </Link>

                            <UncontrolledTooltip
                              delay={0}
                              placement="top"
                              target={"btn-update-user"+i}
                            >
                              Actualizar usuario
                            </UncontrolledTooltip>

                            <Button
                              id={"btn-delete-user"+i}
                              variant=""
                              onClick={() => deleteUsers(user._id)}
                            >
                              <i className="fas fa-trash-alt"></i>
                            </Button>

                            <UncontrolledTooltip
                              delay={0}
                              placement="top"
                              target={"btn-delete-user"+i}
                            >
                              Eliminar usuario
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
                  totalData={totalUsers}
                />
              </CardFooter>
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default ListUser;
