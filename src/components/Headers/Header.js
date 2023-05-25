import { useHistory } from 'react-router-dom';
import './header.css'


import { Button, Container, Row, UncontrolledTooltip } from "reactstrap";



const Header = ({title}) => {
  const navigate = useHistory()
  return (
    <>
      <div className="header fondo pb-8 pt-5 pt-md-8">
        <Container fluid>
          <Row>
              <Button id="btn-back" className='p-0 rounded-circle btn-circle' onClick={() => navigate.goBack()}>
                <i className="fas fa-reply text-default icon-back"></i>
              </Button>
              <UncontrolledTooltip
                className="tooltip-inner"
                delay={0}
                target="btn-back"
              >
                Regresar
              </UncontrolledTooltip>
            <div className='d-flex align-items-center ml-3'>
              <h2 className='text-white  mb-0'>{title}</h2>
            </div>
          </Row>
          <div className="header-body">
          </div>
        </Container>
      </div>
    </>
  );
};

export default Header;
