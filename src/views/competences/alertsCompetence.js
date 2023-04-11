import axios from "axios";
import { BASE_URL } from "globals.constans";
const { default: Swal } = require("sweetalert2");

export const swalWithBootstrapButtons = Swal.mixin({
  customClass: {
    confirmButton: "btn btn-success",
    cancelButton: "btn btn-danger",
  },
  buttonsStyling: false,
});

export function alert(title, icon, id) {
  swalWithBootstrapButtons
    .fire({
      title: title,
      icon: icon,
      showCancelButton: true,
      confirmButtonText: "Aceptar",
      cancelButtonText: "Cancelar",
      reverseButtons: true,
    })
    .then((result) => {
      if (result.isConfirmed) {
        axios.delete(`${BASE_URL}competences/${id}`).then((res) => {
          console.log(res.data);
          const result = res.data;
          if (result.status === "success") {
            swalWithBootstrapButtons.fire(
              "Eliminado!",
              "la Competencia se Elimino Correctamente",
              "success"
            );
          } else {
            swalWithBootstrapButtons.fire("Error!", result.message, "error");
          }
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        swalWithBootstrapButtons.fire("Cancelado!", "", "info");
      }
    });
}
