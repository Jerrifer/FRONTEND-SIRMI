import React from "react";
import "./loader.css";
function Loader() {
  return (
        <div className="wrapper">
          <div id="container">
            <span className="loading-circle sp1">
              <span className="loading-circle sp2">
                <span className="loading-circle sp3"></span>
              </span>
            </span>
          </div>
            <label className="loading-title">Cargando ...</label>
        </div>
  );
}
export default Loader;
