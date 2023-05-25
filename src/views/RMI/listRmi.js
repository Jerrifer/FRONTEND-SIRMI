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
} from "reactstrap";
// core components
import Header from "components/Headers/Header.js";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import "../../../src/components/Headers/header.css";
import PaginationData from "plugins/pagination";
import { alert } from "plugins/alerts.js";
import { Link, NavLink as NavLinkRRD, useHistory } from "react-router-dom";
// import "../formation-programs/input.css";
import { swalWithBootstrapButtons } from "plugins/alerts";
import Swal from "sweetalert2";
import "assets/css/rmi-cards-calendar.css"
import Spinner from "../../components/loader";
import { allRmiService } from "services/rmi";
import { deleteRmiService } from "services/rmi";
import { registerRmiService } from "services/rmi";


const months = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
];

const ListRmi = () => {

  const navigate = useHistory();
  const [rmi, setRmi] = useState([]);
  const year = new Date().getFullYear()
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState([]);

  useEffect(() => {
    const first_name = localStorage.getItem('name')
    const last_name = localStorage.getItem('lastname')

    const user = {
      first_name: first_name,
      last_name: last_name
    }
    setUser(user)
    showRmis();
  }, []);

  const showRmis = async () => {
    const data = await allRmiService();

    setRmi(data.results);
    setLoading(false);
  };

  const [search, setSearch] = useState("");


  const deleteRmi = async (id) => {
    const alertParams = {
      title: "¿Está seguro de eliminar el rmi?",
      icon: "warning",
    };
    const confirmed = await alert(alertParams);

    if (confirmed.isConfirmed) {
      const data = await deleteRmiService(id);
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
    result = rmi;
  } else {
    result = rmi.filter((dato) =>
      dato.month.toLowerCase().includes(search.toLocaleLowerCase())
    );
  }

  const handleMonth = (id) => {
    navigate.push(`/admin/titledformations/${id}`);
  }

  const addRmi = async () => {

    const userId = localStorage.getItem('id')
    const lastRmi = rmi.slice(-1).pop();
    const dataRmi = {
      month: lastRmi.month+1,
      total_hours_formation: 0,
      total_hours_other_activities: 0,
      total_hours_month: 0,
      user: userId
    }

    const data = await registerRmiService(dataRmi);
    console.log(data);
    if(data.status === 'success') {
      swalWithBootstrapButtons.fire(
        'Se añadio un nuevo mes',
        data.message,
        data.status
      )
    } else {
      swalWithBootstrapButtons.fire(
        data.message,
        data.results,
        data.status
      )
    }
  }

  return (
    <>
      <Header title={"Gestionar Rmi's"} />
      <Container className="mt--7" fluid>
      <Row>
          <div className="col">
            <Card className="card-cal mx-7">
              <CardHeader className="card-head-cal">
                <h2>Instructor: {user.first_name}  {user.last_name}</h2>
                <h1>Año {year}</h1>
                <Col lg="2">
                    <Button className="btn btn-success bg-success" onClick={addRmi}>
                      Mes +
                    </Button>
                </Col>
              </CardHeader>
              {loading && < Spinner/>}
              <div className="card-body-cal ">
                <Row className="card-row-cal">
                {
                  rmi.map((rmi) => {
                    return(
                      <Col lg="3" className="card-col-cal  my-3">
                          <Card className="card-month-cal" onClick={() => {handleMonth(rmi._id)}}>
                              <h2>{months[rmi.month]}</h2>

                              <div>
                                Total de horas: {rmi.total_hours_month}
                              </div>
                          </Card>
                      </Col>
                    )
                  })
                }
                </Row>
              </div>
              {/* <CardFooter className="py-4">
              </CardFooter> */}
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default ListRmi;
