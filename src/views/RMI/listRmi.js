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
  Input,
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
import { rmiByUserService, yearsByUserService } from "services/rmi";
import { deleteRmiService } from "services/rmi";
import { registerRmiService } from "services/rmi";
import Multiselect from "multiselect-react-dropdown";
import { selectedValueDecorator, optionValueDecorator, closeIcon, customStyle } from "plugins/multiSelect";


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

  const currentYear = new Date().getFullYear()

  const [year, setYear] = useState([{year: currentYear}]);
  const [years, setYears] = useState([]);
  const [rmi, setRmi] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState([]);
  const [ rendering, setRendering] = useState(0);

  useEffect(() => {
    const first_name = localStorage.getItem('name')
    const last_name = localStorage.getItem('lastname')
    const id = localStorage.getItem('id')

    const user = {
      id: id,
      first_name: first_name,
      last_name: last_name
    }
    setUser(user)
    showRmis(user.id, year[0].year);
    showYears(user.id);
  }, [year, rendering]);

  const showRmis = async (id, year) => {
    const data = await rmiByUserService(id, year);
    setRmi(data.results);
    setLoading(false);
  };

  const showYears = async (user) => {
    const data = await yearsByUserService(user);
    setYears(data.results);
  };
  

  const [search, setSearch] = useState("");

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
      month: lastRmi ? lastRmi.month+1 : 0,
      total_hours_formation: 0,
      total_hours_other_activities: 0,
      total_hours_month: 0,
      user: userId
    }

    const data = await registerRmiService(dataRmi);
    setRendering(rendering+ 1)
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
      <Header title={"Gestionar RMI's"} />
      <Container className="mt--7" fluid>
      <Row>
          <div className="col">
            <Card className="card-cal mx-7">
              <CardHeader className="card-head-cal">
                <Col lg="4" className="d-flex justify-content-start">
                  <h2>Instructor: {user.first_name}  {user.last_name}</h2>
                </Col>
                <Col lg="4" className="d-flex justify-content-center">
                  <label
                    className="form-control-label"
                    htmlFor="input-activity"
                  >
                    <h1>Año {year[0].year}</h1>
                    <Input className="form-control-alternative" type="number" min="2022" max="2026" defaultValue={year[0].year} onChange={(e) => setYear([{year: e.target.value}])}/>
                    <Multiselect
                          required
                          selectedValueDecorator={selectedValueDecorator}
                          optionValueDecorator={optionValueDecorator}
                          customCloseIcon={closeIcon}
                          style={customStyle}
                          avoidHighlightFirstOption={true}
                          hidePlaceholder={true}
                          loading={rmi.length <= 0}
                          selectionLimit={1}
                          emptyRecordMsg="No hay más datos"
                          showCloseIcon={true}
                          onKeyPressFn={function noRefCheck() {}}
                          onSearch={function noRefCheck() {}}
                          onRemove={function noRefCheck() {}}
                          onSelect={function noRefCheck(e) {setYear(e)}}
                          placeholder="Seleccionar"
                          displayValue="year"
                          options={years}
                          selectedValues={year}
                        />
                  </label>
                </Col>
                <Col lg="4" className="align-self-center d-flex justify-content-center">
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
                      <Col key={rmi._id} lg="3" className="card-col-cal  my-3">
                          <Card className="card-month-cal" onClick={() => {handleMonth(rmi._id)}}>
                              <h2>{months[rmi.month]}</h2>

                              <h4>Total de horas: {rmi.total_hours_month}</h4>
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
