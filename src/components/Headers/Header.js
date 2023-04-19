import { useHistory } from 'react-router-dom';
import './header.css'


import { Button, Container } from "reactstrap";



const Header = () => {
  const navigate = useHistory()
  return (
    <>
      <div className="header fondo pb-8 pt-5 pt-md-8">
        <Container fluid>
          <Button color='' className='p-0' onClick={() => navigate.goBack()}>
            <i className="ni ni-bold-left icon-back"></i>
          </Button>
          <div className="header-body">
          </div>
        </Container>
      </div>
    </>
  );
};

export default Header;
