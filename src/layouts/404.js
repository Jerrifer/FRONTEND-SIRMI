import React from "react";
import { Link } from "react-router-dom/cjs/react-router-dom";
import './cambios.css'

// reactstrap components

const NotFoundLayout = () => {
  return (
    <>
      <div className="content_404">
          <p className="zoom-area mx-auto m-0 pt-5 ">
            Página no encontrada
          </p>
          <section class="error-container">
            <span>
              <span>4</span>
            </span>
            <span>0</span>
            <span>
              <span>4</span>
            </span>
          </section>
          <div className="link-container">
            <Link to='/admin/users'>
              <p className="Link-index">Ir a la pagina de inicio</p>
            </Link>
          </div>
      </div>
    </>
  );
};

export default NotFoundLayout;
