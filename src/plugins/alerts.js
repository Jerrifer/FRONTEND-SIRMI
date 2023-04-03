import axios from "axios"
import { BASE_URL } from 'globals.constans'
const { default: Swal } = require("sweetalert2")

export const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-success',
      cancelButton: 'btn btn-danger'
    },
    buttonsStyling: false
  })

export function alert (title, icon, id) {
  
  swalWithBootstrapButtons.fire({
    title: title,
    icon: icon,
    showCancelButton: true,
    confirmButtonText: 'Aceptar',
    cancelButtonText: 'Cancelar',
    reverseButtons: true
  }).then((result) => {
    if (result.isConfirmed) {
      axios.delete(`${BASE_URL}formationprograms/${id}`).then(res => {
        console.log(res)
      })
      swalWithBootstrapButtons.fire(
        'Deleted!',
        'Your file has been deleted.',
        'success'
      )
    } else if (
      result.dismiss === Swal.DismissReason.cancel
    ) {
      swalWithBootstrapButtons.fire(
        'Cancelled',
        'Your imaginary file is safe :)',
        'error'
      )
    }
  })
                    
}