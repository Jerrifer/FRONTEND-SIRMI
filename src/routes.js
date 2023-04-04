
import Index from "views/Index.js";
import Profile from "views/examples/Profile.js";
import Maps from "views/examples/Maps.js";
// import Register from "views/examples/Register.js";
// import Login from "views/examples/Login.js";
import Tables from "views/examples/Tables.js";
import Icons from "views/examples/Icons.js";
import ListUsers from "views/admin/users/ListUsers.js";
import Competence from "views/competence/competence";
import FormationPrograms from "views/formation-programs/listFormationPrograms";
import RegisterFormationProgram from "views/formation-programs/registerFormationProgram";
import UpdateFormationProgram from "views/formation-programs/updateFormationPrograms";

var routes = [
  {
    path: "/index",
    name: "Dashboard",
    icon: "ni ni-bullet-list-67 text-dark",
    component: Index,
    layout: "/admin"
  },
  {
    path: "/icons",
    name: "Icons",
    icon: "ni ni-bullet-list-67 text-dark",
    component: Icons,
    layout: "/admin"
  },
  {
    path: "/maps",
    name: "Competencias",
    icon: "ni ni-bullet-list-67 text-dark",
    component: Maps,
    layout: "/public"
  },
  {
    path: "/user-profile",
    name: "User Profile",
    icon: "ni ni-bullet-list-67 text-dark",
    component: Profile,
    layout: "/admin"
  },
  {
    path: "/tables",
    name: "Tables",
    icon: "ni ni-bullet-list-67 text-dark",
    component: Tables,
    layout: "/admin"
  },
  // {
  //   path: "/login",
  //   name: "Login",
  //   icon: "ni ni-key-25 text-info",
  //   component: Login,
  //   layout: "/auth"
  // },
  // {
  //   path: "/register",
  //   name: "Register",
  //   icon: "ni ni-circle-08 text-pink",
  //   component: Register,
  //   layout: "/auth"
  // },
  // users routes CRUD
  // {
  //   path: "/users/create-user",
  //   name: "Create User",
  //   icon: "ni ni-bullet-list-67 text-dark ",
  //   component: CreateUser,
  //   layout: "/admin"
  // },
  {
    path: "/users/list-users",
    name: "Usuarios",
    icon: "ni ni-bullet-list-67 text-dark",
    component: ListUsers,
    layout: "/admin"
  },

  {
    path: "/competences",
    name: "Competencias",
    icon: "ni ni-bullet-list-67 text-dark",
    component: Competence,
    layout: "/admin"
  },
  {
    path: "/formationprograms",
    name: "Programas de formación",
    icon: "ni ni-bullet-list-67 text-dark",
    component: FormationPrograms,
    layout: "/admin"
  },
  {
    path: "/formationprogramsregister",
    name: "Registrar programa de formación",
    icon: "ni ni-bullet-list-67 text-dark",
    component: RegisterFormationProgram,
    layout: "/admin"
  },

  {
    path: "/formationprogramsupdate/:formationprogram",
    icon: "ni ni-bullet-list-67 text-dark",
    name: "Actualizar programa de formación",
    component: UpdateFormationProgram,
    layout: "/admin",
    sidebar: true
  },
  // {
  //   path: "/users/edit-user/:id",
  //   name: "Edit User",
  //   icon: "ni ni-scissors text-red",
  //   component: EditUser,
  //   layout: "/admin"
  // }
];
export default routes;
