import { swalWithBootstrapButtons } from "plugins/alerts";
import { Redirect } from "react-router-dom"
export const ProtectedRoute =({children})=>{
    const token = localStorage.getItem('token');
    if (!token) {
        swalWithBootstrapButtons.fire(
            'Tienes que iniciar sesión',
            '',
            'info'
        )
        return <Redirect to="/auth/login" />;
    }
    return children
}
