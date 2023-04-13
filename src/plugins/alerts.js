const { default: Swal } = require("sweetalert2")

export const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-success',
      cancelButton: 'btn btn-danger'
    },
    buttonsStyling: false
  })

// export function alert (alertParams) {

//   const { title, icon, id, path, method, body } = alertParams
  
//   swalWithBootstrapButtons.fire({
//     title: title,
//     icon: icon,
//     showCancelButton: true,
//     confirmButtonText: 'Aceptar',
//     cancelButtonText: 'Cancelar',
//     reverseButtons: true
//   }).then((result) => {
//     if (result.isConfirmed) {
//       axios({method: method, url:path+id, data:body}).then(res => {
//         console.log(res.data)
//         const resultData = res.data
//         if(resultData.status === 'success'){
//           swalWithBootstrapButtons.fire(
//             'Eliminado!',
//             resultData.message,
//             'success'
//           )
//         }
//         else{
//           swalWithBootstrapButtons.fire(
//             'Error!',
//             resultData.message,
//             'error'
//           )
//         }
        
//       })
//     } else if (
//       result.dismiss === Swal.DismissReason.cancel
//     ) {
//       swalWithBootstrapButtons.fire(
//         'Cancelado!',
//         '',
//         'info'
//       )
//     }
//   }).catch((error) => {
//     swalWithBootstrapButtons.fire(
//       'Error!',
//       error,
//       'danger'
//     )
//   })
                    
// }

export function alert (alertParams) {
  return new Promise((resolve, reject) => {
    const { title, icon } = alertParams
    swalWithBootstrapButtons.fire({
      title: title,
      icon: icon,
      showCancelButton: true,
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar',
      reverseButtons: true
    }).then((result) => resolve(result)).catch((error) => {
        swalWithBootstrapButtons.fire(
          'Error!',
          error,
          'danger'
        )
      })               
    })
}