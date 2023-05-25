import React from "react";
// reactstrap components
import { Container } from "reactstrap";
// core components  

const NotFoundLayout = () => {
  const mainContent = React.useRef(null);

  return (
    <>
      <div className="main-content " ref={mainContent}>
        <Container fluid>
            <h1>404</h1>
        </Container>
      </div>
    </>
  );
};

export default NotFoundLayout;