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
// import { BASE_URL } from "globals.constans";
// import { alert } from "./usersAlerts";
import { Link, NavLink as NavLinkRRD } from "react-router-dom";
import DetailUsers from "./detailUser";
import "assets/css/indexCompetence.css";
import { alert } from 'plugins/alerts.js';

import { allUsersService } from "services/users";
import { deleteUserService } from "services/users";
import { swalWithBootstrapButtons } from "plugins/alerts";
import Swal from "sweetalert2";

const ListUser = () => {
  const [user, setUser] = useState([]);

  const [search, setSearch] = useState("");



  // const [userPerPage] = useState(5);
  const [currentPage] = useState(1);

  // const lastIndex = userPerPage * currentPage; // = 1 * 6 = 6
  // const firstIndex = lastIndex - userPerPage; // = 6 - 6 = 0



  const lisSusers = async () => {
    const data = await allUsersService();
    setUser(data.results);
  };
  useEffect(() => {
    lisSusers()
  }, [ 
  ]);

 

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
                    <button class="btn btn-success bg-success">
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

                    <th scope="col">Primer Nombre</th>
                    <th scope="col">Apellido</th>
                    <th scope="col">Correo</th>
                    {/* <th scope="col">password</th> */}
                    <th scope="col">Numero Telefono</th>
                    <th scope="col">Numero de Identidad</th>
                    <th scope="col">Centro de Formacion</th>


                    <th scope="col">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {result
                    .map((userAssign, i = 0) => {
                      return (
                        <tr key={userAssign._id}>
                          <td>
                            <Badge color="" className="badge-dot mr-4">
                              <i className="bg-success" />
                              {i + 1}
                            </Badge>
                          </td>

                          <td>{userAssign.first_name}</td>

                          <td className="space">{userAssign.last_name}</td>

                          <td>{userAssign.email}</td>

                          {/* <td>{userAssign.password}</td> */}
                          <td>{userAssign.contact_number}</td>
                          <td>{userAssign.document_number}</td>
                          <td>{userAssign.training_center}</td>


                          <td>
                            <DetailUsers users={userAssign} />

                            <Link
                              to={`/admin/updateusers/${userAssign._id}`}
                              tag={NavLinkRRD}
                              activeclassname="active"
                            >
                              <Button variant="">
                                <i className="fas fa-pen-alt"></i>
                              </Button>
                            </Link>

                            <Button
                              variant=""
                              onClick={() => deleteUsers(userAssign._id)}
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

export default ListUser;
