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
  CardBody,
  UncontrolledDropdown,
  DropdownToggle,
  Media,
  DropdownMenu,
  DropdownItem,
  UncontrolledTooltip,
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
import "assets/css/button-shop-now.css"
import Spinner from "../../components/loader";
import { rmiByUserService, yearsByUserService } from "services/rmi";
import { registerRmiService } from "services/rmi";
import Multiselect from "multiselect-react-dropdown";
import { selectedValueDecorator, optionValueDecorator, closeIcon, customStyle } from "plugins/multiSelect";

const months = [
  "Ene",
  "Feb",
  "Mar",
  "Abr",
  "May",
  "Jun",
  "Jul",
  "Ago",
  "Sep",
  "Oct",
  "Nov",
  "Dic",
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
    console.log(data);
  };

  const handleYear = async (newYear) => {
    await years.map((year) => {
      console.log(year.year);
      console.log(newYear);
      if (year.year === newYear) {
        return setYear([{year: newYear}])
      }else {
        return (
          swalWithBootstrapButtons.fire({
            position: 'top-end',
            icon: "info",
            timer: 2000,
            toast: true,
            title: "No tienes registrados RMI's de más años",
            showConfirmButton: false,
            didOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer)
              toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
          })
        )
      }
    })
    
    // if (year < 10) {
    //   setYear([{year: year}]);
    // }
  };

  const handleMonth = (id) => {
    navigate.push(`/admin/titledformations/${id}`);
  }

  const addRmi = async () => {

    const userId = localStorage.getItem('id')
    const lastRmi = rmi.slice(-1).pop() || {month: -1};
    console.log(lastRmi);
    if (lastRmi.month < 11) {
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
    } else {

      swalWithBootstrapButtons.fire({
        position: 'top-end',
        icon: "warning",
        timer: 2000,
        toast: true,
        title: "Ya hay 12 meses",
        showConfirmButton: false,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
    })
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
                <Col lg="4" className="d-flex justify-content-start align-items-center">
                  <h2>Instructor: {user.first_name}  {user.last_name}</h2>
                </Col>
                <Col lg="4" className="d-flex justify-content-start align-items-center">
                    <Button variant=""  className="px-1 py-1 d-flex justify-content-center align-items-center" onClick={() => handleYear(year[0].year-1)}>
                      <i className="ni ni-bold-down"></i>
                    </Button>
                      <h1 className="m-2">Año {year[0].year}</h1>
                    <Button variant=""  className="px-1 py-1 d-flex justify-content-center align-items-center" onClick={() => handleYear(year[0].year+1)}>
                      <i className="ni ni-bold-up"></i>
                    </Button>
                    {/* <Input className="form-control-alternative" type="number" min="2022" max="2026" defaultValue={year[0].year} onChange={(e) => setYear([{year: e.target.value}])}/> */}
                    {/* <Multiselect
                      required
                      singleSelect
                      selectedValueDecorator={selectedValueDecorator}
                      optionValueDecorator={optionValueDecorator}
                      customCloseIcon={closeIcon}
                      style={customStyle}
                      avoidHighlightFirstOption={true}
                      hidePlaceholder={true}
                      loading={rmi.length <= 0}
                      selectionLimit={1}
                      emptyRecordMsg="No hay más años"
                      showCloseIcon={true}
                      onKeyPressFn={function noRefCheck() {}}
                      onSearch={function noRefCheck() {}}
                      onRemove={function noRefCheck() {}}
                      onSelect={function noRefCheck(e) {setYear(e)}}
                      placeholder="Seleccionar"
                      displayValue="year"
                      options={years}
                      selectedValues={year}
                    /> */}
                </Col>
                <Col lg="4" className="align-self-center d-flex justify-content-center">
                    <Button id="plus-month" className="btn btn-success bg-success" onClick={addRmi}>
                      Mes +
                    </Button>
                    <UncontrolledTooltip
                      delay={0}
                      target="plus-month"
                    >
                      Agregar un mes
                    </UncontrolledTooltip>
                </Col>
              </CardHeader>
              {loading && < Spinner/>}
              <div className="card-body-cal ">
                <Row className="card-row-cal">
                {
                  rmi.map((rmi) => {
                    return(
                      <Col key={rmi._id} lg="3" className="card-col-cal  my-3">
                          {/*          */}
                          <Card id={"card"+rmi._id} className="card-month-cal" onClick={() => {handleMonth(rmi._id)}}>
                              <CardHeader className="p-1 bg-green rounded"><h2 className="m-0 text-white text-shadow">{months[rmi.month]}</h2></CardHeader>
                              <CardBody className="text-center">
                                <button className="cta">
                                  <h4 className="hover-underline-animation">Total horas mes: {rmi.total_hours_month}</h4>
                                </button>
                                <Row>
                                  <Col lg="6">
                                  <button className="cta">
                                    <h5 className="hover-underline-animation">Horas formación: {rmi.total_hours_formation}</h5>
                                  </button>
                                  </Col>

                                  <Col lg="6">
                                  <button className="cta">
                                    <h5 className="hover-underline-animation">Horas otras actividades: {rmi.total_hours_other_activities}</h5>
                                  </button>
                                  </Col>
                                </Row>
                              </CardBody>
                          </Card>
                          <UncontrolledTooltip
                            delay={0}
                            target={"card"+rmi._id}
                          >
                            Has clic aquí para gestionar los reportes
                          </UncontrolledTooltip>
                          {/*          */}
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
