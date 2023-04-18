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

const ListUser = () => {
  
  const [user, setUser] = useState([]);

  const [search, setSearch] = useState("");

  const [currentPage] = useState(1);

  const [isLoading, setisLoading] = useState(true);

  
  useEffect(() => {
    const idTrainingCenter = localStorage.getItem('training_center')
    listUsers(idTrainingCenter)
    setisLoading(false)
  }, []);

  const listUsers = async (id) => {
    const data = await getUsersByTrainingCenterService(id);
    setUser(data.results);
  };

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

    {/* {loader ? console.log('kkkkkk') : console.log('ppipp')} */}
    {isLoading && <div>cargando.....</div>}
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
                    <th scope="col">N°</th>

                    <th scope="col">Usuario</th>
                    <th scope="col">Correo electrónico</th>
                    <th scope="col">Número teléfono</th>
                    <th scope="col">Número de identidad</th>
                    <th scope="col">Acciones</th>
                  </tr>
                </thead>
                <tbody>

                  {result
                    .map((user, i = 0) => {
                      return (
                        <tr key={user._id}>
                          <td>
                            <Badge color="" className="badge-dot mr-4">
                              <i className="bg-success" />
                              {i + 1}
                            </Badge>
                          </td>

                          <td>{user.first_name} {user.last_name}</td>
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
                              <Button variant="">
                                <i className="ni ni-paper-diploma"></i>
                              </Button>
                            </Link>

                            <Link
                              to={`/admin/updateusers/${user._id}`}
                              tag={NavLinkRRD}
                              activeclassname="active"
                            >
                              <Button variant="">
                                <i className="fas fa-pen-alt"></i>
                              </Button>
                            </Link>

                            <Button
                              variant=""
                              onClick={() => deleteUsers(user._id)}
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
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default ListUser;
